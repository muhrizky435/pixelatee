import NavBarCMS from "../components/NavBarCMS";
import { FaSearch, FaTrash } from "react-icons/fa";

export default function ContactCMS() {
  return (
    <NavBarCMS>
      <div className="mb-4 text-sm text-blue-600">/ Pesan Masuk</div>

      {/* Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="bg-white w-full border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow p-4">
        {/* Table */}
        <table className="w-full border-collapse text-sm">
          <thead className="text-left">
            <tr>
              <th className="p-3 font-medium">Nama</th>
              <th className="p-3 font-medium">Subject</th>
              <th className="p-3 font-medium">Message</th>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-blue-50 transition-colors group"
                >
                  <td className="p-3">Lorem Ipsum</td>
                  <td className="p-3">
                    Nisi sit amet, dignissim sapien. Sed tortor erat…
                  </td>
                  <td className="p-3">
                    Nisi sit amet, dignissim sapien. Sed tortor erat, consectetur
                    in libero vel…
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button>
                        <FaTrash className="text-grey-500" />
                      </button>
                    </div>
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
            <button className="px-3 py-1 rounded-lg text-black">1</button>
            <button className="px-3 py-1 rounded-lg hover:bg-blue-100">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </NavBarCMS>
  );
}
