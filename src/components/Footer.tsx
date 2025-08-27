import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="relative grid grid-cols-1 lg:grid-cols-[1fr_250px_320px] py-14 px-8 lg:px-20 bg-senary font-default overflow-hidden">

      {/* Kolom 1 - Logo & Deskripsi */}
      <div className="relative flex flex-col gap-8 pe-10 items-start">
        <Link to="/">
          <img className="w-44" src="/Logotype.svg" alt="Pixelatee Logomark" />
        </Link>
        <p className="text-gray-300 leading-7 max-w-md">
          Pixelatee adalah studio kreatif digital yang membantu brand tumbuh
          melalui desain, teknologi, dan strategi. Kami percaya setiap ide
          hebat layak dieksekusi dengan estetika dan fungsionalitas terbaik.
        </p>

        {/* Social Media */}
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-lg font-semibold text-white">Ikuti Kami</h3>
          <div className="flex gap-5 text-gray-400">
            <a
              href="#"
              className="hover:text-pink-400 transition-colors duration-300"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="#"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              <FaXTwitter size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Kolom 2 - Tautan */}
      <div className="relative flex flex-col gap-3 mt-6 lg:mt-2">
        <h3 className="text-white font-semibold text-lg mb-2">Navigasi</h3>
        <Link
          to="/about"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Tentang Kami
        </Link>
        <Link
          to="/services"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Layanan
        </Link>
        <Link
          to="/blogs"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Blog
        </Link>
        <Link
          to="/product"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Produk
        </Link>
        <Link
          to="/contact"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Kontak
        </Link>
      </div>

      {/* Kolom 3 - Kontak */}
      <div className="relative flex flex-col gap-4 mt-8 lg:mt-2">
        <h3 className="text-white font-semibold text-lg mb-2">Hubungi Kami</h3>
        <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
          <HiOutlineLocationMarker size={20} />{" "}
          <span>Jl. Akatsuki No. 21, Konoha</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
          <HiOutlineMail size={20} /> <span>hello@pixelatee.com</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
          <HiOutlinePhone size={20} /> <span>+62 821-1234-5678</span>
        </div>
      </div>
    </footer>
  );
}
