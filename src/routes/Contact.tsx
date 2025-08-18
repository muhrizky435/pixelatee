import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { ContactForm } from "../components/Form";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="font-default">
      {/* Navbar */}
      <header>
        <NavBar backgroundColor="bg-primary" textColor="text-secondary" />
      </header>

      {/* Konten Utama */}
      <main>
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row w-full h-auto lg:h-[500px]">
            {/* Teks Kiri */}
            <div className="lg:w-2/3 w-full bg-blue-100 flex flex-col justify-center px-6 lg:px-16 py-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-blue-700 mb-4">
                    Hubungi Kami Untuk Solusi Digital Terbaik
                </h1>
                <p className="text-lg text-blue-500 leading-relaxed">
                    Konsultasikan ide Anda dan wujudkan bersama tim Pixelatee.
                </p>
            </div>
          {/* Gambar Kanan */}
          <div className="lg:w-1/3 w-full h-64 lg:h-full">
            <img
              src=""
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </section>
        <section className="flex flex-col lg:flex-row w-full h-auto lg:h-[300px] text-center justify-center">
            <div className="w-full bg-senary flex flex-col px-6 lg:px-16 py-8">
                {/* Judul */}
                <h2 className="text-2xl font-semibold text-white mb-6">
                    Hubungi Kami
                </h2>

                {/* Divider */}
                <div className="w-12 h-0.5 bg-white mb-6 mx-auto"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white mt-15">
                    {/* Alamat */}
                    <div className="flex flex-col items-center">
                        <FaMapMarkerAlt className="text-2xl mb-2" />
                        <p>Jl. XXXX</p>
                    </div>
                    {/* Email */}
                    <div className="flex flex-col items-center">
                        <FaEnvelope className="text-2xl mb-2" />
                        <p>pixelatee@pixelatee.com</p>
                    </div>

                    {/* Telepon */}
                    <div className="flex flex-col items-center">
                        <FaPhoneAlt className="text-2xl mb-2" />
                        <p>0821-XXXX-3213</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="flex flex-col items-center justify-center text-center px-6 py-16 max-w-5xl mx-auto">
          {/* Judul */}
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">
            Form Kontak
          </h2>
          <ContactForm />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
