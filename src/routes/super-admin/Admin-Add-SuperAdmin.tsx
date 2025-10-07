import React, { useState } from "react";
import NavBarCMS from "../../components/CMS-Navbar";
import { useNavigate } from "react-router";
import { registerAdmin } from "../../api/super-admin.api";

export default function AdminSuperAdmin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showCreateSuccessModal, setShowCreateSuccessModal] = useState(false);
  const [showCreateErrorModal, setShowCreateErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // state formdata
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "1234567",
    phoneNumber: "",
    userRole: "ADMIN",
    dateOfBirth: "",
    city: "",
    country: "",
    zipCode: "",
  });

  // Handle Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit Register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi email khusus domain pixelatee
    if (!formData.email.endsWith("@pixelatee.com")) {
      setErrorMessage("Email must end with @pixelatee.com");
      setShowCreateErrorModal(true);
      return;
    }

    try {
      setLoading(true);
      await registerAdmin({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        userRole: formData.userRole as "ADMIN" | "SUPER_ADMIN",
        dateOfBirth: formData.dateOfBirth,
        address: {
          city: formData.city || null,
          country: formData.country || null,
          zipCode: formData.zipCode || null,
        },
      });

      setShowCreateSuccessModal(true);
    } catch (err) {
      console.error("Failed to register admin:", err);
      setErrorMessage("Failed to create admin. Please try again.");
      setShowCreateErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-4 space-y-8">
        <div className="flex items-center gap-2 mb-8">
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

        <h1 className="text-2xl font-bold text-blue-600">Add Admin</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 max-w-full space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-xs text-gray-500">(must end with @pixelatee.com)</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Phone & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="userRole"
                value={formData.userRole}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Admin"}
            </button>
          </div>
        </form>

        {/* Modal Success Create Admin */}
        {showCreateSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center shadow-2xl">
              <h2 className="text-xl font-bold text-blue-500 mb-3">Success!</h2>
              <p className="mb-6 text-gray-700">
                Admin successfully created and added.
              </p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={() => {
                  setShowCreateSuccessModal(false);
                  navigate("/panels-superadmins/list-admins");
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal Error Create Admin */}
        {showCreateErrorModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center shadow-2xl">
              <h2 className="text-xl font-bold text-red-600 mb-3">Error Create Admin</h2>
              <p className="mb-6 text-gray-700">{errorMessage}</p>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={() => setShowCreateErrorModal(false)}
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
