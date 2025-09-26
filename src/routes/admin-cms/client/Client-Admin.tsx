import { useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import NavBarCMS from "../../../components/CMS-Navbar";
import { MdOutlineSubtitles } from "react-icons/md";
import type { Client } from "../../../api/client.api";
import {
  getAllClientsAdmin,
  deleteClientAdmin,
  createClientAdmin,
} from "../../../api/client.api";


export default function AdminClient() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    id: string | null;
  }>({ open: false, id: null });

  // Modal state
  const [modal, setModal] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({ open: false, type: "success", message: "" });

  // Drag & drop
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

  const handleCancel = () => {
    setTitle("");
    setFile(null);
    setPreview(null);
  };


  // Ambil data client dari backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getAllClientsAdmin();
        setClients(data);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    };
    fetchClients();
  }, []);

  // Kirim ke backend
  const handleSend = async () => {
    if (!title || !file) return;
    try {
      setLoading(true);
      const res = await createClientAdmin(title, file);

      setClients((prev) => [...prev, res]);

      setModal({
        open: true,
        type: "success",
        message: "Client berhasil ditambahkan!",
      });
      console.log("Response:", res);
      handleCancel();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setModal({ open: true, type: "error", message: error.message });
      } else {
        setModal({
          open: true,
          type: "error",
          message: "Gagal menambahkan client",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // handle delete client
  const handleDelete = async (id: string) => {
    try {
      await deleteClientAdmin(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete contact:", err);
    }
  };

  // Filter client berdasarkan search
  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const isInputFilled = !!title && !!file;

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-2 md:px-8 space-y-8">
        <h1 className="text-3xl font-bold text-blue-500 mb-6">Clients</h1>

        {/* Title Input */}
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

        {/* Buttons */}
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
            className={`px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-2 ${
              !isInputFilled || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSend}
            disabled={!isInputFilled || loading}
          >
            {loading ? "Creating..." : "Create Client"}
          </button>
        </div>

        {/* Section Card Client */}
        <section className="px-1 md:px-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              Client <span className="ml-1">{clients.length}</span>
            </h2>
            <input
              type="text"
              placeholder="Search by Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64"
            />
          </div>

          {/* Grid Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {filteredClients.map((client, index) => (
              <div
                key={client.id || index}
                className="bg-white border border-gray-300 rounded-lg shadow-xl relative p-6 flex flex-col items-center justify-center"
              >
                {/* logo */}
                <img
                  src={`${BASE_URL}/client/${client.logo}`}
                  alt={client.name}
                  className="w-35 h-35 object-contain mb-4"
                />

                {/* Nama */}
                <p className="text-sm font-medium">{client.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal Berhasil Tambah Client */}
      {modal.open && (
        <div className="fixed inset-0 bg-blue-100/60 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-130 text-center">
            <h2
              className={`text-xl font-bold mb-4 ${
                modal.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.type === "success" ? "Success" : "Error"}
            </h2>
            <p className="mb-6 font-semibold">{modal.message}</p>
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              onClick={() => setModal({ ...modal, open: false })}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Modal Confirm Delete */}
      {confirmDelete.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-lg font-bold mb-4">Yakin hapus client ini?</h2>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setConfirmDelete({ open: false, id: null })}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={async () => {
                  if (confirmDelete.id) await handleDelete(confirmDelete.id);
                  setConfirmDelete({ open: false, id: null });
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </NavBarCMS>
  );
}
