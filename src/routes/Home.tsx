import { NavBar } from "../components/NavBar";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { PortfolioCard, ServiceCard } from "../components/Card";
import { ClientSlider } from "../components/ClientSlider";
import { HiArrowRight } from "react-icons/hi";
import { Footer } from "../components/Footer";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

// Dummy data blog
const blogs = [
  {
    id: 1,
    title: "Revolusi Pengalaman Digital",
    author: "Lorem",
    date: "25 Agustus, 2025",
    excerpt:
      "Teknologi informasi menjadi tulang punggung bisnis modern, memungkinkan mereka beroperasi secara efisien dan efektif.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    slug: "revolusi-pengalaman-digital",
  },
  {
    id: 2,
    title: "Mempersiapkan Bisnis Masa Depan",
    author: "Lorem",
    date: "25 Agustus, 2025",
    excerpt:
      "Mencakup penggunaan komputer, jaringan, dan teknologi digital lain untuk menyimpan, mengambil, serta mengirim data.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    slug: "mempersiapkan-bisnis-masa-depan",
  },
  {
    id: 3,
    title: "Memimpin Revolusi Digital",
    author: "Lorem",
    date: "25 Agustus, 2025",
    excerpt:
      "Teknologi modern memungkinkan bisnis berkembang pesat, beradaptasi, dan tetap kompetitif di era digital.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    slug: "memimpin-revolusi-digital",
  },
];

export default function Home() {
  return (
    <>
      <NavBar textColor="text-secondary" />
      <header className="relative font-default overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[42rem] md:h-[38rem] bg-gradient-to-r from-primary via-primary/95 to-primary/90">
          {/* Left Side Content */}
          <div className="flex justify-center items-start flex-col gap-6 px-8 md:px-16 z-10">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl md:text-5xl font-bold text-[#06B6D4] leading-tight mt-18 md:mt-0">
                <TypeAnimation
                  sequence={[
                    "Technology That Inspires",
                    1500,
                    "Creative Solutions for the Future",
                    1500,
                    "Innovation Made Simple",
                    1500,
                  ]}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                />
              </h1>
              <p className="text-base md:text-lg text-[#0F172A] max-w-md">
                Solusi digital modern untuk membangun masa depan yang lebih
                cerdas dan efisien.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Link
                to={"#"}
                className="px-6 py-3 rounded-full bg-secondary text-white font-semibold hover:bg-tertiary transition-all shadow-md"
              >
                Mulai Sekarang
              </Link>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="relative flex items-center justify-center">
            {/* Background Circle */}
            <div className="absolute w-[28rem] h-[28rem] bg-gradient-to-tr from-secondary/40 via-tertiary/30 to-primary/30 rounded-full blur-3xl opacity-70 animate-pulse"></div>

            {/* Main Illustration */}
            <img
              className="relative w-[16rem] md:w-[20rem] drop-shadow-2xl mt-6 md:mt-6"
              src="/img/Pixel.png"
              alt="Pixelatee Logomark"
            />
          </div>
        </div>

        {/* Client Slider */}
        <ClientSlider />
      </header>

      <main className="font-default py-4 overflow-hidden">
        {/* Our About */}
        <div className="relative flex flex-col justify-center items-center py-4 gap-8 px-8 md:px-0 bg-gradient-to-b from-white via-gray-50 to-white">
          {/* Decorative background blur */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -right-10 w-60 h-60 bg-tertiary/20 rounded-full blur-3xl"></div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-bold text-tertiary tracking-wide relative">
            Tentang Kami
            <span className="block mt-2 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary"></span>
          </h3>

          {/* Content */}
          <p className="max-w-3xl text-center text-quaternary leading-8 text-lg">
            Kami adalah tim kreatif yang berfokus pada{" "}
            <span className="text-blue-300 font-semibold">desain digital</span>{" "}
            dan{" "}
            <span className="text-secondary font-semibold">
              pengembangan teknologi
            </span>
            . Dengan pengalaman dalam membangun solusi yang inovatif, kami
            percaya setiap ide dapat diwujudkan menjadi sesuatu yang berdampak
            besar.
          </p>

          {/* Highlight box */}
          <div className="mt-6 grid md:grid-cols-3 gap-6 w-full max-w-6xl px-2 md:px-10">
            <div className="p-6 bg-white border border-[#06B6D4] rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-blue-300 mb-2">
                Inovatif
              </h4>
              <p className="text-gray-600 text-sm">
                Menciptakan ide-ide baru dengan pendekatan modern dan kreatif.
              </p>
            </div>
            <div className="p-6 bg-white border border-[#06B6D4] rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-secondary mb-2">
                Kolaboratif
              </h4>
              <p className="text-gray-600 text-sm">
                Kami bekerja sama sebagai tim untuk memberikan hasil terbaik.
              </p>
            </div>
            <div className="p-6 bg-white border border-[#06B6D4] rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-tertiary mb-2">
                Berkelanjutan
              </h4>
              <p className="text-gray-600 text-sm">
                Fokus pada solusi jangka panjang yang mendukung perkembangan
                teknologi.
              </p>
            </div>
          </div>
        </div>
        {/* end section about */}

        {/* Our Services */}
        <div className="flex flex-col justify-center items-center py-14 gap-10 px-8 bg-gray-50">
          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-bold text-tertiary tracking-wide relative">
            Layanan Terbaik Kami
            <span className="block mt-2 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary"></span>
          </h3>

          <p className="text-center text-quaternary max-w-3xl leading-8 text-lg">
            Layanan terbaik kami hadir dengan standar kualitas tinggi,
            mengutamakan kepercayaan dan kepuasan setiap mitra.
          </p>
          <ServiceCard />
        </div>
        {/* end section layanan */}

        {/* Portfolios Section */}
        <div className="flex flex-col justify-center items-center py-6 gap-14 px-12 md:px-20 bg-gradient-to-b from-gray-50 to-white">
          {/* Heading */}
          <div className="max-w-3xl text-center flex flex-col gap-6">
            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold text-tertiary tracking-wide relative">
              PortoFolio Kami
              <span className="block mt-2 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary"></span>
            </h3>
            <p className="text-quaternary leading-8 text-lg md:text-lg">
              Kami telah dipercaya berbagai klien untuk mengembangkan solusi IT
              yang <span className="font-semibold text-blue-300">inovatif</span>
              , <span className="font-semibold text-secondary">modern</span>,
              dan{" "}
              <span className="font-semibold text-blue-900">
                berdampak nyata
              </span>
              . Berikut sebagian karya terbaik kami.
            </p>
          </div>

          {/* Grid Portfolio */}
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <PortfolioCard
              title="Transformasi Digital Enterprise"
              image="bg-[url(/img/pexels-rabbit-wang-25128698-11768811.jpg)]"
            />
            <PortfolioCard
              title="Jaringan Cerdas & Infrastruktur"
              image="bg-[url(/img/pexels-pixabay-264636.jpg)]"
            />
            <PortfolioCard
              title="Aplikasi Mobile Modern"
              image="bg-[url(/img/pexels-chanaka-906494.jpg)]"
            />
          </div>

          {/* CTA */}
          <Link
            to={"#"}
            className="mt-2 px-4 py-2 rounded-2xl border border-[#06b6d4] text-[#06b6d4] font-semibold flex items-center gap-3 hover:bg-tertiary hover:text-white transition-all shadow-xl hover:shadow-tertiary/40"
          >
            Lihat Selengkapnya <HiArrowRight className="text-lg" />
          </Link>
        </div>
        {/* end section */}

        {/* Section Contact */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-12 py-8 md:px-20">
          {/* Left Side - Form */}
          <div className="flex flex-col justify-center">
            {/* Title */}
            <h3 className="text-3xl md:text-2xl font-bold text-tertiary tracking-wide relative">
              Wujudkan{" "}
              <span className="font-semibold text-secondary">Masa Depan</span>{" "}
              Bersama Teknologi
              <span className="block mt-2 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary items-start"></span>
            </h3>

            {/* Form Input */}
            <form className="mt-8 space-y-5">
              {/* Row 1 Nama & Email*/}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full rounded-full border border-[#06b6d4] px-4 py-3 focus:ring-2 focus:ring-blue-200 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="w-full rounded-full border border-[#06b6d4] px-4 py-3 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>

              {/* Row 2 Nomor Telepon dan Bidang*/}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nomor Telepon"
                  className="w-full rounded-full border border-[#06b6d4] px-4 py-3 focus:ring-2 focus:ring-blue-200 outline-none"
                />

                {/* form pilih bidang */}
                <select className="w-full rounded-full border border-[#06b6d4] px-4 py-3 focus:ring-2 focus:ring-blue-200 outline-none">
                  <option disabled>Pilih Bidang</option>
                  <option>Website Development</option>
                  <option>Mobile App</option>
                  <option>UI/UX Design</option>
                  <option>Digital Marketing</option>
                </select>
              </div>

              {/* Message */}
              <textarea
                placeholder="Tulis pesan Anda di sini..."
                className="w-full rounded-xl border border-[#06b6d4] px-4 py-3 focus:ring-2 focus:ring-blue-200 outline-none"
              ></textarea>

              <button
                type="submit"
                className="px-6 py-3 mt-2 rounded-full bg-[#06b6d4] text-white font-semibold hover:bg-blue-700 transition-all"
              >
                Kirim Sekarang
              </button>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Team Work"
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
        {/* End Section Contact */}

        {/* Blog Section */}
        <section className="py-16 bg-[#f7f9ff]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {/* Heading */}
            <div className="text-center mb-12">
              {/* Title */}
              <h3 className="text-3xl md:text-2xl font-bold text-tertiary tracking-wide relative">
                Blog & Berita <br></br>
                <span className="font-semibold text-blue-300">
                  Mengubah Tantangan
                </span>{" "}
                Menjadi {" "} <span className="font-semibold text-secondary">Peluang</span>  
                <span className="block mt-2 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary items-start"></span>
              </h3>
            </div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-6 flex flex-col gap-3">
                    {/* Meta */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <FaUser className="text-blue-500" /> {blog.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" /> {blog.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Button ke detail blog */}
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="mt-4 px-5 py-2 w-fit rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition text-sm font-medium"
                    >
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Link ke semua blog */}
            <div className="mt-10 text-center">
              <Link
                to="/blog"
                className="mt-2 px-4 py-2 rounded-2xl border border-[#06b6d4] text-[#06b6d4] font-semibold items-center hover:bg-tertiary hover:text-white transition-all shadow-xl hover:shadow-tertiary/40"
              >
                Lihat Semua Blog
              </Link>
            </div>
          </div>
        </section>
        {/* End section Blog */}
      </main>
      <Footer />
    </>
  );
}
