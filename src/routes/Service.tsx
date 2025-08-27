import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

type ServiceItem = { title: string; desc: string; icon: React.ReactNode };

export default function Service() {
  const [activeTab, setActiveTab] = useState("UI/UX");
  const services: Record<string, ServiceItem[]> = {
    "UI/UX": [
      {
        title: "Design Flow Planning",
        desc: "We map out user journeys with research and wireframes to create intuitive, goal-driven flows.",
        icon: <span className="text-blue-600 text-2xl">🌀</span>,
      },
      {
        title: "High-Fidelity Prototyping",
        desc: "We craft detailed, interactive prototypes, refining visuals and functionality to match your brand.",
        icon: <span className="text-blue-600 text-2xl">📐</span>,
      },
      {
        title: "Mockup Finalization",
        desc: "We produce pixel-perfect mockups, incorporating feedback for a stunning, development-ready design.",
        icon: <span className="text-blue-600 text-2xl">🖼️</span>,
      },
    ],
    "Web Development": [
      {
        title: "Design Flow Planning",
        desc: "We create seamless design structures to ensure intuitive navigation.",
        icon: <span className="text-blue-600 text-2xl">🖥️</span>,
      },
      {
        title: "High-fidelity Prototyping",
        desc: "Interactive prototypes for better visualization and feedback.",
        icon: <span className="text-blue-600 text-2xl">📱</span>,
      },
      {
        title: "UI/UX Evaluation",
        desc: "Optimize usability and accessibility with design validation.",
        icon: <span className="text-blue-600 text-2xl">🔍</span>,
      },
    ],
    "Mobile Application": [
      {
        title: "Design Flow Planning",
        desc: "We create seamless design structures to ensure intuitive navigation.",
        icon: <span className="text-blue-600 text-2xl">📱</span>,
      },
      {
        title: "High-fidelity Prototyping",
        desc: "Interactive prototypes for better visualization and feedback.",
        icon: <span className="text-blue-600 text-2xl">📱</span>,
      },
      {
        title: "UI/UX Evaluation",
        desc: "Optimize usability and accessibility with design validation.",
        icon: <span className="text-blue-600 text-2xl">🔍</span>,
      },
    ],
    "CRM System (SaaS Dashboard)": [
      {
        title: "Design Flow Planning",
        desc: "We create seamless design structures to ensure intuitive navigation.",
        icon: <span className="text-blue-600 text-2xl">📊</span>,
      },
      {
        title: "High-fidelity Prototyping",
        desc: "Interactive prototypes for better visualization and feedback.",
        icon: <span className="text-blue-600 text-2xl">📊</span>,
      },
      {
        title: "UI/UX Evaluation",
        desc: "Optimize usability and accessibility with design validation.",
        icon: <span className="text-blue-600 text-2xl">🔍</span>,
      },
    ],
  };

  return (
    <>
      <NavBar/>
      <main className="px-6 md:px-20 lg:px-32 py-16">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* titik 1 */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>
          {/* titik 2 */}
          <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[140px] opacity-20"></div>
        </div>
        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Side Image */}
          <div className="flex justify-center items-center">
            <img
              src="/img/pexels-cottonbro-6804086.jpg"
              alt="Service Image"
              className="rounded-xl shadow-md object-cover w-full h-auto max-h-[420px]"
            />
          </div>

          {/* Right Side Text + Tabs */}
          <div>
            {/* Hero Section (moved here so it's beside the image) */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold">
                We <span className="text-blue-500">Build.</span> We{" "}
                <span className="text-blue-500">Design.</span> We{" "}
                <span className="text-blue-500">Innovate.</span>
              </h1>
              <p className="text-gray-600 mt-3 max-w-md">
                Explore the range of services we offer to elevate your digital
                presence.
              </p>
            </div>

            {/* Tabs */}
            <div className="space-y-4">
              {Object.keys(services).map((tab) => (
                <div key={tab} className="border-b border-gray-200 pb-2">
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`w-full flex items-center justify-between font-medium text-lg transition-colors ${
                      activeTab === tab ? "text-black font-bold" : "text-gray-800"
                    }`}
                  >
                    {tab}
                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${
                        activeTab === tab ? "rotate-90 text-black" : ""
                      }`}
                    />
                  </button>

                  {activeTab === tab && services[tab].length > 0 && (
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      {services[tab].map((item, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition"
                        >
                          <div className="mb-3">{item.icon}</div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold">
            Let’s Build Something Great Together, <br />
            Get in Touch{" "}
            <span className="text-blue-600 font-semibold">Here!</span>
          </h2>
        </div>
      </main>
      <Footer />
    </>
  );
}
