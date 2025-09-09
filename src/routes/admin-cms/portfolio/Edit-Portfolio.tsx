import React, { useState, useRef } from "react";
import NavBarCMS from "../../../components/CMS-Navbar";
import { FiImage } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi";

export default function PortfolioEdit() {
    const [showFilter, setShowFilter] = useState(false);
    const [title, setTitle] = useState("");
    const [, setDraft] = useState(false);
    const [content, setContent] = useState("");
    const [, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const filterRef = useRef<HTMLDivElement>(null);

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
          <main className="bg-gray-50 min-h-screen p-6 px-8 space-y-8">

            {/* Header */}
            <button>
                <HiArrowLeft 
                size={22} 
                className="mb-4 text-gray-600 hover:text-blue-500 cursor-pointer"
                onClick={() => window.history.back()}
                />
            </button>
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
                placeholder="Write your description here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
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
