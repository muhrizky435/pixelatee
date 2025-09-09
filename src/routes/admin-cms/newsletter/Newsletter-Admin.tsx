import React, { useState, useRef, useEffect } from "react";
import NavBarCMS from "../../../components/CMS-Navbar";
import { FiImage, FiFilter } from "react-icons/fi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaSave, FaTrash, FaTimes } from "react-icons/fa";
import { Link } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import JoditEditor from "jodit-react";

// dummy data newsletter
const newsletters = [
  {
    id: 1,
    title: "What happen in Industry of Tech Right Now?",
    date: "12 Aug 2024",
    time: "13:42",
    type: "Tech",
    desc: "Suspendisse euismod turpis vel imperdiet vulputate...",
    img: "/img/crm.png",
  },
  {
    id: 2,
    title: "This is why you should use Angular than React",
    date: "12 Aug 2024",
    time: "13:42",
    type: "Tech",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    img: "/img/crm.png",
  },
  {
    id: 3,
    title: "React updated to v19.2",
    date: "12 Aug 2024",
    time: "13:42",
    type: "Tech",
    desc: "sim risus. Quisque ornare ultricies magna...",
    img: "/img/crm.png",
  },
  {
    id: 4,
    title: "Typescript is 10 times faster Now",
    date: "12 Aug 2024",
    time: "13:42",
    type: "Tech",
    desc: "Suspendisse euismod turpis vel imperdiet vulputate...",
    img: "/img/crm.png",
  },
];

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
  {
    id: 3,
    title: "NovaLink Shortener",
    createdAt: "2024-08-01 10:00",
    sendAt: "2024-08-02 10:00",
  },
  {
    id: 4,
    title: "NovaLink Shortener",
    createdAt: "2024-08-01 10:00",
    sendAt: "2024-08-02 10:00",
  },
  {
    id: 5,
    title: "NovaLink Shortener",
    createdAt: "2024-08-01 10:00",
    subject: "Draft",
  },
];

export default function Newsletter() {
  const [sendAfter24, setSendAfter24] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [draftList, setDraftList] = useState<
    {
      id: number;
      title: string;
      content: string;
      file: File | null;
      preview: string | null;
    }[]
  >([]);

  // Dropdown close on outside click (filter)
  useEffect(() => {
    if (!showFilter) return;
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showFilter]);

  // Dropdown close on outside click (Schedule menu)
  useEffect(() => {
    if (openMenu === null) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openMenu]);

  // Drag & drop file handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setPreview(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Button enable/disable logic
  const isInputFilled = !!title || !!file;

  // Cancel button logic
  const handleCancel = () => {
    setShowCancelModal(true);
  };

  // Send button logic
  const handleSend = () => {
    if (!isInputFilled) return;
    setTitle("");
    setContent("");
    setFile(null);
    setPreview(null);
  };

  // Confirm cancel modal
  const handleCancelModalYes = () => {
    const newDraft = {
      id: Date.now(),
      title,
      content,
      file,
      preview,
    };
    setDraftList([...draftList, newDraft]);
    setShowCancelModal(false);
    setTitle("");
    setContent("");
    setFile(null);
    setPreview(null);
  };
  const handleCancelModalNo = () => {
    setShowCancelModal(false);
    setTitle("");
    setContent("");
    setFile(null);
    setPreview(null);
  };

  // Restore draft ke form dan hapus dari draftList
  const handleDraftModalRestore = (draft: (typeof draftList)[0]) => {
    setTitle(draft.title);
    setContent(draft.content);
    setFile(draft.file);
    setPreview(draft.preview);
    setDraftList(draftList.filter((d) => d.id !== draft.id));
    setShowDraftModal(false);
  };

  // Hapus draft dari list
  const handleDeleteDraft = (id: number) => {
    setDraftList(draftList.filter((d) => d.id !== id));
  };

  // Filtered newsletters
  const filteredNewsletters = newsletters.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-8 space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-500">Newsletter</h1>

        {/* Title Input dan button Draft */}
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

          {/* Tombol Draft */}
          <button
            className={`px-4 py-2 text-lg bg-blue-400 text-white font-medium rounded-lg 
                hover:bg-blue-600 transition 
                ${draftList.length ? "" : "opacity-50 cursor-not-allowed"}`}
            onClick={() => setShowDraftModal(true)}
            disabled={!draftList.length}
          >
            Draft
          </button>
        </div>

        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-gray-500 relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {preview ? (
            <div className="flex flex-col items-center">
              <img src={preview} alt="preview" className="h-24 mb-2 rounded" />
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

        {/* Rich Text Editor (Jodit) */}
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
          {/* Toggle */}
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
            <span className="text-gray-700 text-sm">Send after 24 hours</span>
          </label>

          {/* Buttons Send Newsletter */}
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
              Send Newsletter
            </button>
          </div>
        </div>

        {/* ----------Card List Newsletter----------- */}
        <div className="flex justify-between items-center mb-6">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Newsletter
            <span className="bg-blue-100 text-blue-600 text-sm px-2 py-0.5 rounded-full">
              {filteredNewsletters.length}
            </span>
          </h2>

          {/* Search & Filter */}
          <div className="relative" ref={filterRef}>
            <div className="flex items-center border rounded-full px-4 py-2 bg-white shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition">
              <input
                type="text"
                placeholder="Search by Title..."
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

            {/* Filter Dropdown */}
            {showFilter && (
              <div className="absolute right-0 mt-3 w-64 bg-white border rounded-xl shadow-lg p-5 z-20 animate-scaleIn">
                {/* Status */}
                <div className="mb-4">
                  <p className="font-semibold text-sm text-gray-700 mb-3 flex items-center gap-1">
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
                          className="text-blue-600"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filter */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      // reset filter logic
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

        {/* Newsletter Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid md:grid-cols-2 gap-6 leading-8">
            {filteredNewsletters.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <img
                  src={n.img}
                  alt={n.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="text-xs text-gray-500">
                    {n.time}, {n.date}
                  </p>
                  <span className="inline-block bg-gray-800 text-white text-xs px-2 py-1 rounded mt-1">
                    {n.type}
                  </span>
                  <h3 className="text-md font-semibold mt-2 line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {n.desc}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <Link
                      to={`/panels-admins/newsletter/edit/${n.id}`}
                      className="px-4 py-2 font-medium flex items-center gap-2 bg-blue-500 border border-blue-500 rounded-xl text-white text-sm shadow-sm hover:bg-blue-600 hover:scale-105 transition"
                    >
                      Edit
                    </Link>

                    <Link
                      to={`/panels-admins/newsletter/${n.id}`}
                      className="px-4 py-2 font-medium flex items-center gap-2 border border-blue-400 rounded-xl text-blue-600 hover:text-blue-800 text-sm hover:border-blue-500 hover:scale-105 shadow-sm transition"
                    >
                      See more
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Section */}
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
        {/* ----------END-------- */}

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center">
              {/* Icon Warning */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                <HiOutlineExclamationCircle size={32} />
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Masukkan ke draft?
              </h4>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6">
                Apakah ingin menyimpan inputan ke draft atau hapus saja?
              </p>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                  onClick={handleCancelModalYes}
                >
                  <FaSave /> Simpan
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                  onClick={handleCancelModalNo}
                >
                  <FaTrash /> Hapus
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-400 transition"
                  onClick={() => setShowCancelModal(false)}
                >
                  <FaTimes /> Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Draft Modal */}
        {showDraftModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-bold text-blue-500">Draft</h4>
                <button
                  onClick={() => setShowDraftModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                  &times;
                </button>
              </div>

              {draftList.length === 0 ? (
                <p className="text-gray-500 mb-4">Belum ada draft.</p>
              ) : (
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                  {draftList.map((draft, idx) => (
                    <div
                      key={draft.id}
                      className="border rounded-lg p-4 flex flex-col md:flex-row md:items-start gap-4 bg-gray-50 shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="font-semibold text-lg text-blue-700">
                          Draft #{idx + 1}
                        </div>
                        <div className="text-gray-700">
                          <span className="font-medium">Judul:</span>{" "}
                          {draft.title || "(Kosong)"}
                        </div>
                        <div className="text-gray-700">
                          <span className="font-medium">Isi:</span>
                          <div
                            className="mt-1 text-sm text-gray-600 prose max-w-none"
                            dangerouslySetInnerHTML={{
                              __html:
                                draft.content?.length > 200
                                  ? draft.content.slice(0, 200) + "..."
                                  : draft.content || "(Kosong)",
                            }}
                          ></div>
                        </div>
                        {draft.preview && (
                          <img
                            src={draft.preview}
                            alt="draft"
                            className="mt-2 h-20 w-20 object-cover rounded border"
                          />
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-row md:flex-col gap-2 md:items-end">
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition flex items-center gap-1"
                          onClick={() => handleDraftModalRestore(draft)}
                        >
                          + Tambah
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition flex items-center gap-1"
                          onClick={() => handleDeleteDraft(draft.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-end mt-8">
                <button
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition"
                  onClick={() => setShowDraftModal(false)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </NavBarCMS>
  );
}
