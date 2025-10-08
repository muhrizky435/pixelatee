import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBarCMS from "../../../components/CMS-Navbar";
import { getAllClientsAdmin, updateClientAdmin } from "../../../api/client.api";
import type { Client } from "../../../api/client.api";
import { FiImage } from "react-icons/fi";

export default function ClientEdit() {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const [, setClient] = useState<Client | null>(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch client data (Get Data Client)
  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const clients = await getAllClientsAdmin();
        const found = clients.find((c) => c.id === clientId);
        if (!found) {
          setError("Client not found");
          return;
        }
        setClient(found);
        setTitle(found.name);
        setPreview(
          `http://localhost:3000/client/${encodeURIComponent(found.logo)}`
        );
      } catch (err) {
        console.error(err);
        setError("Failed to fetch client data");
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [clientId]);

  // Drag & drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  // -------

  // Handle Cancel
  const handleCancel = () => {
    navigate("/panels-admins/clients");
  };

  // Handle Submit Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;
    setSaving(true);
    setError(null);

    try {
      await updateClientAdmin(clientId, {
        name: title,
        logo: file ?? undefined,
      });
      navigate("/panels-admins/clients");
    } catch (err) {
      console.error(err);
      alert("Error updating Client");
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <NavBarCMS>
        <main className="bg-gray-50 min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading client data...</p>
        </main>
      </NavBarCMS>
    );
  }

  if (error) {
    return (
      <NavBarCMS>
        <main className="bg-gray-50 min-h-screen flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </main>
      </NavBarCMS>
    );
  }

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-blue-500">
            Edit Client
          </h1>
          <button
            onClick={() => navigate("/panels-admins/clients")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium w-fit group transition"
          >
            <span className="transform transition-transform group-hover:-translate-x-1">
              &larr;
            </span>
            Back
          </button>
        </div>

        {/* Form */}
        <section className="space-y-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-5xl bg-white p-10 rounded-2xl shadow-sm border border-gray-200 space-y-6"
          >
            <h2 className="text-md font-semibold">Name Client</h2>

            {/* Input Nama Client */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title client"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
              required
            />

            {/* Upload Logo */}
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
                    className="h-32 mb-2 rounded"
                  />
                  <div className="flex gap-2">
                    <label className="text-blue-500 text-md hover:text-blue-800 cursor-pointer">
                      Update Logo
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
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                {saving ? "Updating..." : "Update Client"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </NavBarCMS>
  );
}
