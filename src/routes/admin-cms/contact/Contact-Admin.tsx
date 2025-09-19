import { useState, useRef, useEffect } from "react";
import NavBarCMS from "../../../components/CMS-Navbar";
import ContactDetailModal from "./Contact-Detail-Admin";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import {
  getAllContactsAdmin,
  deleteContactAdmin,
} from "../../../api/contact.api";
import type { Contact } from "../../../api/contact.api";
import { FaSearch } from "react-icons/fa";

/* =========================
   Mapping TYPE → Label
========================= */
const TYPE_LABELS: Record<string, string> = {
  CUSTOMER_SERVICE: "Customer Service",
  IT_CONSULTATION: "IT Consultation",
  UIUX_DEVELOPMENT: "UI/UX Development",
  MOBILE_DEVELOPMENT: "Mobile Development",
  WEB_DEVELOPMENT: "Web Development",
  OTHER: "Other",
};

export default function ContactAdmin() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await getAllContactsAdmin();
        setContacts(res.data.contacts ?? []);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
        setContacts([]);
      }
    };

    fetchContacts();
  }, []);

  // filter contacts
  const filteredContact = contacts.filter((c) => {
    const matchesType = filterType ? c.type === filterType : true;
    const matchesSearch = search
      ? c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.message.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesType && matchesSearch;
  });

  // paginate contacts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = filteredContact.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredContact.length / itemsPerPage)
  );

  // close filter dropdown on outside click
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

  // close menu on outside click
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

  // handle delete contact
  const handleDelete = async (id: string) => {
    try {
      await deleteContactAdmin(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setOpenMenu(null);
    } catch (err) {
      console.error("Failed to delete contact:", err);
    }
  };

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-8 space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-500">Contact</h1>

        {/* Search */}
        <div className="relative" ref={filterRef}>
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FaSearch
              size={18}
              className="mr-2 text-gray-400 cursor-pointer hover:text-blue-600"
            />
            <input
              type="text"
              placeholder="Search by Name, Email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm w-40 md:w-64 bg-transparent"
            />
          </div>
        </div>

        {/* Contact Table */}
        <section className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6">
          {/* Header + Filter */}
          <div className="flex items-center justify-between mb-6 relative">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                List Message
              </h2>
              <span className="text-sm text-gray-500">
                {filteredContact.length}
              </span>
            </div>

            {/* Filter */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:text-blue-600 hover:border-blue-400 transition"
              >
                <FiFilter size={16} />
                Filter
              </button>

              {showFilter && (
                <div className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg p-4 z-20 animate-scaleIn">
                  <p className="font-semibold text-sm text-gray-700 mb-3">
                    Filter by Type
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {Object.entries(TYPE_LABELS).map(([value, label]) => (
                      <label
                        key={value}
                        className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-blue-50 transition"
                      >
                        <input
                          type="radio"
                          name="type"
                          checked={filterType === value}
                          onChange={() => setFilterType(value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="border-b text-sm text-blue-400">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentContacts.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-4 text-gray-600 font-bold">{item.name}</td>
                    <td className="py-3 px-4 text-gray-600">{item.email}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {TYPE_LABELS[item.type] ?? item.type}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.subject}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.message.length > 100
                        ? item.message.slice(0, 70) + "..."
                        : item.message}
                    </td>
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
                            onClick={() => setSelectedContactId(item.id)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition"
                          >
                            Lihat Detail
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition"
                          >
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

          {/* Pagination */}
          <div className="flex justify-end mt-6">
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition ${
                      currentPage === num
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    {num}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                Next →
              </button>
            </div>
          </div>
        </section>

        <ContactDetailModal
          onClose={() => setSelectedContactId(null)}
          contactId={selectedContactId}
        />
      </main>
    </NavBarCMS>
  );
}
