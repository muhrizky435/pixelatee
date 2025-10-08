import { useState, useEffect } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiImage } from "react-icons/fi";
import JoditEditor from "jodit-react";
import NavBarCMS from "../../../components/CMS-Navbar";
import {
  updateAdminNewsletter,
  getAdminNewsletterPreview,
} from "../../../api/newsletter.api";

export default function EditNewsletter() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);

  // State
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [type, setType] = useState<"TECH" | "BUSINESS" | "INTERNAL" | "OTHER">(
    "TECH"
  );
  const [isScheduled, setIsScheduled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch newsletter detail (preview)
  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        if (!id) return;
        const data = await getAdminNewsletterPreview(id);
        setTitle(data.title || "");
        setContent(data.content || "");
        setType((data.type as typeof type) || "TECH");
        setIsScheduled(data.isScheduled ?? false);

        if (data.photo) {
          setExistingImage(
            `http://localhost:3000/newsletter/${encodeURIComponent(data.photo)}`
          );
        }
      } catch (err) {
        console.error("Failed to fetch newsletter:", err);
      }
    };
    fetchNewsletter();
  }, [id]);

  const isInputFilled = title.trim() !== "" && content.trim() !== "";

  // Update Newsletter
  const handleUpdate = async () => {
    if (!isInputFilled || !id) return;

    setLoading(true);
    try {
      await updateAdminNewsletter(id, {
        title,
        content,
        type,
        isScheduled,
        status: "PUBLISHED",
        file,
      });

      setShowUpdateSuccessModal(true);
    } catch (err) {
      console.error(err);
      alert("Error updating newsletter");
    } finally {
      setLoading(false);
    }
  };

  // File change
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

  const handleCancel = () => {
    navigate("/panels-admins/newsletter");
  };

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-blue-500">
            Edit Newsletter
          </h1>
          <button
            onClick={() => navigate("/panels-admins/newsletter")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium w-fit group transition"
          >
            <span className="transform transition-transform group-hover:-translate-x-1">
              &larr;
            </span>
            Back
          </button>
        </div>

        <section className="space-y-8">
          {/* Title */}
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

          {/* Type */}
          <select
            value={type}
            onChange={(e) =>
              setType(
                e.target.value as "TECH" | "BUSINESS" | "INTERNAL" | "OTHER"
              )
            }
            className="w-full py-2 px-3 border border-gray-300 rounded-lg"
          >
            <option value="TECH">Tech</option>
            <option value="BUSINESS">Business</option>
            <option value="INTERNAL">Internal</option>
            <option value="OTHER">Other</option>
          </select>

          {/* Scheduled */}
          {/* Toggle Schedule */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all peer-checked:translate-x-5"></div>
            </div>
            <span className="text-gray-700 text-sm">
              {isScheduled
                ? "Scheduled (Send after 24 hours)"
                : "Send Immediately"}
            </span>
          </label>

          {/* Upload */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-10 
                       flex flex-col items-center justify-center text-gray-500"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {preview || existingImage ? (
              <div className="flex flex-col items-center">
                <img
                  src={preview || existingImage!}
                  alt="preview"
                  className="h-42 mb-2 rounded"
                />
                <div className="flex gap-2">
                  <label className="text-blue-500 text-md hover:text-blue-800 cursor-pointer">
                    Update Image
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>
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

          {/* Editor */}
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

          {/* Actions */}
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
              disabled={loading}
            >
              {loading ? "Saving..." : "Update Newsletter"}
            </button>
          </div>
        </section>

        {/* Modal Success Update Newsletter */}
        {showUpdateSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center shadow-xl">
              <h2 className="text-lg font-semibold mb-4">Success!</h2>
              <p className="mb-6">Newsletter successfully updated.</p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                  setShowUpdateSuccessModal(false);
                  navigate("/panels-admins/newsletter");
                }}
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
