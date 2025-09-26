import { useState, type ChangeEvent } from "react";
import { FiBell, FiCamera, FiEdit2, FiX } from "react-icons/fi";
import NavBarSuperAdmin from "../../../components/Super-Admin-Navbar";

export default function ProfileSuperAdmin() {
  const [name, setName] = useState("Natasha Augenia");
  const [email, setEmail] = useState("natasha.augenia@gmail.com");
  const [role] = useState("Super Admin");
  const [phone, setPhone] = useState("(+62)8xx-xxxx-xxxx");
  const [dob, setDob] = useState("1990-10-12");
  const [password] = useState("********");
  const [country, setCountry] = useState("Indonesia");
  const [city, setCity] = useState("Yogyakarta");
  const [postalCode, setPostalCode] = useState("12345");
  const [avatar, setAvatar] = useState<string>("/img/Logo.png");
  const [activeModal, setActiveModal] = useState<null | "personal" | "address" | "password">(null);


  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };
  

  return (
    <NavBarSuperAdmin>
      <main className="bg-gray-50 min-h-screen pt-6 pb-8 px-8 space-y-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-blue-600">My Detail</h1>

        {/* Profile Card */}
        <div className="bg-white shadow-sm rounded-xl p-6 flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <img
              src={avatar}
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
            {/* Name & Role */}
            <div>
              <h2 className="text-lg font-semibold">
                {name}
              </h2>
              <p className="text-gray-500 text-sm">{role}</p>
            </div>
          </div>
          <FiBell className="text-xl text-gray-600" />
        </div>

        {/* Personal Information */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <button
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
            onClick={() => setActiveModal("personal")}
          >
            <FiEdit2 className="w-4 h-4" /> Edit
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{name}</p>
          </div>
          <div>
            <p className="text-gray-500">Date of Birth</p>
            <p className="font-medium">{dob}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{email}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone Number</p>
            <p className="font-medium">{phone}</p>
          </div>
          <div>
            <p className="text-gray-500">User Role</p>
            <p className="font-medium">{role}</p>
          </div>
        </div>
      </div>

        {/* Password */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold mb-4">Password</h3>
            <button
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => setActiveModal("password")}>
              Change Password
            </button>
          </div>
          <p className="text-sm text-gray-700">{password}</p>
        </div>

        {/* Address */}
        <div className="bg-white shadow-sm rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Address</h3>
          <button
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
            onClick={() => setActiveModal("address")}
          >
            <FiEdit2 className="w-4 h-4" /> Edit
          </button>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Country</p>
              <p className="font-medium">{country}</p>
            </div>
            <div>
              <p className="text-gray-500">City</p>
              <p className="font-medium">{city}</p>
            </div>
            <div>
              <p className="text-gray-500">Postal Code</p>
              <p className="font-medium">{postalCode}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Personal Information */}
      {activeModal ==="personal" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Personal Information</h2>
              <button onClick={() => setActiveModal(null)}>
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Form */}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="border rounded-lg px-3 py-2 text-sm w-full gap-4 mb-4"
              />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
              <input
                type="text"
                value={role}
                disabled
                className="border rounded-lg px-3 py-2 text-sm w-full bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Password */}
      {activeModal === "password" && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <button onClick={() => setActiveModal(null)}>
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <input
              type="password"
              placeholder="New Password"
              className="border rounded-lg px-3 py-2 text-sm w-full"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}

      {/* Modal Address */}
      {activeModal === "address" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Address</h2>
              <button onClick={() => setActiveModal(null)}>
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
            </div>

              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="border rounded-lg px-3 py-2 text-sm w-full gap-4 mb-4"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="border rounded-lg px-3 py-2 text-sm w-full gap-4 mb-4"
              />
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Postal Code"
                className="border rounded-lg px-3 py-2 text-sm w-full gap-4 mb-4"
              />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </NavBarSuperAdmin>
  );
}
