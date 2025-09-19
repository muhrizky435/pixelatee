import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { SidebarSuperAdmin } from "./Super-Admin-Sidebar";

export default function NavBarSuperAdmin({ children }: { children?: React.ReactNode }) {
  const [time, setTime] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const updateDateTime = () => {
      const now = new Date();

      const timeFormatter = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const dateFormatter = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      setTime(timeFormatter.format(now));
      setDateTime(dateFormatter.format(now));

      timer = setTimeout(updateDateTime, 1000);
    };

    updateDateTime();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarSuperAdmin />

      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-[#f9fbfd]">
        {/* Topbar */}
        <header className="w-full h-16 bg-white flex items-center justify-end px-4 md:px-6 shadow-sm relative">
            <div className="flex items-center gap-6">
                {/* Notif */}
                <FaBell className="text-gray-600 cursor-pointer" size={18} />

                {/* Date & User */}
                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">{time}</p>
                    <p className="text-xs text-gray-500">{dateTime}</p>
                </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
