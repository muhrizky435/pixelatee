import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import NavBarCMS from "../../../components/CMS-Navbar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import PortfolioModal from "../portfolio/Portfolio-Detail-Admin";
import ContactDetailModal from "../contact/Contact-Detail-Admin";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// import api chart dashboard
import { getDashboard, type DashboardChart } from "../../../api/dashboard.api";

// import api admins
import { getAdminList, type Admin } from "../../../api/super-admin.api";

// import api portfolios
import {
  deletePortfolioAdmin,
  getAllPortfoliosAdmin,
  type Portfolio,
} from "../../../api/portfolio.api";

// import api contacts
import {
  getAllContactsAdmin,
  deleteContactAdmin,
} from "../../../api/contact.api";
import type { Contact } from "../../../api/contact.api";

// Extend Portfolio API dengan tambahan field untuk UI
interface PortfolioUI extends Portfolio {
  date: string;
  time: string;
  img: string;
  author?: string;
}

// Mapping Type Contact Labels
const TYPE_LABELS: Record<string, string> = {
  CUSTOMER_SERVICE: "Customer Service",
  IT_CONSULTATION: "IT Consultation",
  UIUX_DEVELOPMENT: "UI/UX Development",
  MOBILE_DEVELOPMENT: "Mobile Development",
  WEB_DEVELOPMENT: "Web Development",
  OTHER: "Other",
};

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [chartData, setChartData] = useState<DashboardChart[]>([]);

  /*
    -- State Portfolio --
  */
  // state portfolio
  const [loading, setLoading] = useState<boolean>(true);
  const [, setErrorMessage] = useState("");
  const [portfolios, setPortfolios] = useState<PortfolioUI[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // state search & filter portfolio
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const filterRef = useRef<HTMLDivElement>(null);

  // UI state Portfolio (modal, filter, pagination)
  const [openAction, setOpenAction] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] =
    useState<PortfolioUI | null>(null);
  const [selectedPortfolioForDelete, setSelectedPortfolioForDelete] =
    useState<PortfolioUI | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    totalData: 0,
    totalPage: 1,
  });

  // Filtered portfolios
  const filteredPortfolios = portfolios.filter((p) => {
    const matchTitle = p.title.toLowerCase().includes(search.toLowerCase());
    const matchClient = p.client?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus
      ? p.status?.toLowerCase() === filterStatus.toLowerCase()
      : true;

    return (matchTitle || matchClient) && matchStatus;
  });
  /* ----------- */

  /*
    -- State Contact --
  */
  // State Contact
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );

  // Pagination Contact
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // filter contacts
  const filteredContact = contacts.filter((c) => {
    const matchesType = filterType ? c.type === filterType : true;
    const matchesSearch = search
      ? c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.message.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesType && matchesSearch;
  });

  // pagination contacts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = filteredContact.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredContact.length / itemsPerPage)
  );
  /* ----------- */

  // Fetch Dashboard (chart)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboard();
        setChartData(data.chart);
      } catch (err) {
        console.error("Gagal ambil dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hitung Min, Max, Avg pakai useMemo untuk chart dashboard
  const { minVisits, maxVisits, avgVisits } = useMemo(() => {
    if (chartData.length === 0)
      return { minVisits: 0, maxVisits: 0, avgVisits: 0 };

    const counts = chartData.map((d) => d.count);
    const min = Math.min(...counts);
    const max = Math.max(...counts);
    const avg = Math.round(counts.reduce((a, b) => a + b, 0) / counts.length);

    return { minVisits: min, maxVisits: max, avgVisits: avg };
  }, [chartData]);

  // Fetch Admins (Get Data Admin)
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const res = await getAdminList(1, search, filterType || "");

        // console.log ("data:", res);

        setAdmins(res.admins);
      } catch (err) {
        console.error("Gagal fetch admins:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, [search, filterType]);

  // Fetch portfolios (Get Data Portfolios)
  const fetchPortfolios = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllPortfoliosAdmin({ page: pagination.page });

      if (!res || !res.portfolios) {
        console.error("API tidak mengembalikan portfolios:", res);
        setPortfolios([]);
        return;
      }

      const mapped: PortfolioUI[] = res.portfolios.map((item: Portfolio) => {
        const imgSrc = item.mainImage
          ? `http://localhost:3000/portfolio/${encodeURIComponent(
              item.mainImage
            )}`
          : "/img/Logo.png";

        return {
          ...item,
          date: new Date(item.createdAt!).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          time: new Date(item.createdAt!).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          img: imgSrc,
          status: item.status?.toUpperCase() || "PUBLISHED",
          author: "Admin",
        };
      });

      setPortfolios(mapped);
      setPagination(res.pagination);
    } catch (err) {
      console.error("Failed to fetch portfolios", err);
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page]);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  // Delete portfolio
  const handleDeleteConfirm = async () => {
    if (!selectedPortfolioForDelete) return;

    try {
      await deletePortfolioAdmin(selectedPortfolioForDelete.id);
      setPortfolios((prev) =>
        prev.filter((p) => p.id !== selectedPortfolioForDelete.id)
      );
      fetchPortfolios();
      setShowDeleteModal(false);
      setSelectedPortfolioForDelete(null);
      setShowDeleteSuccessModal(true);
    } catch (error) {
      console.error("Failed to delete portfolio:", error);
      setErrorMessage("Failed to delete portfolio!");
    }
  };

  // Fetch Contact (Get Data Contact)
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await getAllContactsAdmin();
        setContacts(res.data.contacts ?? []);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
        setContacts([]);
      }
    };

    fetchContacts();
  }, []);

  // handle delete contact
  const handleDelete = async (id: string) => {
    try {
      await deleteContactAdmin(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setOpenMenu(null);
    } catch (err) {
      console.error("Failed to delete contact:", err);
    }
  };

  // Handle Klik Tutup Menu Jika Klik Diluar Menu
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
          <p className="text-gray-600 font-semibold">Welcome back, Admin</p>
        </header>

        {/* Top Section: Chart + Admins */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Card */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            {/* Header Stats */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-8">
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {minVisits}
                  </p>
                  <p className="text-sm text-gray-500">Min. Visits</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {avgVisits}
                  </p>
                  <p className="text-sm text-gray-500">Avg. Visits</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {maxVisits}
                  </p>
                  <p className="text-sm text-gray-500">Max. Visits</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            {loading ? (
              <p className="text-center text-gray-500 text-sm">
                Loading chart...
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorVisits"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, "dataMax + 1"]}
                    interval={0}
                    allowDecimals={false}
                    tickCount={6} // atur agar step naik 1 per 1
                  />
                  <Tooltip
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })
                    }
                    formatter={(value) => [`${value} visits`, "Count"]}
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorVisits)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Admins Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Admins</h2>

            {loading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : (
              <ul className="space-y-4">
                {admins.map((admin) => (
                  <li key={admin.id} className="flex items-center gap-3">
                    <img
                      src={"/img/profile.jpg"}
                      alt={admin.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-700">{admin.name}</p>
                      <p className="text-sm text-gray-500 capitalize">
                        {admin.role}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex justify-end">
              <Link
                to={`/panels-superadmins/list-admins`}
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

        {/* --- Section Portfolio List ---- */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            Portfolio{" "}
            <span className="text-gray-500">{filteredPortfolios.length}</span>
          </h2>

          {/* Search & Filter */}
          <div className="relative" ref={filterRef}>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
              <input
                type="text"
                placeholder="Search by Title, Client"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none text-sm w-40 md:w-64"
              />
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="ml-2 text-gray-600 hover:text-gray-900"
                type="button"
              >
                <FiFilter size={18} />
              </button>
            </div>

            {/* Filter Dropdown */}
            {showFilter && (
              <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg p-4 z-10">
                <div className="mb-3">
                  <p className="font-medium text-sm text-gray-700 mb-2">
                    Status
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="PUBLISHED"
                        checked={filterStatus === "PUBLISHED"}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />{" "}
                      Published
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="DRAFT"
                        checked={filterStatus === "DRAFT"}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />{" "}
                      Draft
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="ARCHIVED"
                        checked={filterStatus === "ARCHIVED"}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />{" "}
                      Archived
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value=""
                        checked={filterStatus === ""}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      />
                      All
                    </label>
                  </div>
                </div>
                {/* Clear Filter */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setFilterStatus(null);
                    }}
                    className="text-xs font-medium text-gray-500 hover:text-red-500 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* List Portfolio */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-blue-500 border-b">
                <th className="py-2 px-4 text-blue-500">Portfolio</th>
                <th className="py-2 px-4 text-blue-500">Client</th>
                <th className="py-2 px-4 text-blue-500">Status</th>
                <th className="py-2 px-4 text-blue-500">Date</th>
                <th className="py-2 px-4 text-blue-500">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                // Skeleton rows
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded" />
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="h-4 w-6 bg-gray-200 rounded ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredPortfolios.length > 0 ? (
                filteredPortfolios.map((portfolio) => (
                  <tr
                    key={portfolio.id}
                    className="border-gray-200 border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={portfolio.img}
                        alt={portfolio.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="font-medium text-gray-700">
                        {portfolio.title}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      {portfolio.client}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          portfolio.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : portfolio.status === "DRAFT"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {portfolio.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {portfolio.time}, {portfolio.date}
                    </td>

                    {/* tombol menu */}
                    <td
                      className="py-3 px-4 relative"
                      ref={(el) => {
                        menuRefs.current[portfolio.id] = el;
                      }}
                    >
                      <button
                        onClick={() =>
                          setOpenAction(
                            openAction === portfolio.id ? null : portfolio.id
                          )
                        }
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                      >
                        <HiOutlineDotsVertical size={18} />
                      </button>

                      {openAction === portfolio.id && (
                        <div className="absolute top-1/1 right-20 -translate-y-1/2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 animate-fadeIn">
                          <button
                            onClick={() => setSelectedPortfolio(portfolio)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition"
                          >
                            Lihat Detail
                          </button>
                          <button
                            onClick={() =>
                              navigate(
                                `/panels-admins/portfolios/edit/${portfolio.id}`
                              )
                            }
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition"
                          >
                            Edit
                          </button>
                          <div className="border-t border-gray-100"></div>
                          <button
                            onClick={() => {
                              setSelectedPortfolioForDelete(portfolio);
                              setShowDeleteModal(true);
                              setOpenAction(null);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition"
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Tidak ada portfolio ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Portfolios */}
          {!loading && (
            <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
              <span>
                Showing {filteredPortfolios.length} of {portfolios.length}{" "}
                entries
              </span>
              <div className="flex gap-2 items-center">
                <button className="px-2 py-1">&lt; Previous</button>
                <button className="px-2 py-1">1</button>
                <button className="px-2 py-1">2</button>
                <button className="px-2 py-1">3</button>
                <button className="px-2 py-1">Next &gt;</button>
              </div>
            </div>
          )}
        </div>
        {/* ---- End Section Portfolios ----*/}

        {/* ---- Section List Message Contact Table ----- */}
        <section className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6">
          {/* Header + Filter */}
          <div className="flex items-center justify-between mb-6 relative">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                List Message
              </h2>
              <span className="text-sm text-gray-500">
                {filteredContact.length}
              </span>
            </div>

            {/* Filter */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:text-blue-600 hover:border-blue-400 transition"
              >
                <FiFilter size={16} />
                Filter
              </button>

              {showFilter && (
                <div className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg p-4 z-20 animate-scaleIn">
                  <p className="font-semibold text-sm text-gray-700 mb-3">
                    Filter by Type
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {Object.entries(TYPE_LABELS).map(([value, label]) => (
                      <label
                        key={value}
                        className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-blue-50 transition"
                      >
                        <input
                          type="radio"
                          name="type"
                          checked={filterType === value}
                          onChange={() => setFilterType(value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* List Contact Message */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="border-b text-sm text-blue-400">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentContacts.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-4 text-gray-600 font-bold">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.email}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {TYPE_LABELS[item.type] ?? item.type}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.subject}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.message.length > 100
                        ? item.message.slice(0, 70) + "..."
                        : item.message}
                    </td>
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
                          <button
                            onClick={() => setSelectedContactId(item.id)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition"
                          >
                            Lihat Detail
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition"
                          >
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

          {/* Pagination Contact */}
          <div className="flex justify-end mt-6">
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition ${
                      currentPage === num
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    {num}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                Next →
              </button>
            </div>
          </div>
        </section>
        {/* ----- End Section Contact ------ */}

        {/* Modal Hapus Portfolio */}
        {showDeleteModal && selectedPortfolioForDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Delete Portfolio
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "
                <span className="font-medium">
                  {selectedPortfolioForDelete.title}
                </span>
                "?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {showDeleteSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl shadow-xl  w-full max-w-md p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Success!
              </h3>
              <p className="mb-6">Portfolio successfully delete.</p>
              <button
                onClick={() => setShowDeleteSuccessModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal Detail Portfolio */}
        <PortfolioModal
          portfolio={selectedPortfolio}
          onClose={() => setSelectedPortfolio(null)}
          galleryRef={galleryRef}
        />

        <ContactDetailModal
          onClose={() => setSelectedContactId(null)}
          contactId={selectedContactId}
        />
      </main>
    </NavBarCMS>
  );
}
