import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { useParams, Link } from "react-router";

export default function DetailProduct() {
  const {id} = useParams();

  return (
    <div className="font-default">
      {/* Navbar */}
      <header>
        <NavBar backgroundColor="bg-primary" textColor="text-secondary" />
      </header>

      {/* Konten Utama */}
      <main className="px-6 py-10 max-w-6xl mx-auto">
        {/* Tombol Kembali */}
        <Link
          to="/product"
          className="text-blue-600 hover:underline text-sm font-medium mb-6 inline-block"
        >
          ← Kembali
        </Link>

        {/* Grid Gambar + Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Gambar Produk */}
          <img
            src="/img/gambar.png"
            alt="Product"
            className="rounded-lg shadow-md w-full"
          />

          {/* Detail Produk */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Product X
            </h1>
            <p className="text-sm text-gray-500 mb-4">Client: X</p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              laoreet condimentum luctus. Etiam bibendum nisi sit amet convallis
              porta. Suspendisse potenti. Phasellus a diam eget diam porta
              efficitur eu id mauris.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Ut et urna auctor, placerat nisi sit amet, dignissim sapien. Sed
              tortor erat, consectetur in libero vel, condimentum malesuada
              purus.
            </p>
          </div>
        </div>

        {/* Service */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-blue-500 mb-2">Service</h2>
          <p className="text-gray-600">Retail</p>
        </div>

        {/* Keunggulan */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-blue-500 mb-2">Keunggulan</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>X</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
