import NavBarCMS from "../components/NavBarCMS";
import { FaArrowLeft } from "react-icons/fa";
    import { useNavigate } from "react-router";

export default function DetailProductCMS() {
    const navigate = useNavigate();
  return (
    <NavBarCMS>
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-blue-600">/ Produk / Detail</div>

      {/* Konten Detail */}
      <div className="bg-white shadow rounded-lg p-6">
        <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-blue-600 hover:underline mb-4"
                >
                  <FaArrowLeft />
                </button>
        {/* Gambar Produk */}
        <div className="mb-6">
          <img
            src="/img/pexels-pixabay-264636.jpg"
            alt="Product"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Info Produk */}
        <div className="space-y-2 mb-6">
          <p className="text-sm">
            <span className="font-semibold">Client:</span> X
          </p>
          <p className="text-lg font-semibold text-blue-600">Product X</p>
        </div>

        {/* Deskripsi */}
        <div className="text-gray-700 leading-relaxed space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            laoreet condimentum luctus. Etiam bibendum nisi sit amet convallis
            porta. Suspendisse potenti. Praesent nec dignissim neque, in sodales
            nulla. Phasellus a diam eget diam porta efficitur eu id mauris.
          </p>
          <p>
            Ut et urna auctor, placerat nisi sit amet, dignissim sapien. Sed
            tortor erat, consectetur in libero vel, condimentum malesuada purus.
            Fusce nulla purus, volutpat aliquet semper et, congue ut nibh.
          </p>
        </div>
      </div>
    </NavBarCMS>
  );
}
