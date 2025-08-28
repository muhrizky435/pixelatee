import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi";

export default function PortoFolio() {
  const portofolio = [
    {
      id: 1,
      type: "Website Application",
      title: "NovaLink Shortener",
      desc: "A smart link shortening platform with real-time analytics and custom branding options.",
      img: "https://cre8ive.co.nz/wp-content/uploads/2018/04/url-shortener.png",
      featured: true,
    },
    {
      id: 2,
      type: "Horizon Tech",
      title: "SkyHost Cloud",
      desc: "Cloud hosting with enterprise-grade security and 99.9% uptime guarantee.",
      img: "https://filearchive.cnews.ru/img/articles/2020/09/09/adobestock1588800871024x440_300x200.jpg",
    },
    {
      id: 3,
      type: "Urban Mart",
      title: "CoreCMSr",
      desc: "A flexible content management system designed for startups and enterprises.",
      img: "https://asset.kompas.com/crops/AZAM5yIWvooWd73IqxwWTjO_RIM=/204x0:1299x730/375x240/data/photo/2022/09/09/631aebe1bd4be.png",
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
    {
      id: 8,
      type: "Website Application",
      title: "InsightBoard",
      desc: "Business intelligence dashboard providing real-time KPI monitoring and data visualization.",
      img: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/24/f7/c9/24f7c9f0-c8dd-3b49-04d1-0f776294f38c/AppIcon-0-0-1x_U007emarketing-0-11-0-0-85-220.png/1200x630wa.png",
    },
  ];

  const featured = portofolio.find((p) => p.featured);
  const others = portofolio.filter((p) => !p.featured);

  // state untuk toggle lihat semua
  const [showAll, setShowAll] = useState(false);

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
        <div className="text-center mb-12 max-w-2xl relative text-left leading-8">
          <h1 className="text-4xl font-bold">
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

        {/* Featured project */}
        {featured && (
          <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden bg-gray-100 relative z-10">
            <img
              src={featured.img}
              alt={featured.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-8">
              <p className="text-sm text-gray-600 mb-1">{featured.type}</p>
              <h3 className="text-2xl font-bold mb-2 text-blue-500">
                {featured.title}
              </h3>
              <p className="text-sm text-gray-600">{featured.desc}</p>
              <Link
                to={`/portfolio/${featured.id}`}
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
                src={p.img}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-1">{p.type}</p>
                <h3 className="text-lg font-bold mb-2 text-blue-500">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600">{p.desc}</p>
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
            <span className="text-blue-600 font-bold">Here!</span>
          </h2>
        </div>
      </main>
      <Footer />
    </>
  );
}
