import { useEffect, useState, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink } from "react-router";

export function NavBar() {
  const [show, setShow] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShow(false);
      } else {
        setShow(true);
      }
      setScrolled(currentScrollY > 100);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl px-6 py-3 flex items-center justify-between transition-all duration-300 font-default
        border border-gray-200 rounded-2xl backdrop-blur-lg
        ${show ? "translate-y-0" : "-translate-y-[120%]"} 
        ${scrolled ? "bg-white shadow-lg" : "bg-white/90 shadow-md"}
      `}
      >
        {/* Logo */}
        <NavLink to={"/"}>
          <img
            className="w-32"
            src="/Logotype.svg"
            alt="Pixelatee Logotype"
          />
        </NavLink>

        {/* Menu Desktop */}
        <ul className="md:flex gap-10 justify-center items-center hidden text-gray-800 font-medium">
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500 transition-colors"
              }
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/portfolios"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500 transition-colors"
              }
            >
              Portfolios
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500 transition-colors"
              }
            >
              Contacts
            </NavLink>
          </li>
        </ul>

        {/* Right Section */}
        <div className="hidden md:block">
          <NavLink
            to="/contact"
            className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          >
            Get in touch
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center justify-end flex-1">
          <HiMenu
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 cursor-pointer"
            size={28}
          />
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-lg">Menu</span>
          <HiX
            size={28}
            className="cursor-pointer text-gray-600"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
        <ul className="flex flex-col gap-4 p-4 text-gray-700">
          <li>
            <NavLink to="/services" onClick={() => setSidebarOpen(false)}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolios" onClick={() => setSidebarOpen(false)}>
              Portfolios
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setSidebarOpen(false)}>
              Contacts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="mt-4 inline-block px-4 py-2 rounded-lg bg-blue-500 text-white text-center"
              onClick={() => setSidebarOpen(false)}
            >
              Get in touch
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
