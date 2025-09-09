import React, { useState, useRef, useEffect } from "react";
import NavBarCMS from "../../../components/CMS-Navbar";
import { FiImage, FiFilter, FiUser, FiEdit } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router";

// dummy data portfolio
const portfolios = [
  {
    id: 1,
    title: "NovaLink Shortener",
    client: "BrigthWave Media",
    status: "Draft",
    date: "12 Aug 2024",
    time: "13:42",
    description : "A smart link shortening platform with real-time analytics and custom branding options.",
    img: "/img/crm.png",
    gallery: ["/img/crm.png", "/img/crm.png", "/img/photo1.jpeg", "/img/crm.png", "/img/crm.png", "/img/photo1.jpeg", "/img/crm.png"
      , "/img/crm.png", "/img/crm.png", "/img/crm.png", "/img/crm.png", "/img/crm.png"
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
    description : "A smart link shortening platform with real-time analytics and custom branding options.",
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
    description : "A smart link shortening platform with real-time analytics and custom branding options.",
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
    description : "A smart link shortening platform with real-time analytics and custom branding options.",
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
    description : "A smart link shortening platform with real-time analytics and custom branding options.",
    img: "/img/crm.png",
    gallery: ["/img/crm.png", "/img/crm.png", "/img/crm.png"],
    author: "Natasha",
  },
];

export default function PortfolioAdmin() {
    const [openAction, setOpenAction] = useState<number | null>(null);
    const [sendAfter24, setSendAfter24] = useState(true);
    const [showFilter, setShowFilter] = useState(false);
    const [title, setTitle] = useState("");
    const [client, setClient] = useState("");
    const [, setDraft] = useState(false);
    const [content, setContent] = useState("");
    const [, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const filterRef = useRef<HTMLDivElement>(null);
    const [selectedPortfolio, setSelectedPortfolio] = useState<any>(null);
    const navigate = useNavigate();
    const galleryRef = useRef<HTMLDivElement>(null);
    const [statusFilter, setStatusFilter] = useState<string>("");

    React.useEffect(() => {
        if (!showFilter) return;
        const handleClick = (e: MouseEvent) => {
          if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
            setShowFilter(false);
          }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
      }, [showFilter]);

      useEffect(() => {
        if (!selectedPortfolio || !galleryRef.current) return;
        const container = galleryRef.current;
        const interval = setInterval(() => {
          if(container){
            if(
              container.scrollLeft + container.clientWidth >= container.scrollWidth
            ){
              container.scrollTo({ left: 0, behavior: "smooth" });
            }else{
              container.scrollBy({ left: 150, behavior: "smooth" });
            }
          }
        }, 2500);
          return () => clearInterval(interval);
      }, [selectedPortfolio]);
    
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
    
      // Button actions
      const handleDraft = () => {
        setDraft(true);
      };
      const handleCancel = () => {
        setTitle("");
        setContent("");
        setFile(null);
        setPreview(null);
        setDraft(false);
      };
      const handleSend = () => {
        setTitle("");
        setContent("");
        setFile(null);
        setPreview(null);
        setDraft(false);
      };

      // Filtered portfolios
      const filteredPortfolios = portfolios.filter((p) => {
        const matchTitle = p.title.toLowerCase().includes(search.toLowerCase());
        const matchClient = p.client.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter ? p.status.toLowerCase() === statusFilter.toLowerCase() : true;
        return (matchTitle || matchClient) && matchStatus;
      });
      
      const handleViewDetail = (portfolio: any) => {
        setSelectedPortfolio(portfolio);
        setOpenAction(null);
      };

  return (
    <NavBarCMS>
          <main className="bg-gray-50 min-h-screen p-6 px-8 space-y-8">
            {/* Header */}
            <h1 className="text-3xl font-bold text-blue-500">Portfolio</h1>
    
            {/* Title Input dan button Draft */}
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="New Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 py-2 px-3 text-lg font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
              />
              <button
                className="px-4 py-2 text-lg bg-blue-400 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                onClick={handleDraft}
              >
                Draft
              </button>
            </div>

            {/* Client Input */}
            <p className="flex items-center text-gray-600 mb-1">
              <FiUser size={18} className="mr-2" />
              Client
            </p>

            <div className="relative w-full">
              <input
                type="text"
                placeholder="Client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full py-2 px-3 text-lg font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
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

            {/* Rich Text Editor (dummy toolbar + textarea) */}
            <div className="border rounded-lg bg-white">
              {/* Toolbar */}
              <div className="flex items-center gap-4 px-3 py-2 border-b text-gray-700 text-sm">
                <button
                  type="button"
                  className="hover:text-blue-600 font-bold"
                  onClick={() => setContent(content + "**bold**")}
                >
                  B
                </button>
                <button
                  type="button"
                  className="hover:text-blue-600 italic"
                  onClick={() => setContent(content + "*italic*")}
                >
                  I
                </button>
                <button
                  type="button"
                  className="hover:text-blue-600 underline"
                  onClick={() => setContent(content + "__underline__")}
                >
                  U
                </button>
                <button
                  type="button"
                  className="hover:text-blue-600"
                  onClick={() => setContent(content + "\n")}
                >
                  ≡
                </button>
                <button
                  type="button"
                  className="hover:text-blue-600"
                  onClick={() => setContent(content + "\n\n")}
                >
                  ≣
                </button>
              </div>
              {/* Text Area */}
              <textarea
                rows={8}
                className="w-full p-3 resize-none border-none focus:ring-0 text-gray-700 placeholder-gray-400"
                placeholder="Write your description here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
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

              {/* Buttons Send Portfolio */}
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  onClick={handleSend}
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
                          <input type="radio" name="status" value="publish"
                          checked={statusFilter === "publish"}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          /> Published
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="status" value="draft"
                          checked={statusFilter === "draft"}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          /> Draft
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="status" value="archive"
                          checked={statusFilter === "archive"}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          /> Archive
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="status"
                            value=""
                            checked={statusFilter === ""}
                            onChange={(e) => setStatusFilter(e.target.value)}
                          />
                          All
                        </label>
                      </div>
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
                      <td className="py-3 px-4 text-gray-600">{portfolio.client}</td>
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
                          onClick={() => setOpenAction(
                            openAction === portfolio.id ? null : portfolio.id
                          )}
                          className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                        >
                         <HiOutlineDotsVertical size={18} /> 
                        </button>
                        {openAction === portfolio.id && (
                        <div className="absolute top-1/1 right-20 -translate-y-1/2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 animate-fadeIn">
                          <button 
                          onClick={() => handleViewDetail(portfolio)}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition">
                            Lihat Detail
                          </button>
                          <button 
                          onClick={() => navigate(`/panels-admins/portfolios/edit/${portfolio.id}`)}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition">
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

            {selectedPortfolio && (
              <div className="fixed inset-0 bg-blue-300/50 flex items-end justify-center z-30">
                <div className="w-full max-w-6xl bg-white rounded-t-2xl shadow-lg p-6 transform transition-all duration-300 translate-y-0 animate-slideUp">
                  <div className="flex flex-col relative">
                      {/* Tombol Icon */}
                      <div className="flex justify-end gap-3 mb-3">
                        <button
                          onClick={() => navigate(`/panels-admins/portfolios/edit/${selectedPortfolio.id}`)}
                          className="p-2 text-gray-600"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => setSelectedPortfolio(null)}
                          className="p-2 text-gray-600"
                        >
                          ✕
                        </button>
                      </div>
                      
                    {/* Content 2 Kolom */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Kiri: Judul + Deskripsi */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800">{selectedPortfolio.title}</h2>
                          <p className="text-gray-600 mt-3">{selectedPortfolio.description}</p>
                      </div>
                    </div>

                      {/* Gambar Utama */}
                      <img
                        src={selectedPortfolio.img}
                        alt={selectedPortfolio.title}
                        className="w-full h-72 md:h-80 rounded-lg object-cover"
                      />
                    </div>
                  </div>

                  {/* Gallery */}
                  <h3 className="mt-8 mb-3 font-semibold">Gallery</h3>
                  <div ref={galleryRef} className="flex gap-3 overflow-hidden pb-3">
                    {selectedPortfolio.gallery.map((img: string, i: number) => (
                      <img
                        key={i}
                        src={img}
                        alt="gallery"
                        className="w-45 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-6">
                    Publish by {selectedPortfolio.author} at {selectedPortfolio.time}, {selectedPortfolio.date}
                  </p>
                </div>
              </div>
            )}
          </main>
        </NavBarCMS>
  );
}
