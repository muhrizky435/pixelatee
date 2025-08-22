import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export default function Blog() {
  return (
    <div className="font-default">
      {/* Navbar */}
      <header>
        <NavBar backgroundColor="bg-primary" textColor="text-secondary" />
      </header>

      {/* Hero Section */}
      <section className="px-6 py-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Gambar besar */}
          <div className="lg:col-span-2">
            <img
              src="public/img/pexels-chanaka-906494.jpg"
              alt="Hero utama"
              className="w-full h-80 object-cover"
            />
            <p className="mt-2 text-white bg-opacity-50 inline-block px-2 py-1 rounded">
              Lorem ipsum
            </p>
          </div>

          {/* Dua gambar kecil */}
          <div className="grid grid-rows-2 gap-4">
            <div className="relative">
              <img
                src="public/img/pexels-chanaka-906494.jpg"
                alt="Hero kanan atas"
                className="w-full h-38 object-cover"
              />
              <p className="absolute bottom-2 left-2 text-white bg-opacity-50 px-2 py-1 rounded">
                Lorem ipsum
              </p>
            </div>
            <div className="relative">
              <img
                src="public/img/pexels-chanaka-906494.jpg"
                alt="Hero kanan bawah"
                className="w-full h-38 object-cover"
              />
              <p className="absolute bottom-2 left-2 text-white bg-opacity-50 px-2 py-1 rounded">
                Lorem ipsum
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Blog Section */}
      <section className="flex flex-col items-center text-center px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">Our Blog</h2>
        <div className="w-12 h-0.5 bg-blue-200 mb-6"></div>
        <p className="text-gray-500 leading-relaxed mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet
          condimentum luctus. Etiam bibendum nisi sit amet convallis porta.
          Suspendisse potenti. Praesent nec dignissim neque, in sodales nulla.
        </p>
      </section>

      {/* Blog Cards */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img src="/img/robot.jpg" alt="Artikel 1" className="w-full h-48 object-cover" />
            <div className="p-4 text-left">
              <p className="text-sm text-gray-400 mb-2">Uncategorized</p>
              <h3 className="font-semibold text-lg mb-2">
                Teknologi AI Kini Semakin Dekat dengan Kehidupan Sehari-hari
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Perkembangan teknologi AI membawa banyak perubahan dalam kehidupan
                sehari-hari, mulai dari pendidikan, bisnis, hingga kesehatan.
              </p>
              <a href="#" className="text-blue-500 text-sm font-medium hover:underline">
                Lihat Selengkapnya →
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img src="/img/google.jpg" alt="Artikel 2" className="w-full h-48 object-cover" />
            <div className="p-4 text-left">
              <p className="text-sm text-gray-400 mb-2">Uncategorized</p>
              <h3 className="font-semibold text-lg mb-2">
                Google UI Coba Mesin Pencari dengan Hasil AI Generated
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Google mulai menguji mesin pencari yang menghasilkan jawaban dari
                AI, membuat pencarian semakin cepat dan interaktif.
              </p>
              <a href="#" className="text-blue-500 text-sm font-medium hover:underline">
                Lihat Selengkapnya →
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img src="/img/laptop.jpg" alt="Artikel 3" className="w-full h-48 object-cover" />
            <div className="p-4 text-left">
              <p className="text-sm text-gray-400 mb-2">Uncategorized</p>
              <h3 className="font-semibold text-lg mb-2">
                Laptop dengan Layar OLED Lipat Mulai Hadir di Pasaran
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Perusahaan teknologi meluncurkan laptop dengan layar lipat OLED
                pertama, menawarkan pengalaman kerja lebih fleksibel.
              </p>
              <a href="#" className="text-blue-500 text-sm font-medium hover:underline">
                Lihat Selengkapnya →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
