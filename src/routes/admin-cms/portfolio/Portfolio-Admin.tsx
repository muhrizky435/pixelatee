import React, { useState, useRef, useEffect } from "react";
import NavBarCMS from "../../../components/CMS-Navbar";
import PortfolioModal from "./Portfolio-Detail-Admin";
import { FiImage, FiFilter, FiUser } from "react-icons/fi";
import { HiOutlineDotsVertical, HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router";
import JoditEditor from "jodit-react";
import { MdAdd, MdDeleteOutline, MdOutlineSubtitles } from "react-icons/md";
import { FaSave, FaTimes, FaTrash } from "react-icons/fa";

interface Portfolio {
  id: number;
  title: string;
  client: string;
  status: string;
  date: string;
  time: string;
  description: string;
  img: string;
  gallery: string[];
  author: string;
}

// dummy data portfolio
const portfolios = [
  {
    id: 1,
    title: "NovaLink Shortener",
    client: "BrigthWave Media",
    status: "Draft",
    date: "12 Aug 2024",
    time: "13:42",
    description:
      "A smart link shortening platform with real-time analytics and custom branding options.",
    img: "/img/crm.png",
    gallery: [
      "/img/crm.png",
      "/img/crm.png",
      "/img/photo1.jpeg",
      "/img/crm.png",
      "/img/crm.png",
      "/img/photo1.jpeg",
      "/img/crm.png",
      "/img/crm.png",
      "/img/crm.png",
      "/img/crm.png",
      "/img/crm.png",
      "/img/crm.png",
    ],
    author: "Natasha",
  },
  {
    id: 2,
    title: "CoreCMS",
    client: "BrigthWave Media",
    status: "Publish",
    date: "12 Aug 2024",
    time: "13:42",
    description:
      "A smart link shortening platform with real-time analytics and custom branding options.",
    img: "/img/crm.png",
    gallery: ["/img/crm.png", "/img/crm.png", "/img/crm.png"],
    author: "Natasha",
  },
  {
    id: 3,
    title: "SkyHost Cloud",
    client: "BrigthWave Media",
    status: "Publish",
    date: "12 Aug 2024",
    time: "13:42",
    description:
      "A smart link shortening platform with real-time analytics and custom branding options.",
    img: "/img/crm.png",
    gallery: ["/img/crm.png", "/img/crm.png", "/img/crm.png"],
    author: "Natasha",
  },
  {
    id: 4,
    title: "ShopMaster E-Commerce",
    client: "BrigthWave Media",
    status: "Publish",
    date: "12 Aug 2024",
    time: "13:42",
    description:
      "A smart link shortening platform with real-time analytics and custom branding options.",
    img: "/img/crm.png",
    gallery: ["/img/crm.png", "/img/crm.png", "/img/crm.png"],
    author: "Natasha",
  },
  {
    id: 5,
    title: "PeopleFlow HRIS",
    client: "BrigthWave Media",
    status: "Archive",
    date: "12 Aug 2024",
    time: "13:42",
    description:
      "A smart link shortening platform with real-time analytics and custom branding options.",
    img: "/img/crm.png",
    gallery: ["/img/crm.png", "/img/crm.png", "/img/crm.png"],
    author: "Natasha",
  },
];

export default function PortfolioAdmin() {
  const [openAction, setOpenAction] = useState<number | null>(null);
  const [sendAfter24, setSendAfter24] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(
    null
  );

  // use state form
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // state filter & search
  const [preview, setPreview] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // ref
  const menuRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // state modal & open menu dropdown
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [showDraftModal, setShowDraftModal] = useState(false);

  // Filtered portfolios
  const filteredPortfolios = portfolios.filter((p) => {
    const matchTitle = p.title.toLowerCase().includes(search.toLowerCase());
    const matchClient = p.client.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus
      ? p.status.toLowerCase() === filterStatus.toLowerCase()
      : true;
    return (matchTitle || matchClient) && matchStatus;
  });

  
  // draft list 
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


  // Dropdown close on outside click (menu)
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

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-8 space-y-8">
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

        {/* Client Input */}
        <p className="flex items-center text-gray-400 mb-1">
          <FiUser size={18} className="mr-2" />
          Client
        </p>

        <div className="relative w-full">
          <input
            type="text"
            placeholder="Client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="flex-1 py-2 px-3 w-full text-lg border border-gray-300 rounded-lg 
               placeholder-gray-400 
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
               focus:shadow-md focus:shadow-blue-200 transition"
          />
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
                className="text-red-500 text-sm underline"
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
        <div className="flex justify-end">
          <button
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            onClick={handleSend}
          >
            Add More File
          </button>
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
                        value="publish"
                        checked={filterStatus === "publish"}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />{" "}
                      Published
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="draft"
                        checked={filterStatus === "draft"}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />{" "}
                      Draft
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="archive"
                        checked={filterStatus === "archive"}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />{" "}
                      Archive
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
              {filteredPortfolios.map((portfolio) => (
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
                        portfolio.status === "Publish"
                          ? "bg-green-100 text-green-800"
                          : portfolio.status === "Draft"
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
                  <td className="py-3 px-4 relative">
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
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition"
                        >
                          Edit
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

          {/* Pagination */}
          <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
            <span>
              Showing {filteredPortfolios.length} of {portfolios.length} entries
            </span>
            <div className="flex gap-2 items-center">
              <button className="px-2 py-1">&lt; Previous</button>
              <button className="px-2 py-1">1</button>
              <button className="px-2 py-1">2</button>
              <button className="px-2 py-1">3</button>
              <button className="px-2 py-1">Next &gt;</button>
            </div>
          </div>
        </div>

        {/* Modal Detail Portfolio */}
        <PortfolioModal
          portfolio={selectedPortfolio}
          onClose={() => setSelectedPortfolio(null)}
          galleryRef={galleryRef}
        />
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
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">Draft</h4>
                <button
                  onClick={() => setShowDraftModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  &times;
                </button>
              </div>

              {draftList.length === 0 ? (
                <p className="text-gray-500 text-sm">Belum ada draft.</p>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {draftList.map((draft, idx) => (
                    <div
                      key={draft.id}
                      className="border rounded-lg px-4 py-3 flex items-center justify-between hover:shadow transition"
                    >
                      <span className="font-medium text-gray-700">
                        {"Draft #" + (idx + 1) + " " + draft.title}
                      </span>

                      <div className="flex items-center gap-2">
                        {/* Tombol Tambah */}
                        <button
                          className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                          onClick={() => handleDraftModalRestore(draft)}
                        >
                          <MdAdd />
                        </button>

                        {/* Tombol Hapus */}
                        <button
                          className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                          onClick={() => handleDeleteDraft(draft.id)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-end mt-5">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition text-sm"
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
