// portfolio-edit.tsx
import { useState, useEffect } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiImage } from "react-icons/fi";
import JoditEditor from "jodit-react";
import NavBarCMS from "../../../components/CMS-Navbar";
import {
  updatePortfolioAdmin,
  getAdminPortfolioPreview,
  type Portfolio,
} from "../../../api/portfolio.api";
import {
  getClientsForPortfolioForm,
  type Client,
} from "../../../api/client.api";

export default function EditPortfolio() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);

  // State
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  // get client
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

  // Fetch portfolio detail (preview)
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (!id) return;
        const data = await getAdminPortfolioPreview(id);
        console.log("portfolio preview", data);

        setPortfolio(data);
        setTitle(data.title || "");
        setDescription(data.description || "");

        if (data.mainImage) {
          setExistingImage(`http://localhost:3000/portfolio/${encodeURIComponent(data.mainImage)}`);
        }
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
      }
    };
    fetchPortfolio();
  }, [id]);

  // Cocokkan client name dari portfolio dengan daftar clients -> ambil UUID
  useEffect(() => {
    if (portfolio && clients.length > 0) {
      const matchedClient = clients.find((c) => c.name === portfolio.client);
      if (matchedClient) {
        setClient(matchedClient.id);
      }
    }
  }, [portfolio, clients]);

  const isInputFilled =
    title.trim() !== "" && description.trim() !== "" && client.trim() !== "";

  // Update portfolio
  const handleUpdate = async () => {
    if (!isInputFilled || !id) return;

    setLoading(true);
    try {
      await updatePortfolioAdmin(
        id,
        {
          title,
          description,
          status: "PUBLISHED",
          client, 
        },
        file ? [file] : []
      );

      setShowUpdateSuccessModal(true);
      
    } catch (err) {
      console.error(err);
      alert("Error updating portfolio");
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
    navigate("/panels-admins/portfolios");
  };

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-8 space-y-8">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-3">
          <button
            onClick={() => navigate("/panels-admins/portfolios")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium w-fit group transition"
          >
            <span className="transform transition-transform group-hover:-translate-x-1">
              &larr;
            </span>
            Back
          </button>

          <h1 className="text-3xl font-bold text-blue-500">Edit Portfolio</h1>
        </header>

        <section className="space-y-8">
          {/* Title */}
          <input
            type="text"
            placeholder="Portfolio Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full py-2 px-3 text-lg border border-gray-300 rounded-lg placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
              focus:shadow-md focus:shadow-blue-200 transition"
          />

          {/* Client Input */}
          <div>
            <label className="block text-md font-medium text-gray-400 mb-1">
              Client
            </label>
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="" disabled>
                -- Pilih Client --
              </option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

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
                <button
                  type="button"
                  className="text-red-500 text-sm hover:underline"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setExistingImage(null);
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

          {/* Editor */}
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
              onBlur={(newContent) => setDescription(newContent)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md ${
                loading ? "opacity-50" : ""
              }`}
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Saving..." : "Update Portfolio"}
            </button>
          </div>
        </section>

        {/* Modal Success Update */}
        {showUpdateSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center shadow-xl">
              <h2 className="text-lg font-semibold mb-4">Success!</h2>
              <p className="mb-6">Portfolio successfully updated.</p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                  setShowUpdateSuccessModal(false);
                  navigate("/panels-admins/portfolios");
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
