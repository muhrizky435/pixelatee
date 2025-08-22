import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  FaHome,
  FaInfoCircle,
  FaBlog,
  FaHandshake,
  FaCogs,
  FaBox,
  FaHandHolding,
  FaEnvelope,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";

export default function NavBarCMS({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dateTime, setDateTime] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setDateTime(formatter.format(now));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // daftar menu biar lebih rapi
  const menus = [
    { path: "/dashboard", icon: <FaHome size={20} />, label: "Dashboard" },
    { path: "/about", icon: <FaInfoCircle size={20} />, label: "Tentang Pixelatee" },
    { path: "/blog", icon: <FaBlog size={20} />, label: "Blog" },
    { path: "/clientCMS", icon: <FaHandshake size={20} />, label: "Klien" },
    { path: "/serviceCMS", icon: <FaHandHolding size={20} />, label: "Layanan" },
    { path: "/productCMS", icon: <FaBox size={20} />, label: "Produk" },
    { path: "/contactCMS", icon: <FaEnvelope size={20} />, label: "Kontak/Pesan Masuk" },
    { path: "/settings", icon: <FaCogs size={20} />, label: "Pengaturan" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-60 bg-white shadow-md">
          <Sidebar backgroundColor="white" style={{ height: "100vh" }}>
            <div className="bg-cyan-300 p-6 flex items-center gap-2">
              <img src="/Logotype.svg" alt="Pixelatee Logo" className="w-40" />
            </div>
            <Menu>
              {menus.map((menu) => (
                <MenuItem
                  key={menu.path}
                  icon={menu.icon}
                  onClick={() => navigate(menu.path)}
                  className={`text-blue-500 ${
                    location.pathname === menu.path ? "font-bold" : ""
                  }`}
                >
                  {menu.label}
                </MenuItem>
              ))}
            </Menu>
          </Sidebar>
        </aside>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col bg-[#eaf0fb]">
        {/* Topbar */}
        <header className="w-full h-22 bg-[#dfe9fc] flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4 text-blue-500">
            <span
              className="cursor-pointer text-2xl"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              ☰
            </span>
            <span>{dateTime}</span>
          </div>

          <div className="flex items-center gap-8">
            <FaBell className="text-black cursor-pointer" size={18} />
            <div className="flex items-center gap-3">
              <span>Admin X</span>
              <FaUserCircle className="text-black" size={30} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
