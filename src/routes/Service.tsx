import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { FaArrowTrendUp, FaCircleArrowUp } from "react-icons/fa6";
import { LuArrowUpRight, LuArrowDownRight } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

type ServiceKey = "uiux" | "webdev" | "mobile" | "crm";

interface ServiceItem {
  icon?: React.ReactNode;
  title: string;
  desc: string;
}

interface ServiceData {
  key: ServiceKey;
  label: string;
  items: ServiceItem[];
}

const services: ServiceData[] = [
  {
    key: "uiux",
    label: "UI/UX",
    items: [
      {
        icon: <FaCircleArrowUp className="text-blue-500 text-3xl mb-3" />,
        title: "Wireframe Creation",
        desc: "creating rough layouts to plan user experience flow.",
      },
      {
        icon: <FaArrowTrendUp className="text-blue-500 text-3xl mb-3" />,
        title: "Prototype Design",
        desc: "building interactive mockups to test look and feel.",
      },
      {
        icon: <FaRegImage className="text-blue-500 text-3xl mb-3" />,
        title: "Final Mockups",
        desc: "delivering high-quality design previews for review.",
      },
    ],
  },
  {
    key: "webdev",
    label: "Web Development",
    items: [
      {
        title: "Frontend Development",
        desc: "building user interfaces with React, Vue, or Angular.",
      },
      {
        title: "Backend Development",
        desc: "creating APIs and server logic using Node.js or Django.",
      },
      {
        title: "FullStack Development",
        desc: "Buailding user interface and creating APIs and server logic using Node.js or Django.",
      },
    ],
  },
  {
    key: "mobile",
    label: "Mobile Application",
    items: [
      {
        title: "iOS Apps",
        desc: "developing apps for Apple devices using Swift.",
      },
      {
        title: "Android Apps",
        desc: "building Android apps with Kotlin or Flutter.",
      },
      {
        title: "Android Apps",
        desc: "building Android apps with Kotlin or Flutter.",
      },
    ],
  },
  {
    key: "crm",
    label: "CRM System (SaaS Dashboard)",
    items: [
      {
        title: "User Management",
        desc: "managing customers, roles, and permissions.",
      },
      {
        title: "Analytics Dashboard",
        desc: "track usage, sales, and reports in real-time.",
      },
      {
        title: "Analytics Dashboard",
        desc: "track usage, sales, and reports in real-time.",
      },
    ],
  },
];

export default function ServisSection() {
  const [openService, setOpenService] = useState<ServiceKey | null>("uiux");

  const toggleService = (service: ServiceKey) => {
    setOpenService((prev) => (prev === service ? null : service));
  };

  return (
    <>
      <NavBar />
      <main>
        <div className="bg-white text-gray-800 px-5 md:px-20 py-28 font-default relative overflow-hidden">
          {/* Partikel Blur Background */}
          <div className="absolute top-10 left-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

          <div className="max-w-7xl mx-auto flex flex-col">
            {/* Heading atas */}
            <div className="text-center md:text-right md:ml-auto mb-12">
              <h2 className="text-4xl md:text-4xl leading-snug font-bold">
                We <span className="text-blue-600">Build.</span> We{" "}
                <span className="text-blue-600">Design.</span> We{" "}
                <span className="text-blue-600">Innovate.</span>
              </h2>
              <p className="text-gray-400 mt-3 text-base max-w-2xl md:ml-auto md:text-center">
                Explore the range of services we offer to elevate your digital
                presence.
              </p>
            </div>

            {/* Konten utama: gambar kiri - service kanan */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
              {/* Image kiri */}
              <div className="flex justify-center md:justify-start md:col-span-2">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692"
                  alt="Services"
                  className="rounded-lg shadow-lg w-full md:h-120 max-w-sm object-cover"
                />
              </div>

              {/* Service kanan */}
              <div className="flex flex-col gap-4 md:col-span-3 px-8 md:px-0">
                {services.map((service) => (
                  <div key={service.key}>
                    <button
                      className="w-full flex justify-between items-center text-xl font-semibold py-3 border-b border-gray-700"
                      onClick={() => toggleService(service.key)}
                    >
                      {service.label}
                      {openService === service.key ? (
                        <LuArrowUpRight className="text-xl text-blue-600" />
                      ) : (
                        <LuArrowDownRight className="text-xl text-blue-600" />
                      )}
                    </button>

                    <AnimatePresence>
                      {openService === service.key && (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          exit={{ opacity: 0, scaleY: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="origin-top grid md:grid-cols-3 gap-4 mt-4"
                        >
                          {service.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-6 border rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center text-center"
                            >
                              {item.icon}
                              <h4 className="font-semibold text-lg mb-2">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {item.desc}
                              </p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer text */}
            <div className="mt-16 text-center">
              <h3 className="text-3xl md:text-4xl font-semibold">
                Let’s Build Something Great Together, <br /> Get in Touch{" "}
                <span className="text-blue-600 font-bold">Here!</span>
              </h3>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
