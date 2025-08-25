import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { User, Calendar } from "lucide-react"; // pake lucide-react untuk ikon

export default function Blog() {
  const [category, setCategory] = useState("All");

  // Dummy data
  const blogs = [
    {
      id: 1,
      title: "Revolution Digital Experiences",
      category: "Teknologi",
      desc: "Information Technology the backbone of modern businesses, enabling them to operate efficiently and effectively.",
      image: "/img/pexels-luis-gomes-166706-546819.jpg",
      author: "Br Simmons",
      date: "26 Agustus, 2025",
    },
    {
      id: 2,
      title: "Future-Proofing Your Business",
      category: "Inovasi",
      desc: "It encompasses the use of computers, networks, and other digital technologies to store, retrieve, and transmit data.",
      image: "/img/pexels-luis-gomes-166706-546819.jpg",
      author: "Br Simmons",
      date: "26 Juli, 2025",
    },
    {
      id: 3,
      title: "Leading the Digital Revolution",
      category: "Gadget",
      desc: "Information Technology the backbone of modern businesses, enabling them to operate efficiently and effectively.",
      image: "/img/pexels-luis-gomes-166706-546819.jpg",
      author: "Br Simmons",
      date: "26 Agustus, 2025",
    },
  ];

  // Filter berdasarkan kategori
  const filteredBlogs =
    category === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === category);

  return (
    <div className="font-default bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header>
        <NavBar textColor="text-secondary" />
      </header>

      {/* Heading Section */}
      <section className="flex flex-col items-center text-center px-8 py-20 max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center pt-8">
          {/* Title */}
          <h3 className="text-3xl md:text-2xl font-bold text-tertiary tracking-wide relative">
            Blog & Berita <br></br>
            <span className="font-semibold text-blue-300">
              Mengubah Tantangan
            </span>{" "}
            Menjadi{" "}
            <span className="font-semibold text-secondary">Peluang</span>
            <span className="block mt-2 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary items-start"></span>
          </h3>
        </div>
      </section>

      {/* Dropdown Filter */}
      <div className="flex justify-center mb-12">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-5 py-3 rounded-full shadow-md border border-gray-200 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
        >
          <option value="All">Semua Kategori</option>
          <option value="Teknologi">Teknologi</option>
          <option value="Inovasi">Inovasi</option>
          <option value="Gadget">Gadget</option>
        </select>
      </div>

      {/* Blog Cards */}
      <section className="px-12 md:px-16 pb-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 text-left">
                {/* Author & Date */}
                <div className="flex items-center text-gray-400 text-sm mb-3 space-x-6">
                  <span className="flex items-center gap-1 text-[#06b6d4]">
                    <User size={16} /> {blog.author}
                  </span>
                  <span className="flex items-center gap-1 text-[#06b6d4] ">
                    <Calendar size={16} /> {blog.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg text-gray-800 mb-3 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                  {blog.desc}
                </p>

                {/* Read More Button */}
                <a
                  href="#"
                  className="inline-block px-5 py-2 rounded-full border border-blue-600 text-blue-600 font-medium text-sm hover:bg-blue-600 hover:text-white transition"
                >
                  Baca Selengkapnya →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
