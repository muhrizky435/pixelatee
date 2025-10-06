import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBarCMS from "../../../components/CMS-Navbar";
import { getAllClientsAdmin, updateClientAdmin } from "../../../api/client.api";
import type { Client } from "../../../api/client.api";
import { FiUpload } from "react-icons/fi";

export default function ClientEdit() {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const [, setClient] = useState<Client | null>(null);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch client data
  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const clients = await getAllClientsAdmin();

        console.log("clients:", clients);

        const found = clients.find((c) => c.id === clientId);
        if (!found) {
          setError("Client not found");
          return;
        }
        setClient(found);
        setName(found.name);
        setPreviewLogo(`${import.meta.env.VITE_BASE_URL}/client/${found.logo}`);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch client data");
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [clientId]);

  // Handle logo change
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;
    setSaving(true);
    setError(null);

    try {
      await updateClientAdmin(clientId, { name, logo: logo ?? undefined });
      navigate("/panels-admins/clients");
    } catch (err) {
        console.error(err);
        alert("Error updating Client");
      } finally {
        setSaving(false);
      }
  };

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
      <main className="bg-gray-50 min-h-screen pt-10 pb-16 px-6 md:px-10">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Client
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Client
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo Client
              </label>
              {previewLogo && (
                <img
                  src={previewLogo}
                  alt="Client Logo"
                  className="w-32 h-32 object-contain mb-3 border border-gray-200 rounded-lg"
                />
              )}
              <label className="flex items-center gap-2 cursor-pointer text-indigo-600 hover:text-indigo-700">
                <FiUpload />
                <span>Ganti Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </NavBarCMS>
  );
}
