import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { Link, useParams } from "react-router";
import { HiArrowLeft } from "react-icons/hi";
import DOMPurify from "dompurify";
import { getPortfolioDetail } from "../../api/portfolio.api";
import type { Portfolio } from "../../api/portfolio.api";

// Dummy gallery data
const dummyGallery = {
  gallery: [
    "/img/photo1.jpeg",
    "/img/photo2.jpeg",
    "/img/photo3.jpg",
    "/img/photo3.jpg",
    "/img/photo3.jpg",
  ],
};


export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        const data = await getPortfolioDetail(id);
        setProject(data);
      } catch {
        setError("Failed to load project detail");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <>
        <NavBar />
        <main className="px-8 md:px-20 py-28 font-default text-center">
          <p className="text-gray-500">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <NavBar />
        <main className="px-8 md:px-20 py-28 font-default text-center">
          <p className="text-red-500">{error || "Project not found."}</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="px-12 md:px-20 py-24 font-default">
        {/* Back */}
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800 font-medium text-lg group"
        >
          <HiArrowLeft className="text-lg transform group-hover:-translate-x-1 transition-transform duration-200" />
          Back
        </Link>

        {/* Header + Thumbnail */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
              {project.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Implemented for{" "}
              {/* <span className="font-semibold">{project.type}</span> */}
            </p>
            <p className="text-gray-600 mt-4 max-w-lg text-justify"
               dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(project.description),}}></p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={project.mainImage
                ? `http://localhost:3000/portfolio/${project.mainImage}`
                : "/img/Logo.png"
              }
              alt={project.title}
              loading="lazy"
              className="w-full h-60 md:h-72 object-cover"
            />
          </div>
        </div>

        {/* Gallery */}
        {dummyGallery.gallery && dummyGallery.gallery.length > 0 && (
          <div className="mb-12 relative">
            <h2 className="text-lg font-semibold text-blue-500 mb-4">
              Gallery
            </h2>
            <div className="relative">
              {/* Fade kiri */}
              <div className="pointer-events-none absolute left-0 top-0 h-full md:w-35 w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
              {/* Fade kanan */}
              <div className="pointer-events-none absolute right-0 top-0 h-full md:w-35 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>
              {/* Scrollable gallery */}
              <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth">
                {dummyGallery.gallery?.map((g: string, i: number) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
                  >
                    <img
                      src={g}
                      alt={`Gallery ${i + 1}`}
                      loading="lazy"
                      className="w-full h-50 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Question Or Ideas? <br /> Get in Touch{" "}
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
