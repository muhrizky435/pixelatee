import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export default function Service() {
  return (
    <div className="font-default">
      {/* Navbar */}
      <header>
        <NavBar backgroundColor="bg-primary" textColor="text-secondary" />
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
