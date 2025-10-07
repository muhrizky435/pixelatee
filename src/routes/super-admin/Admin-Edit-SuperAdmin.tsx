// Admin-Edit.tsx
import { useEffect, useState } from "react";
import {
  getAdminDetail,
  updateAdminPermissions,
  type AdminDetail,
  type AdminPermission,
} from "../../api/super-admin.api";
import { useParams, useNavigate } from "react-router-dom";
import NavBarCMS from "../../components/CMS-Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminEditPage() {
  const { adminId } = useParams<{ adminId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [admin, setAdmin] = useState<AdminDetail | null>(null);
  const [permissions, setPermissions] = useState<AdminPermission | null>(null);
  const [modal, setModal] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Fetch admin detail
  useEffect(() => {
    if (!adminId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAdminDetail(adminId);
        setAdmin(data);
        setPermissions(data.permissions || {});
      } catch (err) {
        console.error("Failed to fetch admin detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [adminId]);

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPermissions((prev) =>
      prev ? { ...prev, [name as keyof AdminPermission]: checked } : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId || !permissions) return;

    try {
      setSaving(true);
      await updateAdminPermissions(adminId, permissions);
      setModal({
        type: "success",
        message: "Permissions have been successfully updated!",
      });
    } catch (err) {
      console.error("Failed to update permissions:", err);
      setModal({
        type: "error",
        message: "Failed to update permissions. Please try again later.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-[60vh] text-gray-500 text-lg animate-pulse">
        Loading admin data...
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        Admin not found
      </div>
    );
  }

  const permissionGroups = [
    {
      title: "Admin",
      keys: [
        "canReadAdmin",
        "canWriteAdmin",
        "canUpdateAdmin",
        "canDeleteAdmin",
      ],
    },
    {
      title: "Client",
      keys: [
        "canReadClient",
        "canWriteClient",
        "canUpdateClient",
        "canDeleteClient",
      ],
    },
    {
      title: "Contact",
      keys: [
        "canReadContact",
        "canWriteContact",
        "canUpdateContact",
        "canDeleteContact",
      ],
    },
    {
      title: "Newsletter",
      keys: [
        "canReadNewsletter",
        "canWriteNewsletter",
        "canUpdateNewsletter",
        "canDeleteNewsletter",
      ],
    },
    {
      title: "Portfolio",
      keys: [
        "canReadPortfolio",
        "canWritePortfolio",
        "canUpdatePortfolio",
        "canDeletePortfolio",
      ],
    },
  ];

  return (
    <NavBarCMS>
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-blue-500">
            Edit Admin Permissions
          </h1>
          <button
            onClick={() => navigate("/panels-superadmins/list-admins")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium w-fit group transition"
          >
            <span className="transform transition-transform group-hover:-translate-x-1">
              &larr;
            </span>
            Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-8 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Manage Permissions
          </h2>

          {permissions && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {permissionGroups.map((group) => (
                <div
                  key={group.title}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                >
                  <h3 className="font-medium text-gray-700 mb-3">
                    {group.title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {group.keys.map((perm) => (
                      <label
                        key={perm}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name={perm}
                          checked={
                            permissions?.[perm as keyof AdminPermission] ??
                            false
                          }
                          onChange={handlePermissionChange}
                          className="rounded accent-blue-600 w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">
                          {perm.replace(/^can/, "").replace(/([A-Z])/g, " $1")}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal.type && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
            >
              <h3
                className={`text-xl font-semibold mb-3 ${
                  modal.type === "success" ? "text-blue-600" : "text-red-600"
                }`}
              >
                {modal.type === "success" ? "Success!" : "Error"}
              </h3>
              <p className="text-gray-600 mb-6">{modal.message}</p>
              <button
                onClick={() => {
                  setModal({ type: null, message: "" });
                  navigate("/panels-superadmins/list-admins");
                }}
                className={`px-5 py-2 rounded-lg text-white transition ${
                  modal.type === "success"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </NavBarCMS>
  );
}
