import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { FiImage, FiFilter } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineSubtitles } from "react-icons/md";
import JoditEditor from "jodit-react";
import { AxiosError } from "axios";

import NavBarCMS from "../../../components/CMS-Navbar";
import PortfolioModal from "./Portfolio-Detail-Admin";

import {
  createPortfolioAdmin,
  deletePortfolioAdmin,
  getAllPortfoliosAdmin,
  type Portfolio,
} from "../../../api/portfolio.api";
import {
  getClientsForPortfolioForm,
  type Client,
} from "../../../api/client.api";

// Extend Portfolio API dengan tambahan field untuk UI
interface PortfolioUI extends Portfolio {
  date: string;
  time: string;
  img: string;
  author?: string;
}

export default function PortfolioAdmin() {
  const navigate = useNavigate();
  const galleryRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const filterRef = useRef<HTMLDivElement>(null);

  // State portfolio & client
  const [portfolios, setPortfolios] = useState<PortfolioUI[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] =
    useState<PortfolioUI | null>(null);
  const [selectedPortfolioForDelete, setSelectedPortfolioForDelete] =
    useState<PortfolioUI | null>(null);

  // Loading & error
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [sendAfter24, setSendAfter24] = useState(false);

  // UI state (modal, filter, pagination)
  const [openAction, setOpenAction] = useState<string | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showCreateSuccessModal, setShowCreateSuccessModal] = useState(false);
  const [showCreateErrorModal, setShowCreateErrorModal] = useState(false);

  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    totalData: 0,
    totalPage: 1,
  });

  // Filtered portfolios
  const filteredPortfolios = portfolios.filter((p) => {
    const matchTitle = p.title.toLowerCase().includes(search.toLowerCase());
    const matchClient = p.client?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus
      ? p.status?.toLowerCase() === filterStatus.toLowerCase()
      : true;

    return (matchTitle || matchClient) && matchStatus;
  });

  // tutup tombol menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openAction) {
        const menuEl = menuRefs.current[openAction];
        if (menuEl && !menuEl.contains(e.target as Node)) {
          setOpenAction(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openAction]);

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await getClientsForPortfolioForm();
        setClients(res);
      } catch (err) {
        console.error("Gagal fetch clients:", err);
      }
    };
    fetchClients();
  }, []);

  // Fetch portfolios
  const fetchPortfolios = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllPortfoliosAdmin({ page: pagination.page });

      if (!res || !res.portfolios) {
        console.error("API tidak mengembalikan portfolios:", res);
        setPortfolios([]);
        return;
      }

      const mapped: PortfolioUI[] = res.portfolios.map((item: Portfolio) => {
        const imgSrc = item.mainImage
          ? `http://localhost:3000/portfolio/${encodeURIComponent(
              item.mainImage
            )}`
          : "/img/Logo.png";

        return {
          ...item,
          date: new Date(item.createdAt!).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          time: new Date(item.createdAt!).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          img: imgSrc,
          status: item.status?.toUpperCase() || "PUBLISHED",
          author: "Admin",
        };
      });

      setPortfolios(mapped);
      setPagination(res.pagination);
    } catch (err) {
      console.error("Failed to fetch portfolios", err);
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page]);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  // Tambah portfolio
  const handleSend = async () => {
    if (!isInputFilled) return;

    try {
      const payload = {
        title,
        description,
        status: sendAfter24 ? "DRAFT" : "PUBLISHED",
        client,
      };
      const files: File[] = file ? [file] : [];

      await createPortfolioAdmin(payload, files);
      setShowCreateSuccessModal(true);
      handleCancel();
      fetchPortfolios();
    } catch (error) {
      const err = error as AxiosError<{ message?: string; errors?: string[] }>;
      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else if (err.response?.data?.errors) {
        setErrorMessage(err.response.data.errors.join(", "));
      } else {
        setErrorMessage("Failed to create portfolio. Please try again.");
      }
      setShowCreateErrorModal(true);
    }
  };

  // Delete portfolio
  const handleDeleteConfirm = async () => {
    if (!selectedPortfolioForDelete) return;

    try {
      await deletePortfolioAdmin(selectedPortfolioForDelete.id);
      setPortfolios((prev) =>
        prev.filter((p) => p.id !== selectedPortfolioForDelete.id)
      );
      fetchPortfolios();
      setShowDeleteModal(false);
      setSelectedPortfolioForDelete(null);
      setShowDeleteSuccessModal(true);
    } catch (error) {
      console.error("Failed to delete portfolio:", error);
      setErrorMessage("Failed to delete portfolio!");
      setShowCreateErrorModal(true);
    }
  };

  // Reset form
  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setPreview(null);
    setSendAfter24(true);
  };

  // File handlers
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

  const isInputFilled = !!title || !!file;

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-2 md:px-8 space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-500">Portfolio</h1>

        {/* Title Input dan button Draft */}
        <p className="flex items-center text-gray-400 mb-1">
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

        {/* Client Input */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Client
          </label>
          <select
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="" disabled className="text-gray-300">
              -- Pilih Client --
            </option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
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
              <img src={preview} alt="preview" className="h-24 mb-2 rounded" />
              <button
                type="button"
                className="text-red-500 text-sm"
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

        {/* Buttons Add More File */}
        {/* <div className="flex justify-end">
          <button
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            onClick={handleSend}
          >
            Add More File
          </button>
        </div> */}

        {/* Rich Text Editor */}
        <div className="border rounded-lg bg-white overflow-hidden">
          <JoditEditor
            value={description}
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
            onBlur={(newDescription) => setDescription(newDescription)}
          />
        </div>

        {/* Options + Buttons */}
        <div className="flex flex-col gap-4">
          {/* Toggle */}
          {/* Toggle untuk Draft / Publish */}
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
              {sendAfter24 ? "Save as Draft" : "Publish Now"}
            </span>
          </label>

          {/* Buttons Send Portfolio */}
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
              Send Portfolio
            </button>
          </div>
        </div>

        {/* Card List Portfolio */}
        {/* Portfolio List */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            Portfolio{" "}
            <span className="text-gray-500">{filteredPortfolios.length}</span>
          </h2>

          {/* Search & Filter */}
          <div className="relative" ref={filterRef}>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <input
                type="text"
                placeholder="Search by Title, Client"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none text-sm w-40 md:w-64"
              />
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="ml-2 text-gray-600 hover:text-gray-900"
                type="button"
              >
                <FiFilter size={18} />
              </button>
            </div>

            {/* Filter Dropdown */}
            {showFilter && (
              <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg p-4 z-10">
                <div className="mb-3">
                  <p className="font-medium text-sm text-gray-700 mb-2">
                    Status
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="PUBLISHED"
                        checked={filterStatus === "PUBLISHED"}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />{" "}
                      Published
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="DRAFT"
                        checked={filterStatus === "DRAFT"}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />{" "}
                      Draft
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="ARCHIVED"
                        checked={filterStatus === "ARCHIVED"}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />{" "}
                      Archived
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value=""
                        checked={filterStatus === ""}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />
                      All
                    </label>
                  </div>
                </div>
                {/* Clear Filter */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setFilterStatus(null);
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

        {/* Portfolio Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-blue-500 border-b">
                <th className="py-2 px-4 text-blue-500">Portfolio</th>
                <th className="py-2 px-4 text-blue-500">Client</th>
                <th className="py-2 px-4 text-blue-500">Status</th>
                <th className="py-2 px-4 text-blue-500">Date</th>
                <th className="py-2 px-4 text-blue-500">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                // Skeleton rows
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded" />
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="h-4 w-6 bg-gray-200 rounded ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredPortfolios.length > 0 ? (
                filteredPortfolios.map((portfolio) => (
                  <tr
                    key={portfolio.id}
                    className="border-gray-200 border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={portfolio.img}
                        alt={portfolio.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="font-medium text-gray-700">
                        {portfolio.title}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      {portfolio.client}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          portfolio.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : portfolio.status === "DRAFT"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {portfolio.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {portfolio.time}, {portfolio.date}
                    </td>

                    {/* tombol menu */}
                    <td
                      className="py-3 px-4 relative"
                      ref={(el) => {
                        menuRefs.current[portfolio.id] = el;
                      }}
                    >
                      <button
                        onClick={() =>
                          setOpenAction(
                            openAction === portfolio.id ? null : portfolio.id
                          )
                        }
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                      >
                        <HiOutlineDotsVertical size={18} />
                      </button>

                      {openAction === portfolio.id && (
                        <div className="absolute top-1/1 right-20 -translate-y-1/2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 animate-fadeIn">
                          <button
                            onClick={() => setSelectedPortfolio(portfolio)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition"
                          >
                            Lihat Detail
                          </button>
                          <button
                            onClick={() =>
                              navigate(
                                `/panels-admins/portfolios/edit/${portfolio.id}`
                              )
                            }
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition"
                          >
                            Edit
                          </button>
                          <div className="border-t border-gray-100"></div>
                          <button
                            onClick={() => {
                              setSelectedPortfolioForDelete(portfolio);
                              setShowDeleteModal(true);
                              setOpenAction(null);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition"
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Tidak ada portfolio ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {!loading && (
            <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
              <span>
                Showing {filteredPortfolios.length} of {portfolios.length}{" "}
                entries
              </span>
              <div className="flex gap-2 items-center">
                <button className="px-2 py-1">&lt; Previous</button>
                <button className="px-2 py-1">1</button>
                <button className="px-2 py-1">2</button>
                <button className="px-2 py-1">3</button>
                <button className="px-2 py-1">Next &gt;</button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Hapus Portfolio */}
        {showDeleteModal && selectedPortfolioForDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Delete Portfolio
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "
                <span className="font-medium">
                  {selectedPortfolioForDelete.title}
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
              <p className="mb-6">Portfolio successfully delete.</p>
              <button
                onClick={() => setShowDeleteSuccessModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal Success Create Portfolio */}
        {showCreateSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center shadow-xl">
              <h2 className="text-lg font-semibold mb-4">Success!</h2>
              <p className="mb-6">Portfolio successfully created and added.</p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowCreateSuccessModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Modal Error Create Portfolio */}
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

        {/* Modal Detail Portfolio */}
        <PortfolioModal
          portfolio={selectedPortfolio}
          onClose={() => setSelectedPortfolio(null)}
          galleryRef={galleryRef}
        />
      </main>
    </NavBarCMS>
  );
}
