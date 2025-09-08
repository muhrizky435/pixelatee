import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative bg-[#0E1425] text-gray-300 font-default overflow-hidden">
      {/* Background logo watermark
      <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none">
        <img src="/img/LogoWhite.png" alt="Pixelatee Watermark" className="w-[500px]" />
      </div> */}

      {/* Konten utama */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-16 px-12 lg:px-20 py-16">
        {/* Kolom 1 - Logo & Deskripsi */}
        <div className="flex flex-col gap-6">
          <Link to="/">
            <img className="w-44" src="/img/LogoWhite.png" alt="Pixelatee Logo" />
          </Link>
          <p className="leading-7 max-w-sm">
            We design, build, and transform digital experiences with creativity
            and precision.
          </p>
          {/* Social Media */}
          <div className="flex gap-5 mt-2 text-gray-400">
            <a href="#" className="hover:text-pink-400 transition-colors duration-300">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="hover:text-white transition-colors duration-300">
              <FaXTwitter size={22} />
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors duration-300">
              <FaLinkedin size={22} />
            </a>
          </div>
        </div>

        {/* Kolom 2 - About Us */}
        <div className="flex flex-col gap-3 ">
          <h3 className="text-white font-semibold text-lg mb-2">About Us</h3>
          <Link to="#about" className="hover:text-white transition-colors">About</Link>
          <Link to="#about" className="hover:text-white transition-colors">Goals</Link>
          <Link to="#faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>

        {/* Kolom 3 - Menus */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold text-lg mb-2">Menus</h3>
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/services" className="hover:text-white transition-colors">Services</Link>
          <Link to="/portfolio" className="hover:text-white transition-colors">Portfolios</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contacts</Link>
        </div>

        {/* Kolom 4 - Contact */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold text-lg mb-2">Contact</h3>
          <div className="flex items-center gap-3 hover:text-white transition-colors">
            <HiOutlinePhone size={20} /> <span>+62 877 3216 0963</span>
          </div>
          <div className="flex items-center gap-3 hover:text-white transition-colors">
            <HiOutlineMail size={20} /> <span>support@pixelatee.com</span>
          </div>
          <div className="flex items-center gap-3 hover:text-white transition-colors">
            <HiOutlineLocationMarker size={20} /> <span>24, Us Street, Washington DC</span>
          </div>
        </div>
      </div>

      {/* Footer bawah */}
      <div className="relative border-t border-gray-700 py-5 px-8 lg:px-20 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>Copyright @ 2025</p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-white">Privacy & Policy</Link>
        </div>
      </div>
    </footer>
  );
}
