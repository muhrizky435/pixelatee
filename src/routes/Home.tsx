import { NavBar } from "../components/NavBar";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router";
import { PortfolioCard, ServiceCard } from "../components/Card";
import { ClientSlider } from "../components/ClientSlider";
import { HiArrowRight } from "react-icons/hi";
import { Footer } from "../components/Footer";

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

      {/* */}
      <main className="font-default py-4 overflow-hidden">
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
      </main>
      <Footer />
    </>
  );
}
