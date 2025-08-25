import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { ServiceCard } from "../components/Card";
import { Lightbulb, Users, Rocket } from "lucide-react";

export default function Service() {
  return (
    <div className="font-default">
      {/* Navbar */}
      <header>
        <NavBar textColor="text-secondary" />
      </header>

      {/* Konten Utama */}
      <main>
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row w-full h-auto lg:h-[550px] relative overflow-hidden">
          {/* Gambar Kiri */}
          <div className="lg:w-1/3 w-full h-72 lg:h-full relative">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="Creative solutions"
              className="w-full h-full object-cover rounded-br-[60px] shadow-xl"
            />
            {/* Overlay Accent */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-br-[60px]"></div>
          </div>

          {/* Teks Kanan */}
          <div className="lg:w-2/3 w-full bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col justify-center px-6 lg:px-16 py-10 relative">
            <h1 className="text-3xl lg:text-5xl font-extrabold text-blue-700 mb-6 leading-snug tracking-tight">
              Solusi Kreatif & Teknologi <br /> dalam Satu Tempat
            </h1>
            <p className="text-lg text-blue-600 leading-relaxed max-w-2xl">
              Kami membantu bisnis Anda tumbuh melalui strategi kreatif,
              inovasi teknologi, dan eksekusi yang tepat sasaran. Semua
              dirancang untuk memberikan nilai nyata dan berkelanjutan.
            </p>
            {/* Accent Decorative Shape */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-blue-300 to-blue-100 rounded-full blur-3xl opacity-40"></div>
          </div>
        </section>

        {/* Mengapa Memilih Kami */}
        <section className="px-6 py-20 max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-tertiary relative">
            Mengapa Harus Memilih Kami?
            <span className="block mt-3 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary"></span>
          </h3>

          {/* Grid dengan Icon */}
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <Lightbulb className="w-12 h-12 text-yellow-500 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-semibold mb-3 relative z-10">Inovasi Berkelanjutan</h4>
              <p className="text-gray-600 leading-relaxed relative z-10">
                Kami selalu menghadirkan ide segar dan solusi kreatif untuk
                membantu bisnis Anda tetap relevan di era digital.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <Users className="w-12 h-12 text-blue-500 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-semibold mb-3 relative z-10">Kolaborasi Tim</h4>
              <p className="text-gray-600 leading-relaxed relative z-10">
                Tim kami bekerja dengan pendekatan kolaboratif untuk memahami
                kebutuhan unik setiap klien.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <Rocket className="w-12 h-12 text-green-500 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-semibold mb-3 relative z-10">Pertumbuhan Bisnis</h4>
              <p className="text-gray-600 leading-relaxed relative z-10">
                Fokus kami adalah membantu Anda mempercepat pertumbuhan melalui
                strategi dan teknologi yang efektif.
              </p>
            </div>
          </div>
        </section>

        {/* Layanan */}
        <section className="flex flex-col justify-center items-center pt-2 pb-20 gap-10 px-8 bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden">
          <h3 className="text-3xl md:text-4xl font-bold text-tertiary text-center relative z-10">
            Layanan Terbaik Kami
            <span className="block mt-3 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary"></span>
          </h3>

          <p className="text-center text-gray-600 max-w-3xl leading-8 text-lg relative z-10">
            Kami menghadirkan layanan dengan standar kualitas tinggi, mengutamakan
            kepercayaan, kepuasan, dan keberlanjutan mitra bisnis kami.
          </p>

          {/* Card Layanan */}
          <div className="mt-6 w-full relative z-10">
            <ServiceCard />
          </div>

          {/* Decorative Gradient Shapes */}
          <div className="absolute top-20 left-0 w-56 h-56 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-tertiary/20 to-primary/20 rounded-full blur-3xl opacity-40"></div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
