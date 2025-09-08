import { useState } from "react";
import NavBarCMS from "../../../components/CMS-Navbar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router";

const contact = [
  {
    id: 1,
    name: "NovaLink Shortener",
    email: "example@pixelatee.com",
    subject: "Draft",
    message: "Hello, I am interested in your services.",
  },
  {
    id: 2,
    name: "NovaLink Shortener",
    email: "example@pixelatee.com",
    subject: "Draft",
    message: "Hello, I am interested in your services.",
  },
  {
    id: 3,
    name: "NovaLink Shortener",
    email: "example@pixelatee.com",
    subject: "Draft",
    message: "Hello, I am interested in your services.",
  },
  {
    id: 4,
    name: "NovaLink Shortener",
    email: "example@pixelatee.com",
    subject: "Draft",
    message: "Hello, I am interested in your services.",
  },
  {
    id: 5,
    name: "NovaLink Shortener",
    email: "example@pixelatee.com",
    subject: "Draft",
    message: "Hello, I am interested in your services.",
  },
];

export default function ContactAdmin() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen p-6 space-y-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-blue-500">Contact</h1>
        </header>

        {/* Contact Table */}
        <section className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              List Message
            </h2>
            <span className="text-sm text-gray-500">{contact.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="border-b text-sm text-blue-400">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {contact.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-blue-50 transition"
                  >
                    <td className="flex items-center gap-3 py-3 px-4">
                      <span className="font-medium text-gray-600">
                        {item.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.email}</td>
                    <td className="py-3 px-4 text-gray-600">{item.subject}</td>
                    <td className="py-3 px-4 text-gray-600">{item.message}</td>
                    <td className="py-3 px-4 text-right relative">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === item.id ? null : item.id)
                        }
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <BsThreeDotsVertical className="text-gray-500" />
                      </button>

                      {openMenu === item.id && (
                        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 animate-fadeIn">
                          <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition">
                            Lihat Detail
                          </button>
                          <div className="border-t border-gray-100"></div>
                          <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition">
                            Hapus
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <Link
              to={`/admin`}
              className="font-semibold flex text-right gap-1 mt-2 group w-fit text-blue-600 hover:text-blue-800 text-lg"
            >
              See more
              <span className="ml-1 group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
          </div>
        </section>
      </main>
    </NavBarCMS>
  );
}
