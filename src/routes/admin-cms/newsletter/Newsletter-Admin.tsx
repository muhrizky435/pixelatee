import React, { useState, useRef } from "react";
import NavBarCMS from "../../../components/CMS-Navbar";
import { FiImage, FiFilter } from "react-icons/fi";
import { Link } from "react-router";

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

export default function Newsletter() {
  const [sendAfter24, setSendAfter24] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [title, setTitle] = useState("");
  const [, setDraft] = useState(false);
  const [content, setContent] = useState("");
  const [, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);

  // Dropdown close on outside click

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

  // Filtered newsletters
  const filteredNewsletters = newsletters.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen p-6 px-8 space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-500">Newsletter</h1>

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
            placeholder="Write your newsletter here..."
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

          {/* Buttons Send Newsletter */}
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
              Send Newsletter
            </button>
          </div>
        </div>

        {/* Card List Newsletter */}
        {/* Newsletter List */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            Newsletter{" "}
            <span className="text-gray-500">{filteredNewsletters.length}</span>
          </h2>

          {/* Search & Filter */}
          <div className="relative" ref={filterRef}>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <input
                type="text"
                placeholder="Search by Title"
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
                      <input type="radio" name="status" /> Sent
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="status" /> Schedule
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="status" /> Archive
                    </label>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-700 mb-2">Type</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="type" /> Tech
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="type" /> Business
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="type" /> Internal
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="type" /> Other
                    </label>
                  </div>
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
                  <Link
                    to={`/panels-admins/newsletter/${n.id}`}
                    className="px-2 mt-4 font-semibold flex text-right border border-gray-300 rounded-lg gap-1 group w-fit text-blue-600 hover:text-blue-800 text-md"
                  >
                    See more
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </NavBarCMS>
  );
}
