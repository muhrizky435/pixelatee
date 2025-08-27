import { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { FaArrowTrendUp, FaCircleArrowUp } from "react-icons/fa6";
import { LuArrowUpRight, LuArrowDownRight } from "react-icons/lu";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

// definisikan tipe service
type ServiceKey = "uiux" | "webdev" | "mobile" | "crm";

export default function ServisSection() {
  const [openService, setOpenService] = useState<ServiceKey | null>("uiux");

  const toggleService = (service: ServiceKey) => {
    setOpenService(openService === service ? null : service);
  };
  return (
    <>
      <NavBar />
      <main>
        <div className="bg-white text-gray-800 px-5 md:px-20 py-28 font-default">
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
                {/* UI/UX */}
                <div>
                  <button
                    className="w-full flex justify-between items-center text-xl font-semibold pb-3 border-b border-gray-700"
                    onClick={() => toggleService("uiux")}
                  >
                    UI/UX
                    {openService === "uiux" ? (
                      <LuArrowUpRight className="text-xl text-blue-600" />
                    ) : (
                      <LuArrowDownRight className="text-xl text-blue-600" />
                    )}
                  </button>

                  {openService === "uiux" && (
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
                        <FaCircleArrowUp className="text-blue-500 text-3xl mb-3" />
                        <h4 className="font-semibold text-lg mb-2">
                          Design Flow Planning
                        </h4>
                        <p className="text-sm text-gray-600">
                          We map out user journeys with research and wireframes
                          to create intuitive, goal-driven flows.
                        </p>
                      </div>

                      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
                        <FaArrowTrendUp className="text-blue-500 text-3xl mb-3" />
                        <h4 className="font-semibold text-lg mb-2">
                          High-Fidelity Prototyping
                        </h4>
                        <p className="text-sm text-gray-600">
                          We craft detailed, interactive prototypes, refining
                          visuals and functionality to match your brand.
                        </p>
                      </div>

                      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
                        <FaRegImage className="text-blue-500 text-3xl mb-3" />
                        <h4 className="font-semibold text-lg mb-2">
                          Mockup Finalization
                        </h4>
                        <p className="text-sm text-gray-600">
                          We produce pixel-perfect mockups, incorporating
                          feedback for stunning, deployment-ready design.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Web Development */}
                <div>
                  <button
                    className="w-full flex justify-between items-center text-xl font-semibold py-3 border-b border-gray-700"
                    onClick={() => toggleService("webdev")}
                  >
                    Web Development
                    {openService === "webdev" ? (
                      <LuArrowUpRight className="text-xl text-blue-600" />
                    ) : (
                      <LuArrowDownRight className="text-xl text-blue-600" />
                    )}
                  </button>
                </div>

                {/* Mobile Application */}
                <div>
                  <button
                    className="w-full flex justify-between items-center text-xl font-semibold py-3 border-b border-gray-700"
                    onClick={() => toggleService("mobile")}
                  >
                    Mobile Application
                    {openService === "mobile" ? (
                      <LuArrowUpRight className="text-xl text-blue-600" />
                    ) : (
                      <LuArrowDownRight className="text-xl text-blue-600" />
                    )}
                  </button>
                </div>

                {/* CRM System */}
                <div>
                  <button
                    className="w-full flex justify-between items-center text-xl font-semibold py-3 border-b border-gray-700"
                    onClick={() => toggleService("crm")}
                  >
                    CRM System (SaaS Dashboard)
                    {openService === "crm" ? (
                      <LuArrowUpRight className="text-xl text-blue-600" />
                    ) : (
                      <LuArrowDownRight className="text-xl text-blue-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer text */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl md:text-3xl font-semibold">
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
