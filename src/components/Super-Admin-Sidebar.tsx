import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaBars, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";

export function SidebarSuperAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [width, setWidth] = useState(240);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isResizing = useRef(false);

  // Menu Profile (khusus)
  const profileMenu = {
    path: "/panels-super-admins/profile",
    icon: <FaUser />,
    label: "My Details",
  };

  // Menu utama
  const menus = [
    { path: "/panels-super-admins/dashboard", icon: <FaUserPlus />, label: "Admin" },
  ];

  // Menu footer
  const footerMenus = [
    { path: "/panels-super-admins/signout", icon: <FaSignOutAlt />, label: "Sign Out" },
  ];

  // --- Drag Resize ---
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

        {/* User */}
        {!isCollapsed && (
          <div className="px-6 py-4">
            <p className="text-sm">
              Halo, <span className="font-bold">Siti Rahmawati</span>
            </p>
            <p className="text-xs text-blue-600">Super Admin</p>
          </div>
        )}

        {/* Profile Menu */}
        <div className="px-6">
          <button
            onClick={() => navigate(profileMenu.path)}
            className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${
                location.pathname === profileMenu.path
                  ? "bg-blue-400 text-white shadow-md"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }
              ${isCollapsed ? "justify-center" : "gap-3"}`}
          >
            <span className="text-lg">{profileMenu.icon}</span>
            {!isCollapsed && <span className="truncate">{profileMenu.label}</span>}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-4">
          <span
            className={`block font-bold ${
              isCollapsed ? "hidden" : "truncate max-w-[160px]"
            }`}
          >
            Manajemen Admin
          </span>
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
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }
                  ${isCollapsed ? "justify-center" : "gap-3"}`}
              >
                <span className="text-lg">{menu.icon}</span>
                {!isCollapsed && <span className="truncate">{menu.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer Menu (Sign Out) */}
        <div className="p-6">
          {footerMenus.map((menu) => {
            const active = location.pathname === menu.path;
            return (
              <button
                key={menu.path}
                onClick={() => navigate(menu.path)}
                className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    active
                      ? "bg-red-500 text-white shadow-md"
                      : "text-red-500 hover:bg-red-50 hover:text-red-600"
                  }
                  ${isCollapsed ? "justify-center" : "gap-3"}`}
              >
                <span className="text-lg">{menu.icon}</span>
                {!isCollapsed && <span className="truncate">{menu.label}</span>}
              </button>
            );
          })}
        </div>
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
