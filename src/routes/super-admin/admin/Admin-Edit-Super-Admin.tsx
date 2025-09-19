type Admin = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  role: string;
  dob: string;
  address: string;
};

type Props = {
  selectedAdmin: Admin | null;
  onClose: () => void;
};

export default function EditAdminModal({ selectedAdmin, onClose }: Props) {
  if (!selectedAdmin) return null;

  return (
    <div className="fixed inset-0 bg-blue-300/20 flex items-center justify-center z-30">
      <div className="bg-white rounded-2xl shadow-lg w-[28rem] max-h-[80vh] overflow-y-auto p-6 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Admin</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <form className="space-y-4">
          {/* First Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              defaultValue={selectedAdmin.firstName}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              defaultValue={selectedAdmin.lastName}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              defaultValue={selectedAdmin.email}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              defaultValue={selectedAdmin.phone}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              defaultValue={selectedAdmin.role}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              defaultValue={selectedAdmin.dob}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <textarea
              defaultValue={selectedAdmin.address}
              rows={3}
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
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
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
