import { useState } from "react";
import type { ChangeEvent } from "react";
import { FiEdit2, FiBell, FiCamera } from "react-icons/fi";
import NavBarCMS from "../../../components/CMS-Navbar";

export default function AdminProfile() {
  // State untuk edit
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("Natasha");
  const [lastName, setLastName] = useState("Augenia");
  const [dob, setDob] = useState("12-10-1990");
  const [email, setEmail] = useState("natasha.augenia@pixelatee.com");
  const [phone, setPhone] = useState("(+62)8xx-xxxx-xxxx");
  const [role] = useState("Admin");
  const [country, setCountry] = useState("Indonesia");
  const [city, setCity] = useState("Yogyakarta");
  const [postalCode, setPostalCode] = useState("12345");

  // State untuk foto profil
  const [avatar, setAvatar] = useState<string>("/img/Logo.png");
  const [, setAvatarFile] = useState<File | null>(null);

  // Handle ganti foto
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Simpan perubahan
  const handleSave = () => {
    setIsEditing(false);
    // TODO: Kirim data ke backend jika diperlukan
  };

  // Batalkan edit
  const handleCancel = () => {
    setIsEditing(false);
    // TODO: Reset ke data awal jika diperlukan
  };

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-8 space-y-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-blue-500 mb-6">My Profile</h1>

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
                {firstName} {lastName}
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
            {!isEditing ? (
              <button
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => setIsEditing(true)}
              >
                <FiEdit2 className="w-4 h-4" /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-semibold"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm font-semibold"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-gray-500">First Name</p>
              {isEditing ? (
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="font-medium">{firstName}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500">Last Name</p>
              {isEditing ? (
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="font-medium">{lastName}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500">Date of Birth</p>
              {isEditing ? (
                <input
                  type="text"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="font-medium">{dob}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="font-medium">{email}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500">Phone Number</p>
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="font-medium">{phone}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500">User Role</p>
              <p className="font-medium">{role}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white shadow-sm rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Address</h3>
            {!isEditing ? (
              <button
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => setIsEditing(true)}
              >
                <FiEdit2 className="w-4 h-4" /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-semibold"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm font-semibold"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Country</p>
              {isEditing ? (
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="font-medium">{country}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500">City</p>
              {isEditing ? (
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="font-medium">{city}</p>
              )}
            </div>
            <div>
              <p className="text-gray-500">Postal Code</p>
              {isEditing ? (
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <p className="font-medium">{postalCode}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </NavBarCMS>
  );
}
