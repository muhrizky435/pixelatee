import React, { useState, useRef, useEffect } from "react";
import NavBarCMS from "../../../components/CMS-Navbar";
import { FiImage, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdOutlineSubtitles } from "react-icons/md";
import JoditEditor from "jodit-react";

export default function PortfolioEdit() {
  const [showFilter, setShowFilter] = useState(false);
  const [title, setTitle] = useState("");
  const [, setDraft] = useState(false);
  const [content, setContent] = useState("");
  const [, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const [client, setClient] = useState("");
  const Navigate = useNavigate();

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

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-8 space-y-8">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-3">
          <button
            onClick={() => Navigate("/panels-admins/portfolios")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 
               font-medium w-fit group transition"
          >
            <span className="transform transition-transform group-hover:-translate-x-1">
              &larr;
            </span>
            Kembali
          </button>

          <h1 className="text-3xl font-bold text-blue-500">Edit Portfolio</h1>
        </header>

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
              Update Portfolio
            </button>
          </div>
        </div>
      </main>
    </NavBarCMS>
  );
}
