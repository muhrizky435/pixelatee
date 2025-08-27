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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-md backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
