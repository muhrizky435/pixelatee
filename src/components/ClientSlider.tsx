import Marquee from "react-fast-marquee";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

// Dummy client logo (bisa ganti pake gambar asli di /public/images/clients)
const clients = [
  { id: 1, name: "Brand A", logo: "/img/Pixel.png" },
  { id: 2, name: "Brand B", logo: "/img/Pixel.png" },
  { id: 3, name: "Brand C", logo: "/img/Pixel.png" },
  { id: 4, name: "Brand D", logo: "/img/Pixel.png" },
  { id: 5, name: "Brand E", logo: "/img/Pixel.png" },
];

export function ClientSlider() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="py-6 bg-blue-400">
        <h3 className="text-center text-lg md:text-2xl font-semibold text-white">
          Dipercaya oleh <span className="text-[#05505d] ">mitra terbaik</span> kami
        </h3>
        <p className="text-center text-white mt-2 text-sm md:text-base">
          Kolaborasi bersama brand ternama untuk solusi digital unggul
        </p>
      </div>

      {/* Slider */}
      <Marquee
        className="bg-white py-6"
        gradient={false}
        speed={50}
        pauseOnHover
      >
        <div className="flex gap-12 px-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex justify-center items-center min-w-[120px] h-20 px-4 rounded-lg shadow-cyan-500/50 hover:shadow-lg transition-shadow"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </Marquee>

      {/* CTA */}
      <div className="flex justify-center py-6">
        <Link
          to="/clients"
          className="inline-flex items-center gap-2 px-5 py-2 border border-[#06B6D4] text-[#06B6D4] font-medium rounded-full hover:bg-blue-400 hover:text-white transition-colors"
        >
          Lihat Lebih Banyak
          <HiArrowRight className="text-lg" />
        </Link>
      </div>
    </div>
  );
}
