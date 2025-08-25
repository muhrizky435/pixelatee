import NavBarCMS from "../../components/NavBarCMS";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function DetailContactCMS() {
  const navigate = useNavigate();

  return (
    <NavBarCMS>
      {/* Breadcrumb */}
      <button className="mb-4 text-sm text-blue-600" onClick={() => navigate(-1)}>
        / Pesan Masuk / <button className="font-semibold" >Subjek</button>
      </button>

      {/* Card Detail */}
      <div className="bg-blue-100 rounded-lg shadow p-6">
        {/* Tombol Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:underline mb-4"
        >
          <FaArrowLeft />
        </button>

        {/* Judul */}
        <h1 className="text-xl font-bold mb-4">Subjek</h1>

        {/* Nama & Email */}
        <div className="flex items-center gap-6 text-sm mb-4">
          <span className="font-semibold">Nama</span>
          <span className="text-gray-600">Email</span>
        </div>

        {/* Isi Pesan */}
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            laoreet condimentum luctus. Etiam bibendum nisi sit amet convallis
            porta. Suspendisse potenti. Praesent nec dignissim neque, in sodales
            nulla. Phasellus a diam eget diam porta efficitur eu id mauris.
            Fusce nulla purus, volutpat aliquet semper et, congue ut nibh. Nam
            ac orci ut nibh bibendum efficitur id sit amet ipsum.
          </p>
          <p>
            Ut et urna auctor, placerat nisi sit amet, dignissim sapien. Sed
            tortor erat, consectetur in libero vel, condimentum malesuada purus.
            Fusce nulla purus, volutpat aliquet semper et, congue ut nibh. Nam
            ac orci ut nibh bibendum efficitur id sit amet ipsum.
          </p>
        </div>
      </div>
    </NavBarCMS>
  );
}
