import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/Card";
import { FaUsers, FaBoxOpen, FaHandshake } from "react-icons/fa";
  

export default function Product() {

  return (
    <div className="font-default">
      {/* Navbar */}
      <header>
        <NavBar backgroundColor="bg-primary" textColor="text-secondary" />
      </header>

      {/* Konten Utama */}
      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[500px] flex items-center justify-center bg-[url('/img/pexels-cottonbro-5990271.jpg')] bg-cover bg-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-800/70 via-blue-800/20 to-transparent" />

          {/* Judul + Subjudul */}
          <div className="relative z-10 text-center text-white px-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">
              Produk Digital yang Mendorong Inovasi Bisnis
            </h1>
            <p className="text-base text-gray-200">
              Temukan beragam produk kami yang siap membantu Anda mencapai tujuan bisnis.
            </p>
          </div>

          {/* Box Statistik */}
          <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Card 1 */}
            <div className="flex flex-col items-center">
              <FaUsers className="text-blue-500 text-4xl mb-2" />
              <h3 className="text-xl font-semibold">50+</h3>
              <p className="text-gray-600">Total Klien</p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center">
              <FaBoxOpen className="text-blue-500 text-4xl mb-2" />
              <h3 className="text-xl font-semibold">50+</h3>
              <p className="text-gray-600">Total Produk</p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center">
              <FaHandshake className="text-blue-500 text-4xl mb-2" />
              <h3 className="text-xl font-semibold">50+</h3>
              <p className="text-gray-600">Total Partner</p>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center text-center px-6 py-16 max-w-5xl mx-auto mt-20">
            {/* Judul */}
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
                Klien kami?
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
        <section className="flex flex-col items-center justify-center text-center px-6 py-16 max-w-5xl mx-auto">
            {/* Judul */}
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
                Produk Kami
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
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto px-6 py-5 text-center">
            <ProductCard
                id="1"
                client="Client X"
                title="Product X"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                image="/img/gambar.png"
            />
            <ProductCard
                id="2"
                client="Client X"
                title="Product X"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                image="/img/gambar.png"
            />
            <ProductCard
                id="3"
                client="Client X"
                title="Product X"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                image="/img/gambar.png"
            />
            <ProductCard
                id="4"
                client="Client X"
                title="Product X"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                image="/img/gambar.png"
            />
            <ProductCard
                id="5"
                client="Client X"
                title="Product X"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                image="/img/gambar.png"
            />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
