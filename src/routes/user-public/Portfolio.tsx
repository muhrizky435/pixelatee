// portfolio.tsx
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi";
import { getAllPortfolios } from "../../api/portfolio.api";
import type { Portfolio } from "../../api/portfolio.api";

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Get Data Portfolio
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const data = await getAllPortfolios();
        console.log("data:", data);
        setPortfolios(data);
      } catch {
        setError("Failed to load portfolios");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  if (loading) {
    return (
      <>
        <NavBar />
        <main className="px-12 md:px-20 py-28 font-default text-center">
          <p className="text-gray-500">Loading portfolios...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <main className="px-12 md:px-20 py-28 font-default text-center">
          <p className="text-red-500">{error}</p>
        </main>
        <Footer />
      </>
    );
  }

  // Ambil data pertama sebagai main Project
  const mainProject = portfolios.length > 0 ? portfolios[0] : null;
  const others = portfolios.slice(1);

  // Helper truncate description
  const truncate = (text: string, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      <NavBar />
      <main className="px-12 md:px-20 py-28 relative font-default overflow-hidden">
        {/* Background effect */}
        <div className="absolute top-10 left-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-60 right-0 w-74 h-74 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-74 h-74 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-0 left-2/2 -translate-x-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

        {/* Header */}
        <div className="text-left mb-12 max-w-2xl relative leading-8">
          <h1 className="text-4xl font-bold leading-snug">
            Celebrating <span className="text-blue-400">Creativity </span>
            Through{" "}
            <span className="text-blue-500">
              Inspiring Projects.
              <br />
            </span>
            <span className="text-blue-400">Solution</span> We Delivered.
          </h1>
          <p className="text-gray-400 mt-3 text-base max-w-2xl mx-auto text-left">
            We’d love to hear from you and explore how we can turn your thoughts
            into something real.
          </p>
        </div>

        {/* mainProject project */}
        {mainProject && (
          <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden bg-gray-100 relative z-10">
            <img
              src={
                mainProject.mainImage
                  ? `http://localhost:3000/portfolio/${mainProject.mainImage}`
                  : "/img/Logo.png"
              }
              alt={mainProject.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2 text-blue-500">
                {mainProject.title}
              </h3>
              <p className="text-sm text-gray-600">
                {truncate(stripHtml(mainProject.description), 120)}
              </p>
              <Link
                to={`/portfolio/${mainProject.id}`}
                className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm group"
              >
                <span>Get a Direction</span>
                <HiArrowRight className="text-lg transform group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        )}

        {/* Other projects */}
        <div className="grid md:grid-cols-3 gap-6 mt-10 relative z-10 transition-all duration-500">
          {(showAll ? others : others.slice(0, 6)).map((p, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-gray-100 hover:shadow-lg transition"
            >
              <img
                src={p.mainImage
                  ? `http://localhost:3000/portfolio/${p.mainImage}`
                  : "/img/Logo.png"
                }
                alt={p.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 text-blue-500">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {truncate(stripHtml(p.description), 80)}
                </p>
                <Link
                  to={`/portfolio/${p.id}`}
                  className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm group"
                >
                  <span>Get a Direction</span>
                  <HiArrowRight className="text-lg transform group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle button */}
        {others.length > 6 && (
          <div className="text-center mt-8">
            <button
              className="px-6 py-2 border border-blue-500 text-blue-500 font-medium rounded-full shadow-md hover:bg-blue-600 hover:text-white transition"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "See All Projects"}
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Interested in Working with Us? <br /> Get in Touch{" "}
            <Link to="/contact" className="text-blue-600 font-bold">
              Here!
            </Link>
          </h2>
        </div>
      </main>
      <Footer />
    </>
  );
}
