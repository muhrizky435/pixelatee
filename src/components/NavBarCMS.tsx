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

export default function NavBarCMS({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dateTime, setDateTime] = useState("");

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
              <MenuItem icon={<FaHome size={20} />} href="/dashboard" className="text-blue-500">
                Dashboard
              </MenuItem>
              <MenuItem icon={<FaInfoCircle size={20} />} href="/about" className="text-blue-500">
                Tentang Pixelatee
              </MenuItem>
              <MenuItem icon={<FaBlog size={20} />} href="/blog" className="text-blue-500">
                Blog
              </MenuItem>
              <MenuItem icon={<FaHandshake size={20} />} href="/clients" className="text-blue-500">
                Klien
              </MenuItem>
              <MenuItem icon={<FaHandHolding size={20} />} href="/serviceCMS" className="text-blue-500">
                Layanan
              </MenuItem>
              <MenuItem icon={<FaBox size={20} />} href="/productCMS" className="text-blue-500">
                Produk
              </MenuItem>
              <MenuItem icon={<FaEnvelope size={20} />} href="/contactCMS" className="text-blue-500">
                Kontak/Pesan Masuk
              </MenuItem>
              <MenuItem icon={<FaCogs size={20} />} href="/settings" className="text-blue-500">
                Pengaturan
              </MenuItem>
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