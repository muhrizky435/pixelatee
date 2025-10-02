import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaBars, FaUserPlus } from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";
import { BsBox2, BsPerson } from "react-icons/bs";
import { IoHomeOutline, IoNewspaperOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { logoutUser, getUserProfile, type UserProfile } from "../api/user.api";

export function SidebarCMS() {
  const location = useLocation();
  const navigate = useNavigate();
  const [width, setWidth] = useState(240);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isResizing = useRef(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // simpan data user
  const [user, setUser] = useState<UserProfile | null>(null);

  // ambil profile user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();

        setUser(res);
      } catch (err) {
        console.error("Gagal ambil profile user:", err);
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

  const menus = [
    {
      path: "/panels-admins/dashboard",
      icon: <IoHomeOutline />,
      label: "Dashboard",
    },
    {
      path: "/panels-admins/newsletter",
      icon: <IoNewspaperOutline />,
      label: "Newsletter",
    },
    { path: "/panels-admins/portfolios", icon: <BsBox2 />, label: "Portfolio" },
    { path: "/panels-admins/clients", icon: <BsPerson />, label: "Clients" },
    {
      path: "/panels-admins/contacts",
      icon: <MdOutlineContactMail />,
      label: "Contact",
    },
  ];

  // --- Auto collapse on resize ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Drag Resize
  const handleMouseDown = () => {
    if (isCollapsed) return;
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing.current) {
      const newWidth = Math.min(Math.max(e.clientX, 200), 400);
      setWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="relative flex h-screen">
      {/* Sidebar */}
      <aside
        className="bg-white shadow-xl border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out"
        style={{ width: isCollapsed ? 90 : width }}
      >
        {/* Header + Toggle */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          {!isCollapsed ? (
            <img
              src="/Logotype.svg"
              alt="Pixelatee Logo"
              className="max-w-[140px] w-full object-contain"
            />
          ) : (
            <img
              src="/img/Logo.png"
              alt="Mini Logo"
              className="w-8 h-8 object-contain mx-auto"
            />
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 ml-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-4">
          {menus.map((menu) => {
            const active = location.pathname === menu.path;
            return (
              <button
                key={menu.path}
                onClick={() => navigate(menu.path)}
                className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    active
                      ? "bg-blue-400 text-white shadow-md"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                  }
                  ${isCollapsed ? "justify-center" : "gap-3"}`}
              >
                <span className="text-lg">{menu.icon}</span>
                {!isCollapsed && <span className="truncate">{menu.label}</span>}
              </button>
            );
          })}

          {/* Section menu khusus Super Admin */}
          {user?.userRole?.toUpperCase() === "SUPER_ADMIN" && (
            <>
              {!isCollapsed && (
                <span className="block font-bold mt-6 mb-6 text-gray-600">
                  Management Admin
                </span>
              )}
              <button
                onClick={() => navigate("/panels-superadmins/list-admins")}
                className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${ location.pathname === "/panels-superadmins/list-admins"
                  ? "bg-blue-400 text-white shadow-md"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }
                  ${isCollapsed ? "justify-center" : "gap-3"}`}
              >
                <span className="text-lg">
                  <FaUserPlus />
                </span>
                {!isCollapsed && <span className="truncate">List Admin</span>}
              </button>
            </>
          )}
        </nav>

        {/* Logout button */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowLogoutModal(true)}
            className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${isCollapsed ? "justify-center" : "gap-3"}
               text-red-600 hover:bg-red-200`}
          >
            <span className="text-lg">
              <FiLogOut />
            </span>
            {!isCollapsed && <span className="truncate">SignOut</span>}
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

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t text-center border-gray-100 text-xs text-gray-400">
            © 2025 Pixelatee
          </div>
        )}
      </aside>

      {/* Drag resizer */}
      {!isCollapsed && (
        <div
          onMouseDown={handleMouseDown}
          className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-blue-300"
          style={{ left: width - 2 }}
        />
      )}
    </div>
  );
}
