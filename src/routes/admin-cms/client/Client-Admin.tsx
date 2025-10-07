import { useEffect, useRef, useState } from "react";
import { FiImage, FiMoreVertical, FiSearch, FiFilter } from "react-icons/fi";
import NavBarCMS from "../../../components/CMS-Navbar";
import {
  getAllClientsAdmin,
  createClientAdmin,
  deleteClientAdmin,
  type Client,
  getClientLogoUrl,
} from "../../../api/client.api";
import { useNavigate } from "react-router";

export default function ClientPage() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [selectedClientForDelete, setSelectedClientForDelete] =
    useState<Client | null>(null);
  const [, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);

  const [modal, setModal] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({ open: false, type: "success", message: "" });

  // Fetch ( get data Clients)
  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await getAllClientsAdmin();

      console.log("data client:", data);

      const arr = Array.isArray(data) ? data : data?.clients ?? [];

      const normalized: Client[] = arr.map((c: any, idx: number) => ({
        ...c,
        id: (c.uuid ?? c.id ?? c.clientId ?? c._id)?.toString() || "",
        localKey: idx.toString(),
      }));

      setClients(normalized);
    } catch (err) {
      console.error(err);
      setError("failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Handle File Upload Preview
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
  // -------

  // Handle Cancel
  const handleCancel = () => {
    setTitle("");
    setFile(null);
    setPreview(null);
  };

  // Handle Create Client
  const handleSend = async () => {
    if (!title || !file) return;
    try {
      setLoading(true);
      await createClientAdmin(title, file);
      const data = await getAllClientsAdmin();

      const arr = Array.isArray(data) ? data : data?.clients ?? [];

      const normalized: Client[] = arr.map((c: any, idx: number) => ({
        ...c,
        id: (c.uuid ?? c.id ?? c.clientId ?? c._id)?.toString() || "",
        localKey: idx.toString(),
      }));

      setClients(normalized);
      setModal({
        open: true,
        type: "success",
        message: "Client successfully created and added!",
      });
      handleCancel();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setModal({ open: true, type: "error", message: error.message });
      } else {
        setModal({
          open: true,
          type: "error",
          message: "Failed created Client",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete Client
  const handleDeleteConfirm = async () => {
    if (!selectedClientForDelete?.id) {
      console.error("No client ID to delete");
      return;
    }

    console.log("Deleting client ID:", selectedClientForDelete.id);

    try {
      await deleteClientAdmin(selectedClientForDelete.id);
      console.log("✅ Deleted client:", selectedClientForDelete.name);

      setClients((prev) =>
        prev.filter((client) => client.id !== selectedClientForDelete.id)
      );

      setShowDeleteModal(false);
      setSelectedClientForDelete(null);
      setShowDeleteSuccessModal(true);
    } catch (error) {
      console.error("❌ Failed to delete Client:", error);
      setErrorMessage("Failed to delete Client!");
    }
  };

  // Klik di luar untuk menutup menu
  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (!openMenu) return;
      const el = menuRefs.current[openMenu];
      if (el && !el.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [openMenu]);

  const isInputFilled = !!title && !!file;

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-6 pb-10 px-4 md:px-10 space-y-8">
        <h1 className="text-xl font-semibold text-blue-600">Client</h1>

        {/* New Client */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">New Client</h2>

          {/* Input Nama Client */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title client"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
          />

          {/* Upload Gambar */}
          {/* --- Upload Area --- */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-gray-500 relative"
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

          <div className="flex justify-between items-center">
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
                !isInputFilled || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSend}
              disabled={!isInputFilled || loading}
            >
              {loading ? "Creating..." : "Create Client"}
            </button>
          </div>
        </section>

        {/* Clients List */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              Client{" "}
              <span className="text-gray-500 ml-1">{clients.length ?? 0}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Name"
                  className="border border-gray-300 rounded-md pl-8 pr-2 py-1.5 text-sm w-48"
                />
                <FiSearch className="absolute left-2 top-2.5 text-gray-400" />
              </div>
              <button className="border border-gray-300 rounded-md p-1.5 hover:bg-gray-100">
                <FiFilter className="text-gray-500" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-10">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
              {clients.map((client) => (
                <div
                  key={client.localKey}
                  ref={(el) => (menuRefs.current[client.localKey] = el)}
                  className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col items-center"
                >
                  {/* Tombol titik tiga di pojok kanan atas */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu((prev) =>
                        prev === client.localKey ? null : client.localKey
                      );
                    }}
                    className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
                  >
                    <FiMoreVertical />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenu === client.localKey && (
                    <div className="absolute top-8 right-2 bg-white shadow-lg rounded-md border border-gray-100 text-sm w-28 z-10">
                      <button
                        onClick={() =>
                          navigate(`/panels-admins/client/edit/${client.id}`)
                        }
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedClientForDelete(client);
                          setShowDeleteModal(true);
                          setOpenMenu(null);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition"
                      >
                        Hapus
                      </button>
                    </div>
                  )}

                  {/* Isi Card */}
                  <img
                    src={getClientLogoUrl(client.logo)}
                    alt={client.name}
                    className="w-32 h-32 object-contain"
                    onError={(e) => (e.currentTarget.src = "/img/Logo.png")}
                  />

                  <p className="text-sm font-medium text-gray-700 text-center">
                    {client.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* --- Modal Success/Error --- */}
      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-130 text-center">
            <h2
              className={`text-xl font-bold mb-4 ${
                modal.type === "success" ? "text-blue-600" : "text-red-600"
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

      {/* Modal Hapus Client */}
      {showDeleteModal && selectedClientForDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Delete Client
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "
              <span className="font-medium">
                {selectedClientForDelete.name}
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
            <p className="mb-6">Client successfully delete.</p>
            <button
              onClick={() => setShowDeleteSuccessModal(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </NavBarCMS>
  );
}
