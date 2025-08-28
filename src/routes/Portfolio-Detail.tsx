import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { Link, useParams } from "react-router";
import { HiArrowLeft } from "react-icons/hi";

export default function PortfolioDetail() {
  const { id } = useParams();

  const portofolio = [
    {
      id: 1,
      type: "BrightWave Media",
      title: "NovaLink Shortener",
      desc: "A smart link shortening platform with real-time analytics and custom branding options.",
      img: "https://cre8ive.co.nz/wp-content/uploads/2018/04/url-shortener.png",
      gallery: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
    },
    {
      id: 2,
      type: "Horizon Tech",
      title: "SkyHost Cloud",
      desc: "Cloud hosting with enterprise-grade security and 99.9% uptime guarantee.",
      img: "https://filearchive.cnews.ru/img/articles/2020/09/09/adobestock1588800871024x440_300x200.jpg",
      gallery: [],
    },
    {
      id: 3,
      type: "Urban Mart",
      title: "CoreCMSr",
      desc: "A flexible content management system designed for startups and enterprises.",
      img: "https://asset.kompas.com/crops/AZAM5yIWvooWd73IqxwWTjO_RIM=/204x0:1299x730/375x240/data/photo/2022/09/09/631aebe1bd4be.png",
      gallery: [],
    },
    {
      id: 4,
      type: "Urban Mart",
      title: "ShopMaster E-Commerce",
      desc: "Complete e-commerce solution with integrated payment gateways and inventory tracking.",
      img: "https://prabumulihpos.disway.id/upload/ed4e3fb251ee6cd35ce7030c49673843.jpg",
    },
    {
      id: 5,
      type: "Summit Corp",
      title: "PeopleFlow HRIS",
      desc: "A modern HR system for attendance, payroll automation, and employee performance tra...",
      img: "https://www.emailaudience.com/wp-content/uploads/diagram-explanation-of-HRIS-vs-HRMS-vs-HCM.png",
    },
    {
      id: 6,
      type: "Summit Corp",
      title: "EventSphere",
      desc: "Digital event management platform with ticketing, registration, and live-stream integra...",
      img: "https://iconiclife.com/wp-content/uploads/2023/10/RF2_1965-500x436.jpg",
    },
    {
      id: 7,
      type: "Mobile Application",
      title: "Learnify LMS",
      desc: "Interactive learning management system with video courses, quizzes, and certifications.",
      img: "https://idwebhost.com/blog/wp-content/uploads/2024/11/lms-a.png",
    },
  ];

  const project = portofolio.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <>
        <NavBar />
        <main className="px-8 md:px-20 py-28 font-default">
          <p className="text-center text-gray-500">Project not found.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="px-8 md:px-20 py-28 font-default">
        {/* Back */}
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          <HiArrowLeft className="text-lg" />
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
              <span className="font-semibold">{project.type}</span>
            </p>
            <p className="text-gray-600 mt-4 max-w-lg">{project.desc}</p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-60 md:h-72 object-cover"
            />
          </div>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-12 relative">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Gallery
            </h2>

            {/* Wrapper scroll */}
            <div className="relative">
              {/* Fade kiri */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
              {/* Fade kanan */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10"></div>

              {/* Gallery scrollable */}
              <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth">
                {project.gallery.map((g, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
                  >
                    <img
                      src={g}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Questions or Ideas?
          </h2>
          <p className="text-lg">
            Get in Touch{" "}
            <Link
              to="/contact"
              className="text-blue-600 font-bold hover:underline"
            >
              Here!
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
