import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export default function About() {
  return (
    <div className="font-default">
      {/* Navbar */}
      <header>
        <NavBar textColor="text-secondary" />
      </header>

      {/* Konten Tentang Kami */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-16 pb-4 max-w-7xl mx-auto">
        {/* Image */}
        <img
          src="/img/Logo.png"
          alt="Pixelatee logo"
          className="w-28 h-28 mb-6 mt-12"
        />

        {/* Our About */}
        <div className="relative flex flex-col justify-center items-center py-4 gap-8 px-8 md:px-2 bg-gradient-to-b from-white via-gray-50 to-white">
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
          <div className="mt-6 grid md:grid-cols-3 gap-6 w-full max-w-5xl">
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
      </section>

      {/* Visi Misi */}
      <section className="px-2 pt-12 pb-20 max-w-6xl mx-auto text-center relative">
        {/* Decorative gradient circle */}
        <div className="absolute top-10 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-bold text-tertiary tracking-wide relative">
          Visi & Misi
          <span className="block mt-2 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary"></span>
        </h3>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10 py-10 px-10 md:px-2">
          {/* Visi */}
          <div className="group p-8 bg-white shadow-md rounded-2xl border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col items-center">
              <h4 className="text-2xl font-semibold text-blue-400 mb-4">
                Visi
              </h4>
            </div>
            <p className="text-gray-600 leading-relaxed text-justify md:text-center">
              Menjadi pelopor dalam menciptakan solusi digital dan teknologi
              inovatif yang memberikan dampak positif dan berkelanjutan bagi
              bisnis dan masyarakat.
            </p>
          </div>

          {/* Misi */}
          <div className="group p-8 bg-white shadow-md rounded-2xl border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col items-center">
              {/* Icon */}
              <h4 className="text-2xl font-semibold text-secondary mb-4">
                Misi
              </h4>
            </div>
            <ul className="text-gray-600 space-y-3 text-left list-disc list-inside text-justify">
              <li>Menghadirkan layanan kreatif berbasis teknologi.</li>
              <li>Memberdayakan kolaborasi tim yang solid dan profesional.</li>
              <li>Mendorong inovasi berkelanjutan untuk mendukung klien.</li>
              <li>
                Berkomitmen pada kualitas, kepercayaan, dan keberlanjutan.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
