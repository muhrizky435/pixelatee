import { useState, useEffect } from "react";
import { NavLink } from "react-router";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
            className="w-32"
            src={"/Logotype.svg"}
            alt={"Pixelatee Logotype"}
          />
        </NavLink>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 text-base font-medium">
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold"
                  : "text-gray-800 hover:text-black transition-colors"
              }
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold"
                  : "text-gray-800 hover:text-black transition-colors"
              }
            >
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-bold"
                  : "text-gray-800 hover:text-black transition-colors"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="hidden md:block">
          <NavLink
            to="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
          >
            Get in touch
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
