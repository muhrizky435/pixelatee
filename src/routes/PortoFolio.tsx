import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";


export default function PortoFolio() {
  const portofolio = [
      {
        company: "Brightwave Media",
        title: "NovaLink Shortener",
        desc: " A smart link shortening platform with real-time analytics and custom branding options.",
        img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQp_dcqAF0SJch3E2Pg1NNsOsX0HBY41t8IDYKpFF6k_O49Qw3p",
        featured : true,
      },
      {
        company: "Horizon Tech",
        title: "SkyHost Cloud",
        desc: "Cloud hosting with enterprise-grade security and 99.9% uptime guarantee.",
        img: "https://filearchive.cnews.ru/img/articles/2020/09/09/adobestock1588800871024x440_300x200.jpg",
      },
      {
        company: "Urban Mart",
        title: "CoreCMSr",
        desc: "A flexible content management system designed for startups and enterprises.",
        img: "https://asset.kompas.com/crops/AZAM5yIWvooWd73IqxwWTjO_RIM=/204x0:1299x730/375x240/data/photo/2022/09/09/631aebe1bd4be.png"
      },
      {
        company: "Urban Mart",
        title: "ShopMaster E-Commerce",
        desc: "Complete e-commerce solution with integrated payment gateways and inventory tracking.",
        img: "https://prabumulihpos.disway.id/upload/ed4e3fb251ee6cd35ce7030c49673843.jpg",
      },
      {
        company: "Summit Corp",
        title: "PeopleFlow HRIS",
        desc: "A modern HR system for attendance, payroll automation, and employee performance tra...",
        img: "https://www.emailaudience.com/wp-content/uploads/diagram-explanation-of-HRIS-vs-HRMS-vs-HCM.png",
      },
      {
        company: "Summit Corp",
        title: "EventSphere",
        desc: "Digital event management platform with ticketing, registration, and live-stream integra...",
        img: "https://iconiclife.com/wp-content/uploads/2023/10/RF2_1965-500x436.jpg",
      },
      {
        company: "FutureEd Institute",
        title: "Learnify LMS",
        desc: "Interactive learning management system with video courses, quizzes, and certifications.",
        img: "https://idwebhost.com/blog/wp-content/uploads/2024/11/lms-a.png",
      },
      {
        company: "DataVision Analytics",
        title: "InsightBoard",
        desc: "Business intelligence dashboard providing real-time KPI monitoring and data visualization.",
        img: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/24/f7/c9/24f7c9f0-c8dd-3b49-04d1-0f776294f38c/AppIcon-0-0-1x_U007emarketing-0-11-0-0-85-220.png/1200x630wa.png"
      },
      {
        company: "GlobeX Travel",
        title: "TripNest",
        desc: "Travel booking platform for flights, hotels, and holiday packages in one place.",
        img: "https://img.freepik.com/free-vector/travel-onboarding-app-screens_52683-32053.jpg?w=360",
      },
      {
        company: "Finova Capital",
        title: "PayFlex FinTech",
        desc: "Digital financial platform with e-wallet, QR payments, and transaction management tools.",
        img: "https://images.ctfassets.net/vfkpgemp7ek3/46gYgo7pzPM36Bo7TbLMZw/2f6e7cce5b4067e29ef630d4f64e2ca4/SOMFA.png",
      },
  ]

  return (
    <>
      <NavBar/>
      <main className="px-6 md:px-20 lg:px-32 py-16 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-blue-500">Solution</span> We Delivered
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            We’d love to hear from you and explore how we can turn your thoughts into something real. Don’t hesitate—every great project starts with a simple conversation.
          </p>
        </div>
        <div>
          <h2 className="text-blue-500 font-semibold mb-4">Latest</h2>
          {portofolio
          .filter((p) => p.featured)
          .map((p, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white"
          >
            <img src={p.img} alt={p.title} className="w-full h-60 object-cover" />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-1">{p.company}</p>
              <h3 className="text-xl font-bold mb-2 text-blue-500">{p.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{p.desc}</p>
              <a
                href="#"
                className="inline-block mt-4 text-black hover:text-black font-medium text-sm"
              >
                Get a Direction →
              </a>
            </div>
          </div>
          ))}
        
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {portofolio
            .filter((p) => !p.featured)
            .map((p, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white"
            >
              <img src={p.img} alt={p.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-1">{p.company}</p>
                <h3 className="text-xl font-bold mb-2 text-blue-500">{p.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{p.desc}</p>
                <a
                  href="#"
                  className="inline-block mt-4 text-black hover:text-black font-medium text-sm"
                >
                  Get a Direction →
                </a>
              </div>
          </div>
          ))}
        </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mt-12">Interested in Working with Us? <br /> Get in Touch{' '}
          <span className="text-blue-500">Here!</span>
        </h2>
      </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
