import NavBarCMS from "../components/NavBarCMS";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ContactCMS() {
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
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-blue-600">/ Klien</div>

      {/* Search & Tambah Data */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="bg-white w-full border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        {/* Tambah Data */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg shadow"
        onClick={() => openModal("tambah")}>
          Tambah Data Klien
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow p-4">
        {/* Table */}
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 font-medium">No</th>
              <th className="p-3 font-medium">Nama</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">No Tlp</th>
              <th className="p-3 font-medium">Alamat</th>
              <th className="p-3 font-medium text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-blue-50 transition-colors"
                >
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">Nama {i + 1}</td>
                  <td className="p-3">email{i + 1}@example.com</td>
                  <td className="p-3"> 08xxxxxxxxxx</td>
                  <td className="p-3">Jl.xxxxxxxx</td>
                  <td className="p-3 text-center relative">
                    <button
                      className="p-2 rounded-full hover:bg-blue-100"
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
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>Showing 1 to 10 of 10 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg hover:bg-blue-100">
              &lt;
            </button>
            <button className="px-3 py-1 rounded-lg text-black">
              1
            </button>
            <button className="px-3 py-1 rounded-lg hover:bg-blue-100">
              &gt;
            </button>
          </div>
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
                Klien <span className="font-bold">{selectedProduct}</span> akan dihapus.
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
              {modalType === "tambah" ? "Tambah Produk" : "Edit Klien"}
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama</label>
                  <input type="text" className="border rounded-lg p-2 w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Email</label>
                  <input type="text" className="border rounded-lg p-2 w-full" />
                </div>
              </div>
              <div>
                  <label className="block text-sm font-medium mb-1">No Tlp</label>
                  <input type="text" className="border rounded-lg p-2 w-full" />
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
