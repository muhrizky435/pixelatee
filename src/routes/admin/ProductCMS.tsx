import NavBarCMS from "../../components/NavBarCMS";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ProductCMS() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [modalType, setModalType] = useState<null | "tambah" | "edit" | "hapus">(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const openModal = (type: "tambah" | "edit" | "hapus", index?: number) => {
    setModalType(type);
    if (index !== undefined) setSelectedProduct(index);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProduct(null);
  };

  return (
    <NavBarCMS>
      <div className="bg-[#eaf0fb] min-h-screen p-6">
        <div className="mb-4 text-sm text-blue-600 font-medium">/ Produk</div>

        <div className="mb-6">
          <div className="relative w-full mb-3">
            <input
              type="text"
              placeholder="Search"
              className="bg-white w-full border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button
            className="bg-blue-600 text-white w-full py-2 rounded-lg font-medium hover:bg-blue-700"
            onClick={() => openModal("tambah")}
          >
            Tambah Data Produk
          </button>
        </div>

        <h2 className="text-xl font-bold text-blue-700 mb-4">Daftar Produk</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow border relative group"
              >
                <img
                  src="/img/pexels-rabbit-wang-25128698-11768811.jpg"
                  alt="Product"
                  className="rounded-t-lg w-full h-40 object-cover"
                  onClick={() => navigate(`/detailProductCMS/${i}`)}
                />

                <div className="p-4" onClick={() => navigate(`/detailProductCMS/${i}`)}>
                  <h3 className="font-bold">Product X</h3>
                  <p className="text-sm text-gray-600">
                    Nisi sit amet, dignissim sapien. Sed tortor erat,
                    consectetur in libero vel...
                  </p>
                </div>

                <div className="absolute top-2 right-2">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => toggleDropdown(i)}
                  >
                    <FaEllipsisV className="text-gray-600" />
                  </button>

                  {openDropdown === i && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-md z-10">
                      <ul className="text-sm">
                        <li
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => navigate(`/detailProductCMS/${i}`)}
                        >
                          Detail
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => openModal("edit", i)}
                        >
                          Edit
                        </li>
                        <li
                          className="px-4 py-2 text-red-500 hover:bg-blue-100 cursor-pointer"
                          onClick={() => openModal("hapus", i)}
                        >
                          Hapus
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-end mt-4">
          <a
            href="#"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Lihat Semua
          </a>
        </div>
      </div>

      {/* Modal Hapus */}
      {modalType === "hapus" && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[400px] overflow-hidden">
            <div className="bg-red-600 text-white px-4 py-3 font-bold text-lg text-center">
              Apakah Anda yakin?
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-700 mb-6 font-bold">
                Produk <span className="font-bold">{selectedProduct}</span> akan dihapus.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah & Edit */}
      {(modalType === "tambah" || modalType === "edit") && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[550px]">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg font-bold text-lg">
              {modalType === "tambah" ? "Tambah Produk" : "Edit Produk"}
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Client</label>
                  <input type="text" className="border rounded-lg p-2 w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Produk</label>
                  <input type="text" className="border rounded-lg p-2 w-full" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gambar</label>
                <input type="file" className="border rounded-lg p-2 w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea className="border rounded-lg p-2 w-full h-28"></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  className="px-5 py-2 border rounded-lg hover:bg-gray-100"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {modalType === "tambah" ? "Tambah" : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </NavBarCMS>
  );
}
