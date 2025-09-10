import { useState, useRef, useEffect } from "react";
import NavBarCMS from "../../../components/CMS-Navbar";
import ContactDetailModal from "./Contact-Detail-Admin";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router";
import { FiFilter } from "react-icons/fi";

const contact = [
  {
    id: 1,
    name: "NovaLink Shortener",
    email: "example@pixelatee.com",
    subject: "Draft",
    message: "Hello, I am interested in your services.",
  },
  {
    id: 2,
    name: "NovaLink Shortener",
    email: "example@pixelatee.com",
    subject: "Draft",
    message: "Hello, I am interested in your services.",
  },
  {
    id: 3,
    name: "NovaLink Shortener",
    email: "example@pixelatee.com",
    subject: "Draft",
    message: "Hello, I am interested in your services.",
  },
  {
    id: 4,
    name: "NovaLink Shortener",
    email: "example@pixelatee.com",
    subject: "Draft",
    message: "Hello, I am interested in your services.",
  },
  {
    id: 5,
    name: "NovaLink Shortener",
    email: "example@pixelatee.com",
    subject: "Draft",
    message: "Hello, I am interested in your services.",
  },
];

export default function ContactAdmin() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);

  const [selectedContact, setSelectedContact] = useState<typeof contact[0] | null>(null);

  // filter contacts
  const filteredContact = contact.filter((c) => {
    const matchesType = filterType ? c.subject === filterType : true;

    const matchesSearch = search
      ? c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.message.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesType && matchesSearch;
  });

  // Dropdown close on outside click (filter)
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

  // Dropdown close on outside click (action menu)
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
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-8 space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-500">Contact</h1>

        {/* Search & Filter */}
        <div className="relative" ref={filterRef}>
          <div className="flex items-center border rounded-lg px-4 py-2 bg-white shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FiFilter
              size={18}
              className="mr-2 text-gray-400 cursor-pointer hover:text-blue-600"
              onClick={() => setShowFilter(!showFilter)}
            />
            <input
              type="text"
              placeholder="Search contact..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm w-40 md:w-64 bg-transparent"
            />
          </div>

          {/* Filter Dropdown */}
          {showFilter && (
            <div className="absolute left-0 mt-3 w-64 bg-white border rounded-xl shadow-lg p-4 z-20 animate-scaleIn">
              <p className="font-semibold text-sm text-gray-700 mb-3">
                Filter by Type
              </p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {[
                  "Draft",
                  "Customer Service",
                  "UI/UX Designer",
                  "Mobile Development",
                  "Web Development",
                  "IT Consultant",
                  "Other",
                ].map((type) => (
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

        {/* Contact Table */}
        <section className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              List Message
            </h2>
            <span className="text-sm text-gray-500">{filteredContact.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="border-b text-sm text-blue-400">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredContact.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-blue-50 transition"
                  >
                    <td className="flex items-center gap-3 py-3 px-4">
                      <span className="font-medium text-gray-600">
                        {item.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.email}</td>
                    <td className="py-3 px-4 text-gray-600">{item.subject}</td>
                    <td className="py-3 px-4 text-gray-600">{item.message}</td>
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
                            onClick={() => setSelectedContact(item)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition">
                            Lihat Detail
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

          <div className="mt-6 flex justify-end">
            <Link
              to={`/admin`}
              className="font-semibold flex text-right gap-1 mt-2 group w-fit text-blue-600 hover:text-blue-800 text-lg"
            >
              See more
              <span className="ml-1 group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
          </div>
        </section>

        {/* Modal */}
        <ContactDetailModal
          onClose={() => setSelectedContact(null)}
          contact={selectedContact}
        />
      </main>
    </NavBarCMS>
  );
}
