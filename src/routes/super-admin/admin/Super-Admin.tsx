import { useState, useEffect, useRef } from "react";
import NavBarSuperAdmin from "../../../components/Super-Admin-Navbar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router";
import EditAdminModal from "./Admin-Edit-Super-Admin";

const admin = [
  {
    id: 1,
    name: "Ahmad Syaerodji",
    email: "asyaredodji@pixelatee.com",
    phone: "08123456789",
    role: "Admin",
    dob: "1990-01-01",
    address: "Jl. Malioboro, Yogyakarta",
  },
  {
    id: 2,
    name: "Windini Sari",
    email: "windini@pixelatee.com",
    phone: "08129876543",
    dob: "1992-05-15",
    address: "Jl. Sudirman, Jakarta",
    role: "Admin",
  },
  {
    id: 3,
    name: "Janpiter Purba",
    email: "jan@pixelatee.com",
    phone: "08137654321",
    dob: "1988-11-30",
    address: "Jl. Diponegoro, Surabaya",
    role: "Admin",
  },
  {
    id: 4,
    name: "Alex Johnson",
    email: "alex@pixelatee.com",
    phone: "08134567890",
    dob: "1991-07-20",
    address: "Jl. Gatot Subroto, Bandung",
    role: "Super Admin",
  },
];

export default function SuperAdminDashboard() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const navigate = useNavigate();
  const [selectedAdmin, setSelectedAdmin] = useState<typeof admin[0] | null>(null);

  // filter admin
  const filteredAdmin = admin.filter((a) => {
  const fullName = `${a.name || ""}`.trim();

  const matchesType = filterType ? a.role === filterType : true;
  const matchesSearch = search
    ? (a.email?.toLowerCase() || "").includes(search.toLowerCase()) ||
      fullName.toLowerCase().includes(search.toLowerCase())
    : true;

  return matchesType && matchesSearch;
});


  // close filter dropdown outside click
  useEffect(() => {
    if (!showFilter) return;
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showFilter]);

  // close menu dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <NavBarSuperAdmin>
      <main className="bg-gray-50 min-h-screen pt-6 pb-8 px-8 space-y-8">
        <h1 className="text-2xl font-bold text-blue-600">Daftar Admin</h1>

        {/* Search + Filter + Tambah Admin */}
        <div className="flex items-center justify-between">
          <div className="relative flex items-center" ref={filterRef}>
            <div className="flex items-center border rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
              <input
                type="text"
                placeholder="Search by Name, Email"
                className="outline-none text-sm w-52 md:w-72 bg-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FiFilter
                size={18}
                className="ml-2 text-gray-400 cursor-pointer hover:text-blue-600"
                onClick={() => setShowFilter(!showFilter)}
              />
            </div>
            {showFilter && (
              <div className="absolute left-0 mt-3 w-64 bg-white border rounded-xl shadow-lg p-4 z-20">
                <p className="font-semibold text-sm text-gray-700 mb-3">
                  Filter by Role
                </p>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {["Admin", "Super Admin"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-blue-50 transition"
                    >
                      <input
                        type="radio"
                        name="type"
                        checked={filterType === type}
                        onChange={() => setFilterType(type)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
          onClick={() => navigate('/panels-super-admins/admin')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow">
            + Tambah Admin
          </button>
        </div>

        {/* Tabel Admin */}
        <section className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              List Admin
            </h2>
            <span className="text-sm text-gray-500">{filteredAdmin.length}</span>
          </div>

          <div className="overflow-x-visible">
            <table className="w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="border-b text-sm text-blue-400">
                  <th className="py-3 px-4">Admin</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmin.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-blue-50 transition"
                  >
                    <td className="flex items-center gap-3 py-3 px-4">
                     <span className="font-medium text-gray-600">
                        {`${item.name || ""}`.trim()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.email}</td>
                    <td className="py-3 px-4 text-gray-600">{item.role}</td>
                    <td className="py-3 px-4 text-right relative">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === item.id ? null : item.id)
                        }
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <BsThreeDotsVertical className="text-gray-500" />
                      </button>

                      {openMenu === item.id && (
                        <div
                          ref={menuRef}
                          className="absolute top-1/2 right-10 -translate-y-1/2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 animate-fadeIn"
                        >
                          <button 
                            onClick={() => setSelectedAdmin(item)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition">
                            Edit
                          </button>
                          <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition">
                            Hapus
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (dummy) */}
          <div className="p-4 flex justify-between items-center text-sm text-gray-500">
            <span>
              1–{filteredAdmin.length} of {admin.length}
            </span>
            <div className="flex gap-3">
              <button className="hover:text-blue-600">&lt; Previous</button>
              <button className="hover:text-blue-600">Next &gt;</button>
            </div>
          </div>

          <EditAdminModal
            selectedAdmin={selectedAdmin}
            onClose={() => setSelectedAdmin(null)}
          />
        </section>
      </main>
    </NavBarSuperAdmin>
  );
}
