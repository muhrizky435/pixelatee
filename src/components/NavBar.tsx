import { useEffect, useState } from "react";
import { HiMenu, HiMoon } from "react-icons/hi";
import { NavLink } from "react-router";

type NavBarProps = {
  backgroundColor: "bg-primary";
  textColor: "text-primary" | "text-secondary" | "text-tertiary";
};

export function NavBar({ backgroundColor, textColor }: NavBarProps) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShow(false);
      } else {
        setShow(true);
      }

      if (currentScrollY > 500) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`flex flex-start gap-8 px-8 py-7 md:py-5 fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-default ${show ? "translate-y-0" : "-translate-y-full"} ${scrolled ? "bg-white shadow-md" : backgroundColor}`}>
      <NavLink to={"/"}>
        <img className={"w-36"} src={"/Logotype.svg"} alt={"Pixelatee Logotype"} />
      </NavLink>
      <ul className={`md:flex gap-4 justify-start items-center flex-1 ${scrolled ? "text-secondary" : textColor} hidden`}>
        <li>
          <NavLink to={"/about"} className={({ isActive }) => (isActive ? "font-semibold" : "hover:text-tertiary transition-colors")}>
            Tentang
          </NavLink>
        </li>
        <li>
          <NavLink to={"/services"} className={({ isActive }) => (isActive ? "font-semibold" : "hover:text-tertiary transition-colors")}>
            Layanan
          </NavLink>
        </li>
        <li>
          <NavLink to={"/product"} className={({ isActive }) => (isActive ? "font-semibold" : "hover:text-tertiary transition-colors")}>
            Produk
          </NavLink>
        </li>
        <li>
          <NavLink to={"/contact"} className={({ isActive }) => (isActive ? "font-semibold" : "hover:text-tertiary transition-colors")}>
            Kontak
          </NavLink>
        </li>
      </ul>
      <div className={"md:flex items-center gap-8 hidden"}>
        <HiMoon className={`${scrolled ? "text-tertiary" : textColor}`} />
        <p className={`font-semibold ${scrolled ? "text-tertiary" : textColor}`}>ID</p>
      </div>
      <div className={"md:hidden items-center gap-8 flex flex-1 justify-end"}>
        <HiMenu className={`${scrolled ? "text-tertiary" : textColor} cursor-pointer`} />
      </div>
    </div>
  );
}
