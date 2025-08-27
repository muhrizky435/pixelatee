import { useEffect, useState, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink } from "react-router";

type NavBarProps = {
  textColor: "text-primary" | "text-secondary" | "text-tertiary";
};

export function NavBar({ textColor }: NavBarProps) {
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

      setScrolled(currentScrollY > 500);
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
         border border-[#06B6D4] backdrop-blur-lg
        ${show ? "translate-y-0" : "-translate-y-[120%]"} 
        ${scrolled ? "bg-white/90 shadow-lg" : "bg-white/70 shadow-md"}
      `}
      >
        {/* Logo */}
        <NavLink to={"/"}>
          <img
            className={"w-32"}
            src={"/Logotype.svg"}
            alt={"Pixelatee Logotype"}
          />
        </NavLink>

        {/* Menu Desktop */}
        <ul
          className={`md:flex gap-6 justify-center items-center flex-1 hidden ${
            scrolled ? "text-gray-700" : textColor
          }`}
        >
          <li>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold"
                  : "hover:text-blue-500 transition-colors"
              }
            >
              Tentang
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/services"}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold"
                  : "hover:text-blue-500 transition-colors"
              }
            >
              Layanan
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/blogs"}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold"
                  : "hover:text-blue-500 transition-colors"
              }
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/product"}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold"
                  : "hover:text-blue-500 transition-colors"
              }
            >
              Produk
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold"
                  : "hover:text-blue-500 transition-colors"
              }
            >
              Kontak
            </NavLink>
          </li>
        </ul>

        {/* Right Section */}
        <div className={"md:flex items-center gap-6 hidden"}>
          <div className="flex items-center gap-2 text-blue-600">
            <span className="text-sm font-medium">Need help?</span>
            <span className="font-semibold">(+62) 123-45678-91</span>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className={"md:hidden items-center gap-8 flex flex-1 justify-end"}>
          <HiMenu
            onClick={() => setSidebarOpen(true)}
            className={`${scrolled ? "text-gray-700" : textColor} cursor-pointer`}
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
            <NavLink to="/about" onClick={() => setSidebarOpen(false)}>
              Tentang
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" onClick={() => setSidebarOpen(false)}>
              Layanan
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs" onClick={() => setSidebarOpen(false)}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/product" onClick={() => setSidebarOpen(false)}>
              Produk
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setSidebarOpen(false)}>
              Kontak
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
