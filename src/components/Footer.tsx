import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="grid grid-cols-1 lg:grid-cols-[1fr_275px_350px] py-11 px-8 bg-senary font-default" 
    style={{
        backgroundImage: "url('/Logomark.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left bottom",
        backgroundSize: "500px",
      }}>
      <div className="flex flex-col gap-10 pe-16 items-start">
        <Link to="/">
          <img className="w-40" src="/Logotype.svg" alt="Pixelatee Logomark" />
        </Link>
        <p className="text-white leading-7">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, atque, eveniet nulla ducimus earum architecto asperiores vero expedita dicta laboriosam, minima corporis quae dolore quisquam quia consequuntur ea accusamus.
          Nulla!
        </p>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-xl font-semibold text-white">Follow Kami</h3>
          <div className="flex gap-4 text-white">
            <FaInstagram size={22} />
            <FaFacebook size={22} />
            <FaXTwitter size={22} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-white font-semibold mb-2">Tautan</h3>
        <Link to="/about" className="text-gray-300 hover:text-white">Tentang</Link>
        <Link to="/services" className="text-gray-300 hover:text-white">Layanan</Link>
        <Link to="/product" className="text-gray-300 hover:text-white">Produk</Link>
        <Link to="/contact" className="text-gray-300 hover:text-white">Kontak</Link>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-white font-semibold mb-2">Kontak</h3>
        <div className="flex items-center gap-3 text-gray-300">
          <HiOutlineLocationMarker size={20} /> <span>Lokasi X</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <HiOutlineMail size={20} /> <span>pixelatee@pixelatee.com</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <HiOutlinePhone size={20} /> <span>0821-XXXX-3213</span>
        </div>
      </div>
    </footer>
  );
}
