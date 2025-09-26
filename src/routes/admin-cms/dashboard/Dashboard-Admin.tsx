import { useState, useEffect, useRef } from "react";
import NavBarCMS from "../../../components/CMS-Navbar";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router";

const portfolios = [
  {
    id: 1,
    name: "NovaLink Shortener",
    client: "BrightWave Media",
    status: "Draft",
    date: "09:50, 22 Aug 2025",
    icon: "/img/Logo.png",
  },
  {
    id: 2,
    name: "CoreCMS",
    client: "BrightWave Media",
    status: "Publish",
    date: "09:50, 22 Aug 2025",
    icon: "/img/Logo.png",
  },
  {
    id: 3,
    name: "SkyHost Cloud",
    client: "BrightWave Media",
    status: "Publish",
    date: "09:50, 22 Aug 2025",
    icon: "/img/Logo.png",
  },
  {
    id: 4,
    name: "ShopMaster E-Commerce",
    client: "BrightWave Media",
    status: "Publish",
    date: "09:50, 22 Aug 2025",
    icon: "/img/Logo.png",
  },
  {
    id: 5,
    name: "PeopleFlow HRIS",
    client: "BrightWave Media",
    status: "Archive",
    date: "09:50, 22 Aug 2025",
    icon: "/img/Logo.png",
  },
];

const contact = [
  {
    id: 1,
    title: "NovaLink Shortener",
    sender: "BrightWave Media",
    email: "example@pixelatee.com",
    handleBy: "Draft",
    date: "09:50, 22 Aug 2025",
  },
  {
    id: 2,
    title: "NovaLink Shortener",
    sender: "BrightWave Media",
    email: "example@pixelatee.com",
    handleBy: "Draft",
    date: "09:50, 22 Aug 2025",
  },
  {
    id: 3,
    title: "NovaLink Shortener",
    sender: "BrightWave Media",
    email: "example@pixelatee.com",
    handleBy: "Draft",
    date: "09:50, 22 Aug 2025",
  },
  {
    id: 4,
    title: "NovaLink Shortener",
    sender: "BrightWave Media",
    email: "example@pixelatee.com",
    handleBy: "Draft",
    date: "09:50, 22 Aug 2025",
  },
  {
    id: 5,
    title: "NovaLink Shortener",
    sender: "BrightWave Media",
    email: "example@pixelatee.com",
    handleBy: "Draft",
    date: "09:50, 22 Aug 2025",
  },
];

function getStatusStyle(status: string) {
  switch (status) {
    case "Draft":
      return "bg-yellow-200 text-yellow-700 border border-yellow-300";
    case "Publish":
      return "bg-green-200 text-green-700 border border-green-300";
    case "Archive":
      return "bg-gray-200 text-gray-700 border border-gray-300";
    default:
      return "bg-gray-200 text-gray-600 border border-gray-200";
  }
}

const data = [
  { name: "Mon", visits: 30 },
  { name: "Tue", visits: 45 },
  { name: "Wed", visits: 60 },
  { name: "Thu", visits: 20 },
  { name: "Fri", visits: 40 },
];

const admins = [
  { name: "Micah Bell", role: "Admin", img: "https://i.pravatar.cc/100?img=1" },
  {
    name: "Arthur Morgan",
    role: "Admin",
    img: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "John Marston",
    role: "Admin",
    img: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Sadie Adler",
    role: "Admin",
    img: "https://i.pravatar.cc/100?img=4",
  },
];

export default function DashboardAdmin() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <NavBarCMS>
      <main className="bg-gray-50 min-h-screen pt-2 pb-8 px-2 md:px-8 space-y-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-blue-500">Dashboard</h1>
          <p className="text-gray-600 font-semibold">Welcome back, Natasha</p>
        </header>

        {/* Top Section: Chart + Admins */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Card */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-8">
                <div>
                  <p className="text-xl font-semibold text-gray-800">1,020</p>
                  <p className="text-sm text-gray-500">Min. Visits</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">2,010</p>
                  <p className="text-sm text-gray-500">Avg. Visits</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">5,376</p>
                  <p className="text-sm text-gray-500">Max. Visits</p>
                </div>
              </div>
              <select className="border rounded-lg px-3 py-1 text-sm focus:ring focus:ring-blue-200">
                <option>1 Aug - 31 Aug</option>
              </select>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Admins Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Admins</h2>
            <ul className="space-y-4">
              {admins.map((admin, i) => (
                <li key={i} className="flex items-center gap-3">
                  <img
                    src={admin.img}
                    alt={admin.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-700">{admin.name}</p>
                    <p className="text-sm text-gray-500">{admin.role}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-end">
              <Link
                to={`/panels-admins/admins`}
                className="font-semibold flex text-right gap-1 mt-2 group w-fit text-blue-500 hover:text-blue-700 text-md"
              >
                See more
                <span className="ml-1 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Portfolio Table */}
        <section className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Portfolios</h2>
            <span className="text-sm text-gray-500">{portfolios.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="border-b text-sm text-blue-400">
                  <th className="py-3 px-4">Portfolio</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date Received</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {portfolios.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-blue-50 transition"
                  >
                    <td className="flex items-center gap-3 py-3 px-4">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-8 h-8 rounded-md object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {item.name}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.client}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{item.date}</td>
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
                        <div
                          ref={menuRef}
                          className="absolute top-1/2 right-10 -translate-y-1/2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 animate-fadeIn"
                        >
                          <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition">
                            Lihat Detail
                          </button>
                          <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition">
                            Edit
                          </button>
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
              to={`/panels-admins/portfolios`}
              className="font-semibold flex text-right gap-1 mt-2 group w-fit text-blue-500 hover:text-blue-700 text-md"
            >
              See more
              <span className="ml-1 group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
          </div>
        </section>
        {/* End */}

        {/* Contact Table */}
        <section className="bg-white shadow-md rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Contact</h2>
            <span className="text-sm text-gray-500">{contact.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="border-b text-sm text-blue-400">
                  <th className="py-3 px-4">Title & Sender</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Handled By</th>
                  <th className="py-3 px-4">Date Received</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {contact.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">{item.title}</span>
                        <span className="text-sm text-gray-600">{item.sender}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.email}</td>
                    <td className="py-3 px-4 text-gray-600">{item.handleBy}</td>
                    <td className="py-3 px-4 text-gray-600">{item.date}</td>
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
                        <div
                          ref={menuRef}
                          className="absolute top-1/2 right-10 -translate-y-1/2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 animate-fadeIn"
                        >
                          <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition">
                            Lihat Detail
                          </button>
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
              to={`/panels-admins/contacts`}
              className="font-semibold flex text-right gap-1 mt-2 group w-fit text-blue-500 hover:text-blue-700 text-md"
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
