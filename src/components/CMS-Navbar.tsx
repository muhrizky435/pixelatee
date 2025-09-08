import { useState, useEffect, useRef } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { SidebarCMS } from "./CMS-Sidebar";
import { Link } from "react-router";

export default function NavBarCMS({ children }: { children?: React.ReactNode }) {
  const [day, setDay] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const updateDateTime = () => {
      const now = new Date();

      const dayFormatter = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
      });

      const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setDay(dayFormatter.format(now));
      setDateTime(dateTimeFormatter.format(now).replace(" pukul", " •"));

      timer = setTimeout(updateDateTime, 1000);
    };

    updateDateTime();
    return () => clearTimeout(timer);
  }, []);

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarCMS />

      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-[#f9fbfd]">
        {/* Topbar */}
        <header className="w-full h-16 bg-white flex items-center justify-between px-4 md:px-6 shadow-sm relative">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-gray-800">{day}</span>
            <span className="text-xs text-gray-500">{dateTime}</span>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-6">
            <FaBell className="text-gray-600 cursor-pointer" size={18} />
            <div
              className="flex items-center gap-2 cursor-pointer relative"
              ref={dropdownRef}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="hidden md:block font-medium text-gray-700">
                Natasha
              </span>
              <img
                src="https://i.pravatar.cc/40?img=5"
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <FaChevronDown
                className={`text-gray-600 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                size={14}
              />

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-12 right-0 w-44 bg-white border rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/panels-admins/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/panels-admins/setting"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
