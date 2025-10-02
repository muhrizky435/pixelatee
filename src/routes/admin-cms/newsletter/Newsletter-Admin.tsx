import React, { useState, useRef, useEffect, useCallback } from "react";
import NavBarCMS from "../../../components/CMS-Navbar";
import { FiImage, FiFilter } from "react-icons/fi";
import { Link } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import JoditEditor from "jodit-react";
import NewsletterDetailModal from "./Newsletter-Detail-Admin";
import { MdOutlineSubtitles } from "react-icons/md";
import DOMPurify from "dompurify";
import {
  getAdminNewsletters,
  createAdminNewsletter,
  deleteNewsletter,
} from "../../../api/newsletter.api";
import type {
  NewsletterResponse,
  NewsletterPayload,
} from "../../../api/newsletter.api";
import type { AxiosError } from "axios";

const schedule = [
  {
    id: 1,
    title: "NovaLink Shortener",
    createdAt: "2024-08-01 10:00",
    sendAt: "2024-08-02 10:00",
  },
  {
    id: 2,
    title: "NovaLink Shortener",
    createdAt: "2024-08-01 10:00",
    sendAt: "2024-08-02 10:00",
  },
];

export default function Newsletter() {
  const [newsletters, setNewsletters] = useState<NewsletterResponse[]>([]);
  const [, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // state modal
  const [selectedNewsletter, setSelectedNewsletter] = useState<NewsletterResponse | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNewsletterForDelete, setSelectedNewsletterForDelete] = useState<NewsletterResponse | null>(null);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showCreateSuccessModal, setShowCreateSuccessModal] = useState(false);
  const [showCreateErrorModal, setShowCreateErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // state form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<"TECH" | "BUSINESS" | "INTERNAL" | "OTHER">("TECH");
  const [file, setFile] = useState<File | null>(null);
  const [sendAfter24, setSendAfter24] = useState(false);

  // filter & search
  const [preview, setPreview] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  // Get Data Newsletter
  const fetchNewsletters = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAdminNewsletters({
        status: filterStatus || undefined,
        type: filterType || undefined,
        search: search || undefined,
      });
      setNewsletters(res.data.data || []);
    } catch (err) {
      console.error("Failed fetch newsletters:", err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterType, search]);

  useEffect(() => {
    fetchNewsletters();
  }, [fetchNewsletters]);

  // Handle Tambah Newsletter
  const handleSend = async () => {
    if (!title && !file) return;
    try {
      const payload: NewsletterPayload = {
        title,
        content,
        type,
        status: "PUBLISHED",
        isScheduled: sendAfter24,
        file,
      };
      await createAdminNewsletter(payload);
      handleCancel();
      fetchNewsletters();
      setShowCreateSuccessModal(true);
    } catch (error) {
      const err = error as AxiosError<{ message?: string; errors?: string[] }>;
      console.error("Failed create newsletter:", err);

      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else if (err.response?.data?.errors) {
        setErrorMessage(err.response.data.errors.join(", "));
      } else {
        setErrorMessage("Failed to create newsletter. Please try again.");
      }

      setShowCreateErrorModal(true);
    }
  };

  // Handle Confirm Delete Newsletter
  const handleDeleteConfirm = async () => {
    if (!selectedNewsletterForDelete) return;

    try {
      await deleteNewsletter(selectedNewsletterForDelete.id);
      fetchNewsletters();
      setShowDeleteModal(false);
      setSelectedNewsletterForDelete(null);
      setShowDeleteSuccessModal(true);
    } catch (error) {
      console.error("Failed to delete newsletter:", error);
    }
  };

  // handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle Reset Form ketika klik cancel
  const handleCancel = () => {
    setTitle("");
    setContent("");
    setFile(null);
    setPreview(null);
    setSendAfter24(true);
  };

  const isInputFilled = !!title || !!file;
  const filteredNewsletters = newsletters;

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 md:px-8 px-2 space-y-8">
        <h1 className="text-3xl font-bold text-blue-500">Newsletter</h1>

        {/* Form Input Title */}
        <p className="flex items-center text-gray-500 mb-1">
          <MdOutlineSubtitles size={18} className="mr-2" />
          Title
        </p>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="New Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 py-2 px-3 text-lg border border-gray-300 rounded-lg 
               placeholder-gray-400 
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
               focus:shadow-md focus:shadow-blue-200 transition"
          />
        </div>

        {/* Type Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Type</label>
          <select
            value={type}
            onChange={(e) =>
              setType(
                e.target.value as "TECH" | "BUSINESS" | "INTERNAL" | "OTHER"
              )
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="TECH">TECH</option>
            <option value="BUSINESS">BUSINESS</option>
            <option value="INTERNAL">INTERNAL</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>

        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-gray-500 relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {preview ? (
            <div className="flex flex-col items-center">
              <img
                src={preview}
                alt="preview"
                className="w-full mb-2 rounded"
              />
              <button
                type="button"
                className="text-red-500 text-md"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <FiImage size={48} />
              <label className="mt-2 text-blue-500 cursor-pointer">
                Attach File
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
              <p className="text-sm text-gray-400">Or Drag &amp; Drop</p>
            </>
          )}
        </div>

        {/* Rich Text Editor */}
        <div className="border rounded-lg bg-white overflow-hidden">
          <JoditEditor
            value={content}
            config={{
              readonly: false,
              height: 300,
              toolbarAdaptive: false,
              toolbarSticky: false,
              buttons: [
                "bold",
                "italic",
                "underline",
                "ul",
                "ol",
                "link",
                "|",
                "fontsize",
                "brush",
                "paragraph",
              ],
            }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>

        {/* Options + Buttons */}
        <div className="flex flex-col gap-4">
          {/* Toggle Schedule */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={sendAfter24}
                onChange={() => setSendAfter24(!sendAfter24)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all peer-checked:translate-x-5"></div>
            </div>
            <span className="text-gray-700 text-sm">
              {sendAfter24
                ? "Scheduled (Send after 24 hours)"
                : "Send Immediately"}
            </span>
          </label>

          <div className="flex justify-between">
            <button
              className={`px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md ${
                !isInputFilled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleCancel}
              disabled={!isInputFilled}
            >
              Cancel
            </button>
            <button
              className={`px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md ${
                !isInputFilled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSend}
              disabled={!isInputFilled}
            >
              Create Newsletter
            </button>
          </div>
        </div>

        {/* List Newsletter */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Newsletter
            <span className="bg-blue-100 text-blue-600 text-sm px-2 py-0.5 rounded-full">
              {filteredNewsletters.length}
            </span>
          </h2>

          {/* Search + Filter */}
          <div className="relative" ref={filterRef}>
            <div className="flex items-center border rounded-lg px-4 py-2 bg-white shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition">
              <input
                type="text"
                placeholder="Search Newsletter..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none text-sm w-40 md:w-64 bg-transparent"
              />
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="ml-2 text-gray-500 hover:text-blue-600 transition"
                type="button"
              >
                <FiFilter size={18} />
              </button>
            </div>

            {showFilter && (
              <div
                className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-lg p-5 z-20 animate-scaleIn"
                ref={filterRef}
              >
                {/* Status */}
                <div className="mb-4">
                  <p className="font-semibold text-sm text-gray-700 mb-3">
                    Status
                  </p>
                  <div className="space-y-2 text-sm">
                    {["Sent", "Schedule", "Archive"].map((status) => (
                      <label
                        key={status}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 cursor-pointer transition"
                      >
                        <input
                          type="radio"
                          name="status"
                          checked={filterStatus === status}
                          onChange={() => setFilterStatus(status)}
                          className="text-blue-600"
                        />
                        <span>{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type */}
                <div>
                  <p className="font-semibold text-sm text-gray-700 mb-3">
                    Type
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {["Tech", "Business", "Internal", "Other"].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 cursor-pointer transition"
                      >
                        <input
                          type="radio"
                          name="type"
                          checked={filterType === type}
                          onChange={() => setFilterType(type)}
                          className="text-blue-600"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setFilterStatus(null);
                      setFilterType(null);
                    }}
                    className="text-xs font-medium text-gray-500 hover:text-red-500 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Cards */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid md:grid-cols-2 gap-6 leading-8">
            {filteredNewsletters.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {n.photo && (
                  <img
                    src={`${BASE_URL}/newsletter/${n.photo}`}
                    alt={n.title}
                    className="w-full h-40 object-cover"
                  />
                )}

                <div className="p-4">
                  <p className="text-xs text-gray-500">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>

                  <span className="inline-block bg-gray-800 text-white text-xs px-2 py-1 rounded mt-1">
                    {n.type}
                  </span>

                  <h3 className="text-md font-semibold mt-2 line-clamp-2">
                    {n.title}
                  </h3>

                  <p
                    className="text-sm text-gray-600 mt-1 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(n.content),
                    }}
                  ></p>

                  <div className="flex items-center gap-3 mt-4">
                    {/* Tombol Hapus */}
                    <button
                      onClick={() => {
                        setSelectedNewsletterForDelete(n);
                        setShowDeleteModal(true);
                      }}
                      className="px-4 py-2 font-medium flex items-center gap-2 border border-red-500 rounded-xl text-red-600 hover:text-red-800 text-sm hover:border-red-600 hover:scale-105 shadow-sm transition"
                    >
                      Delete
                    </button>

                    {/* Tombol Edit */}
                    <Link
                      to={`/panels-admins/newsletter/edit/${n.id}`}
                      className="px-4 py-2 font-medium flex items-center gap-2 bg-blue-500 border border-blue-500 rounded-xl text-white text-sm shadow-sm hover:bg-blue-600 hover:scale-105 transition"
                    >
                      Edit
                    </Link>

                    {/* Tombol See more */}
                    <button
                      onClick={() => setSelectedNewsletter(n)}
                      className="px-4 py-2 font-medium flex items-center gap-2 border border-blue-400 rounded-xl text-blue-600 hover:text-blue-800 text-sm hover:border-blue-500 hover:scale-105 shadow-sm transition"
                    >
                      See more →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Section (dummy) */}
        <section className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Schedule</h2>
            <span className="text-sm text-gray-500">{schedule.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="border-b text-sm text-blue-400">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Created At</th>
                  <th className="py-3 px-4">Send At</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-blue-50 transition"
                  >
                    <td className="flex items-center gap-3 py-3 px-4">
                      <span className="font-medium text-gray-700">
                        {item.title}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.createdAt}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.sendAt}</td>
                    <td className="py-3 px-4 text-right relative">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === item.id ? null : item.id)
                        }
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <BsThreeDotsVertical className="text-gray-500" />
                      </button>

                      {openMenu === item.id && (
                        <div
                          ref={menuRef}
                          className="absolute top-1/2 right-10 -translate-y-1/2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 animate-fadeIn"
                        >
                          <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition">
                            Lihat Detail
                          </button>
                          <div className="border-t border-gray-100"></div>
                          <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition">
                            Hapus
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal Detail Newsletter */}
        <NewsletterDetailModal
          newsletter={selectedNewsletter}
          onClose={() => setSelectedNewsletter(null)}
        />

        {/* Modal Hapus Newsletter */}
        {showDeleteModal && selectedNewsletterForDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Delete Newsletter
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "
                <span className="font-medium">
                  {selectedNewsletterForDelete.title}
                </span>
                "?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {showDeleteSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl shadow-xl  w-full max-w-md p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Success!
              </h3>
              <p className="mb-6">Newsletter successfully delete.</p>
              <button
                onClick={() => setShowDeleteSuccessModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal Success Create Newsletter */}
        {showCreateSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center shadow-xl">
              <h2 className="text-lg font-semibold mb-4">Success!</h2>
              <p className="mb-6">Newsletter successfully created and added.</p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowCreateSuccessModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Modal Error Create Newsletter */}
        {showCreateErrorModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center shadow-xl">
              <h2 className="text-lg font-semibold text-red-600 mb-4">Error</h2>
              <p className="mb-6 text-gray-700">{errorMessage}</p>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => setShowCreateErrorModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </NavBarCMS>
  );
}
