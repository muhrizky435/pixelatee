import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { ServiceCard } from "../components/Card";

export default function Service() {
  return (
    <div className="font-default">
      {/* Navbar */}
      <header>
        <NavBar textColor="text-secondary" />
      </header>

      {/* Konten Utama */}
      <main>
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row w-full h-auto lg:h-[500px]">
          {/* Gambar Kiri */}
          <div className="lg:w-1/3 w-full h-64 lg:h-full">
            <img
              src=""
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Teks Kanan */}
          <div className="lg:w-2/3 w-full bg-blue-100 flex flex-col justify-center px-6 lg:px-16 py-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-blue-700 mb-4">
              Solusi Kreatif dan Teknologi dalam Satu Tempat
            </h1>
            <p className="text-lg text-blue-500 leading-relaxed">
              Kami menyediakan layanan yang memadukan kreativitas dan inovasi
              untuk bisnis Anda.
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center text-center px-6 py-16 max-w-5xl mx-auto">
          {/* Judul */}
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">
            Kenapa Harus Memilih kami?
          </h2>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-blue-200 mb-6"></div>

          {/* Deskripsi */}
          <p className="text-gray-500 leading-relaxed mb-4 text-justify lg:text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet
          condimentum luctus. Etiam bibendum nisi sit amet convallis porta.
          Suspendisse potenti. Praesent nec dignissim neque, in sodales nulla.
          Phasellus a diam eget diam porta efficitur eu id mauris. Fusce nulla
          purus, volutpat aliquet semper et, congue ut nibh. Nam ac orci ut nibh
          bibendum efficitur id sit amet ipsum.
        </p>

        <p className="text-gray-500 leading-relaxed text-justify lg:text-center">
          Ut et urna auctor, placerat nisi sit amet, dignissim sapien. Sed
          tortor erat, consectetur in libero vel, condimentum malesuada purus.
          Fusce nulla purus, volutpat aliquet semper et, congue ut nibh. Nam ac
          orci ut nibh bibendum efficitur id sit amet ipsum.
        </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto px-6 py-5 text-center">
          <div className="flex flex-col items-center">
            <img
              src=""
              alt=""
              className="w-20 h-20 mb-10 bg-gray-300 border rounded"
            />
            <h1 className="text-xl font-semibold text-blue-500 mb-2">Lorem Ipsum</h1>
            <p className="text-gray-500 leading-relaxed text-sm mb-20">
              Nisi sit amet, dignissim sapien. Sed tortor erat, consectetur in libero vel, 
              condimentum malesuada purus. Fusce nulla purus,
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src=""
              alt=""
              className="w-20 h-20 mb-10 bg-gray-300 border rounded"
            />
            <h1 className="text-xl font-semibold text-blue-500 mb-2">Lorem Ipsum</h1>
            <p className="text-gray-500 leading-relaxed text-sm">
              Nisi sit amet, dignissim sapien. Sed tortor erat, consectetur in libero vel, 
              condimentum malesuada purus. Fusce nulla purus,
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src=""
              alt=""
              className="w-20 h-20 mb-10 bg-gray-300 border rounded"
            />
            <h1 className="text-xl font-semibold text-blue-500 mb-2">Lorem Ipsum</h1>
            <p className="text-gray-500 leading-relaxed text-sm">
              Nisi sit amet, dignissim sapien. Sed tortor erat, consectetur in libero vel, 
              condimentum malesuada purus. Fusce nulla purus,
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src=""
              alt=""
              className="w-20 h-20 mb-10 bg-gray-300 border rounded"
            />
            <h1 className="text-xl font-semibold text-blue-500 mb-2">Lorem Ipsum</h1>
            <p className="text-gray-500 leading-relaxed text-sm">
              Nisi sit amet, dignissim sapien. Sed tortor erat, consectetur in libero vel, 
              condimentum malesuada purus. Fusce nulla purus,
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src=""
              alt=""
              className="w-20 h-20 mb-10 bg-gray-300 border rounded"
            />
            <h1 className="text-xl font-semibold text-blue-500 mb-2">Lorem Ipsum</h1>
            <p className="text-gray-500 leading-relaxed text-sm">
              Nisi sit amet, dignissim sapien. Sed tortor erat, consectetur in libero vel, 
              condimentum malesuada purus. Fusce nulla purus,
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src=""
              alt=""
              className="w-20 h-20 mb-10 bg-gray-300 border rounded"
            />
            <h1 className="text-xl font-semibold text-blue-500 mb-2">Lorem Ipsum</h1>
            <p className="text-gray-500 leading-relaxed text-sm">
              Nisi sit amet, dignissim sapien. Sed tortor erat, consectetur in libero vel, 
              condimentum malesuada purus. Fusce nulla purus,
            </p>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center text-center mb-4 px-6 py-10 max-w-5xl mx-auto">
          {/* Judul */}
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">Layanan Terbaik Kami</h2>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-blue-200 mb-6"></div>
          <p className="text-gray-500 leading-relaxed text-justify lg:text-center mb-6">
            Ut et urna auctor, placerat nisi sit amet, dignissim sapien. Sed
            tortor erat, consectetur in libero vel, condimentum malesuada purus.
            Fusce nulla purus, volutpat aliquet semper et, congue ut nibh. Nam ac
            orci ut nibh bibendum efficitur id sit amet ipsum.
          </p>
        </section>
          <ServiceCard />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
