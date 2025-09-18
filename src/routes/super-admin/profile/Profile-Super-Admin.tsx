import { useState, type ChangeEvent } from "react";
import NavBarSuperAdmin from "../../../components/Super-Admin-Navbar";

export default function ProfileSuperAdmin() {
  const [firstName, setFirstName] = useState("Olivia");
  const [lastName, setLastName] = useState("Rhye");
  const [email, setEmail] = useState("olivia@untitledui.com");
  const [role, setRole] = useState("Admin"); // hanya Admin & Super Admin
  const [phone, setPhone] = useState("+62 81234567890");
  const [dob, setDob] = useState("1995-05-12");
  const [password, setPassword] = useState("********");
  const [country, setCountry] = useState("Indonesia");
  const [city, setCity] = useState("Yogyakarta");
  const [postalCode, setPostalCode] = useState("55281");
  const [avatar, setAvatar] = useState<string>("/img/Logo.png");

  const [isEditing, setIsEditing] = useState(false);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    console.log("Saved profile:", {
      firstName,
      lastName,
      email,
      role,
      phone,
      dob,
      password,
      country,
      city,
      postalCode,
    });
    setIsEditing(false);
  };

  return (
    <NavBarSuperAdmin>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-8 space-y-8">
        {/* Header */}
                <h1 className="text-2xl font-bold text-blue-600">
                    My Details
                </h1>
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-8xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
              <p className="text-sm text-gray-500">
                {isEditing
                  ? "Update your personal details here."
                  : "View your profile information."}
              </p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* CONTENT */}
          {isEditing ? (
            <form className="space-y-6">
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <label className="flex-1 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 text-sm hover:bg-gray-50">
                    Click to upload or drag and drop
                    <br />
                    <span className="text-xs text-gray-400">
                      PNG, JPG, GIF (max. 800x400px)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </div>

              {/* First & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Admin</option>
                  <option>Super Admin</option>
                </select>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* DOB & Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </form>
            ) : (
            <div className="space-y-10">
                {/* Profile Info */}
                <div className="flex items-center gap-4 ">
                <img
                    src={avatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover shadow-md"
                />
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                    {firstName} {lastName}
                    </h2>
                    <p className="text-sm text-gray-500">{role}</p>
                </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <p><span className="font-medium text-gray-800">Email:</span> {email}</p>
                <p><span className="font-medium text-gray-800">Phone:</span> {phone}</p>
                <p><span className="font-medium text-gray-800">Date of Birth:</span> {dob}</p>
                <p><span className="font-medium text-gray-800">Country:</span> {country}</p>
                <p><span className="font-medium text-gray-800">City:</span> {city}</p>
                <p><span className="font-medium text-gray-800">Postal Code:</span> {postalCode}</p>
                </div>

            </div>
            )}
        </div>
      </main>
    </NavBarSuperAdmin>
  );
}
