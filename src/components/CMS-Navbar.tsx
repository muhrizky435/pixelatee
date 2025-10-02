import { useState, useEffect, useRef } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { SidebarCMS } from "./CMS-Sidebar";
import { Link } from "react-router";
import { logoutUser, getUserProfile } from "../api/user.api";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  photo?: string | null;
}

export default function NavBarCMS({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [day, setDay] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [user, setUser] = useState<UserProfile | null>(null);

  // Get user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setUser(res);
      } catch (err) {
        console.error("Gagal mengambil profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/panels-admins/auth-login";
    } catch (err) {
      console.error("Gagal logout:", err);
    }
  };

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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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
                {user?.name || "Loading..."}
              </span>
              <img
                src={
                  user?.photo
                    ? `http://localhost:3000/user/${user.photo}`
                    : "/img/Logo.png"
                }
                alt="avatar"
                className="w-11 h-11 rounded-full object-cover border border-gray-200"
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
                    to="/panels-admins/profiles"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    onClick={() => setShowLogoutModal(true)}
                    to="/panels-admins/auth-login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </Link>

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
