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
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl px-6 py-3 flex items-center justify-between transition-all duration-300 font-default bg-white
        ${scrolled ? "translate-y-0" : "-translate-y-[120%]"}
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
            to="/portofolio"
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

      {/* CTA Button */}
      <div className="hidden md:block">
        <NavLink
          to="/contact"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
        >
          Get in touch
        </NavLink>
      </div>
    </div>
  );
}
