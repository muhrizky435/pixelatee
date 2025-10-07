import { useState, useEffect, type ChangeEvent } from "react";
import { FiEdit2, FiCamera } from "react-icons/fi";
import NavBarCMS from "../../../components/CMS-Navbar";
import {
  getUserProfile,
  getPersonalInfoPreview,
  updatePersonalInfo,
  updatePhoto,
  updateAddress,
  updatePassword,
  logoutUser,
  type UserProfile,
  getAddressPreview,
} from "../../../api/user.api";

export default function AdminProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Modal edit personal info
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserProfile> | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Modal edit addresses
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editAddress, setEditAddress] = useState<{
    country: string;
    city: string;
    zipCode: string;
  } | null>(null);

  // password form
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessChangeModal, setShowSuccessChangeModal] = useState(false);
  const [showErrorChangeModal, setShowErrorChangeModal] = useState(false);

  // Fetch user profile saat pertama render
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();

      // console.log ("data:", data);

      setProfile(data);
    } catch (err) {
      console.error("Gagal ambil profile:", err);
    }
  };

  // get preview personal info
  const fetchPreview = async () => {
    try {
      const data = await getPersonalInfoPreview();
      setEditData(data);
      setIsEditing(true);
    } catch (err) {
      console.error("Gagal ambil personal-info preview:", err);
    }
  };

  // handle edit address
  const handleOpenAddressModal = async () => {
    try {
      const data = await getAddressPreview();
      setEditAddress(data);
      setShowAddressModal(true);
    } catch (err) {
      console.error("Gagal fetch address preview:", err);
    }
  };

  // Handle ganti foto
  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        await updatePhoto(file);
        const fresh = await getUserProfile();
        setProfile(fresh);
      } catch (err) {
        console.error("Gagal update foto:", err);
      }
    }
  };

  // Save perubahan personal info
  const handleSavePersonalInfo = async () => {
    if (!editData) return;

    try {
      await updatePersonalInfo({
        name: editData.name ?? "",
        email: editData.email ?? "",
        phoneNumber: editData.phoneNumber ?? "",
        dateOfBirth: editData.dateOfBirth ?? "",
      });
      setIsEditing(false);
      fetchProfile();

      // tampilkan modal sukses
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Gagal update personal info:", err);
    }
  };

  // Save perubahan address
  const handleSaveAddress = async () => {
    if (!editAddress) return;
    try {
      await updateAddress(editAddress);
      fetchProfile();
      setShowAddressModal(false);

      // tampilkan modal sukses
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Gagal update alamat:", err);
    }
  };

  // Update password
  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setShowErrorChangeModal(true);
      return;
    }
    try {
      await updatePassword(newPassword);
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
      setShowSuccessChangeModal(true);
    } catch (err) {
      console.error("Gagal update password:", err);
      setShowErrorChangeModal(true);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/panels-admins/auth-login";
    } catch (err) {
      console.error("Gagal logout:", err);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-8 space-y-8">
        <h1 className="text-3xl font-bold text-blue-500 mb-6">My Profile</h1>

        {/* Profile Card */}
        <div className="bg-white shadow-sm rounded-xl p-6 flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={
                  profile?.photo
                    ? `http://localhost:3000/user/${profile.photo}`
                    : "/img/Logo.png"
                }
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-white border rounded-full p-1 shadow cursor-pointer">
                <FiCamera className="w-4 h-4 text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{profile.name}</h2>
              <p className="text-gray-500 text-sm">{profile.userRole}</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm font-semibold"
            >
              Logout
            </button>

            {/* Modal Konfirmasi Logout */}
            {showLogoutModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
                  <h2 className="text-lg font-semibold mb-4">
                    Logout Confirmation
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to log out from this account?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold"
                    >
                      Yes, Logout
                    </button>
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Personal Information (read-only) */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <button
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
              onClick={fetchPreview}
            >
              <FiEdit2 className="w-4 h-4" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{profile.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone Number</p>
              <p className="font-medium">{profile.phoneNumber}</p>
            </div>
            <div>
              <p className="text-gray-500">User Role</p>
              <p className="font-medium">{profile.userRole}</p>
            </div>
            <div>
              <p className="text-gray-500">Password</p>
              <p className="font-medium">{profile.password}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <button
              onClick={handleOpenAddressModal}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              <FiEdit2 className="w-4 h-4" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Country</p>
              <p className="font-medium">{profile.addresses.country || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">City</p>
              <p className="font-medium">{profile.addresses.city || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Postal Code</p>
              <p className="font-medium">{profile.addresses.zipCode || "-"}</p>
            </div>
          </div>
        </div>

        {/* Password Update */}
        <div className="bg-white shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Change Password</h3>

          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded font-semibold"
            >
              Change Password
            </button>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-500">New Password</p>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <p className="text-gray-500">Confirm Password</p>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handlePasswordUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded font-semibold"
                >
                  Update Password
                </button>
                <button
                  onClick={() => setShowPasswordForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded font-semibold"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal Edit Personal Info */}
        {isEditing && editData && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[500px]">
              <h3 className="text-lg font-semibold mb-4">Edit Personal Info</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <input
                    type="text"
                    value={editData.name || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <input
                    type="email"
                    value={editData.email || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Phone Number</label>
                  <input
                    type="text"
                    value={editData.phoneNumber || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Date of Birth</label>
                  <input
                    type="date"
                    value={
                      editData.dateOfBirth
                        ? editData.dateOfBirth.split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        dateOfBirth: new Date(e.target.value).toISOString(),
                      })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePersonalInfo}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddressModal && editAddress && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[500px]">
              <h3 className="text-lg font-semibold mb-4">Edit Address</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Country</label>
                  <input
                    type="text"
                    value={editAddress.country}
                    onChange={(e) =>
                      setEditAddress({
                        ...editAddress,
                        country: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">City</label>
                  <input
                    type="text"
                    value={editAddress.city}
                    onChange={(e) =>
                      setEditAddress({ ...editAddress, city: e.target.value })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Postal Code</label>
                  <input
                    type="text"
                    value={editAddress.zipCode}
                    onChange={(e) =>
                      setEditAddress({
                        ...editAddress,
                        zipCode: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAddress}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Success Update */}
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-96 text-center">
              <h2 className="text-lg font-semibold mb-4 text-blue-600">
                Success!
              </h2>
              <p className="text-gray-700 mb-6">Successfully Update.</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Success Modal Ubah Password */}
        {showSuccessChangeModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">
                Success
              </h3>
              <p className="text-gray-600">Change Password Success!</p>
              <button
                onClick={() => setShowSuccessChangeModal(false)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Error Modal Ubah Password */}
        {showErrorChangeModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
              <h3 className="text-lg font-semibold mb-2 text-red-600">Error</h3>
              <p className="text-gray-600">
                Failed change password. Try again!
              </p>
              <button
                onClick={() => setShowErrorChangeModal(false)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
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
