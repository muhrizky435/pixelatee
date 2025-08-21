import NavBarCMS from "../components/NavBarCMS";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { useState } from "react";

export default function ServiceCMS() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <NavBarCMS>
      <div className="bg-[#eaf0fb] min-h-screen p-6">
        <div className="mb-4 text-sm text-blue-600 font-medium">/ Layanan</div>

        <div className="mb-6">
          <div className="relative w-full mb-3">
            <input
              type="text"
              placeholder="Search"
              className="bg-white w-full border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button className="bg-blue-600 text-white w-full py-2 rounded-lg font-medium hover:bg-blue-700">
            Tambah Data Layanan
          </button>
        </div>

        <h2 className="text-xl font-bold text-blue-700 mb-4">Daftar Layanan</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
                />

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold">Lorem Ipsum</h3>
                  <p className="text-sm text-gray-600">
                    Nisi sit amet, dignissim sapien. Sed tortor erat,
                    consectetur in libero vel...
                  </p>
                </div>

                {/* Action Menu */}
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
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Detail
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Edit
                        </li>
                        <li className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer">
                          Hapus
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Footer Link */}
        <div className="flex justify-end mt-4">
          <a
            href="#"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Lihat Semua
          </a>
        </div>
      </div>
    </NavBarCMS>
  );
}
