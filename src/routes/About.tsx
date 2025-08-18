import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export default function About() {
  return (
    <div className="font-default">
      {/* Navbar */}
      <header>
        <NavBar backgroundColor="bg-primary" textColor="text-secondary" />
      </header>

      {/* Konten Tentang Kami */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16 max-w-5xl mx-auto">
        {/* Image */}
        <img
          src="/img/Logo.png"
          alt="Pixelatee logo"
          className="w-28 h-28 mb-6 mt-12"
        />

        {/* Judul */}
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          Tentang Kami
        </h2>

        {/* Divider */}
        <div className="w-12 h-0.5 bg-blue-200 mb-6"></div>

        {/* Deskripsi */}
        <p className="text-gray-500 leading-relaxed mb-4 text-justify lg:text-center">
          One morning, when Gregor Samsa woke from troubled dreams, he found
          himself transformed in his bed into a horrible vermin. He lay on his
          armour-like back, and if he lifted his head a little he could see his
          brown belly, slightly domed and divided by arches into stiff sections.
          The bedding was hardly able to cover it and seemed ready to slide off
          any moment. His many legs, pitifully thin compared with the size of
          the rest of him, waved about helplessly as he looked.
        </p>
        <p className="text-gray-500 leading-relaxed text-justify lg:text-center">
          Ut et urna auctor, placerat nisi sit amet, dignissim sapien. Sed
          tortor erat, consectetur in libero vel, condimentum malesuada purus.
          Fusce nulla purus, volutpat aliquet semper et, congue ut nibh. Nam ac
          orci ut nibh bibendum efficitur id sit amet ipsum.
        </p>
      </section>

      {/* Milestone */}
      <section className="flex flex-col items-center justify-center text-center mb-6 px-6 py-4 max-w-5xl mx-auto">
        {/* Judul */}
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">Milestone</h2>

        {/* Divider */}
        <div className="w-12 h-0.5 bg-blue-200 mb-6"></div>

        {/* Deskripsi */}
        <p className="text-gray-500 leading-relaxed mb-4 text-justify lg:text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet
          condimentum luctus. Etiam bibendum nisi sit amet convallis porta.
          Suspendisse potenti. Praesent nec dignissim neque, in sodales nulla.
          Phasellus a diam eget diam porta efficitur eu id mauris. Fusce nulla
          purus, volutpat aliquet semper et, congue ut nibh. Nam ac orci ut nibh
          bibendum efficitur id sit amet ipsum.
        </p>

        {/* Image */}
        <img
          src=""
          alt=""
          className="border bg-gray-300 w-full h-45 max-w-3xl mb-4"
        />

        <p className="text-gray-500 leading-relaxed text-justify lg:text-center">
          Ut et urna auctor, placerat nisi sit amet, dignissim sapien. Sed
          tortor erat, consectetur in libero vel, condimentum malesuada purus.
          Fusce nulla purus, volutpat aliquet semper et, congue ut nibh. Nam ac
          orci ut nibh bibendum efficitur id sit amet ipsum.
        </p>
      </section>
      <Footer />
    </div>
  );
}
