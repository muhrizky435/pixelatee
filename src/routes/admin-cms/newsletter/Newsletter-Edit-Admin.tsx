import { useState, useEffect } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiImage } from "react-icons/fi";
import JoditEditor from "jodit-react";
import NavBarCMS from "../../../components/CMS-Navbar";

export default function EditNewsletter() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch data newsletter
  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const res = await fetch(`/api/v1/newsletters/${id}`);
        const data = await res.json();

        setTitle(data.title || "");
        setContent(data.content || "");
        if (data.imageUrl) setPreview(data.imageUrl as string);
      } catch (err) {
        console.error("Failed to fetch newsletter:", err);
      }
    };
    fetchNewsletter();
  }, [id]);

  // Handle file change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      setFile(dropped);
      setPreview(URL.createObjectURL(dropped));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const isInputFilled = title.trim() !== "" && content.trim() !== "";

  // Cancel
  const handleCancel = () => {
    navigate("/panels-admins/newsletter");
  };

  // Submit update
  const handleUpdate = async () => {
    if (!isInputFilled) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) formData.append("image", file);

      const res = await fetch(`/api/v1/newsletters/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update newsletter");
      navigate("/panels-admins/newsletter");
    } catch (err) {
      console.error(err);
      alert("Error updating newsletter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-8 space-y-8">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-3">
          <button
            onClick={() => navigate("/panels-admins/newsletter")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 
               font-medium w-fit group transition"
          >
            <span className="transform transition-transform group-hover:-translate-x-1">
              &larr;
            </span>
            Kembali
          </button>

          <h1 className="text-3xl font-bold text-blue-500">Edit Newsletter</h1>
        </header>

        <section className="space-y-8">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Newsletter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full py-2 px-3 text-lg border border-gray-300 rounded-lg 
               placeholder-gray-400 
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
               focus:shadow-md focus:shadow-blue-200 transition"
          />

          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-10 
                       flex flex-col items-center justify-center text-gray-500"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {preview ? (
              <div className="flex flex-col items-center">
                <img
                  src={preview}
                  alt="preview"
                  className="h-24 mb-2 rounded"
                />
                <button
                  type="button"
                  className="text-red-500 text-sm hover:underline"
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
                <label className="mt-2 text-blue-500 cursor-pointer hover:underline">
                  Attach File
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
                <p className="text-sm text-gray-400">Or Drag & Drop</p>
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-600 
                        text-white rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`px-6 py-2 bg-blue-500 hover:bg-blue-600 
                          text-white rounded-md ${loading ? "opacity-50" : ""}`}
              onClick={handleUpdate}
            >
              {loading ? "Saving..." : "Update Newsletter"}
            </button>
          </div>
        </section>
      </main>
    </NavBarCMS>
  );
}
