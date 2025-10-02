import { useState, useEffect } from "react";
import { updateAdmin, type Admin } from "../../api/super-admin.api";

type Props = {
  selectedAdmin: Admin | null;
  onClose: () => void;
};

export default function EditAdminModal({ selectedAdmin, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Admin | null>(null);

  // sync data ketika selectedAdmin berubah
  useEffect(() => {
    if (selectedAdmin) {
      setFormData(selectedAdmin);
    }
  }, [selectedAdmin]);

  if (!selectedAdmin || !formData) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            address: { ...prev.address, [name]: value },
          }
        : prev
    );
  };

  // Handle submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      setLoading(true);
      await updateAdmin(Number(formData.id), {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
      });

      alert("Admin updated successfully!");
      onClose();
    } catch (err) {
      console.error("Failed to update admin:", err);
      alert("Failed to update admin!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-30">
      <div className="bg-white rounded-2xl shadow-lg w-[50rem] max-h-[80vh] overflow-y-auto p-6 relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Admin</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Role (read only) */}
          <div>
            <label className="text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              value={formData.role}
              readOnly
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm bg-gray-100 text-gray-500 outline-none cursor-not-allowed"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth || ""}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Address - split fields */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.address?.city || ""}
              onChange={handleAddressChange}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.address?.country || ""}
              onChange={handleAddressChange}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.address?.zipCode || ""}
              onChange={handleAddressChange}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
