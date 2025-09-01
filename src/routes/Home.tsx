import { Link } from "react-router";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { FaQuoteLeft } from "react-icons/fa";
import ClientSlider from "../components/ClientSlider";
import { HiArrowRight } from "react-icons/hi";
import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

// faq
const faqs = [
  {
    id: 1,
    question: "What is Pixelatee?",
    answer:
      "Pixelatee is a digital solutions company specializing in web development, mobile applications, and custom software to help businesses grow in the digital era.",
  },
  {
    id: 2,
    question: "Web Development",
    answer:
      "We build modern, scalable, and responsive websites tailored to your business needs.",
  },
  {
    id: 3,
    question: "Who are Pixelatee’s typical clients?",
    answer:
      "Our clients range from startups to enterprises looking to build digital products, SaaS platforms, and custom solutions.",
  },
  {
    id: 4,
    question: "CRM System (SaaS Dashboard)",
    answer:
      "We deliver custom CRM systems and dashboards to help you streamline operations and manage data effectively.",
  },
];

// testimonials
const testimonials = [
  {
    id: 1,
    quote:
      "Pixelatee transformed our outdated system into a modern platform that scales with our business. The team was professional, fast, and reliable.",
    name: "Anna Rodriguez",
    role: "CTO at BrightWave Media",
  },
  {
    id: 2,
    quote:
      "Working with Pixelatee was effortless. They understood our vision and delivered a mobile app that our customers love.",
    name: "James Lee",
    role: "Product Manager at UrbanMart",
  },
  {
    id: 3,
    quote:
      "From the first consultation to deployment, Pixelatee provided transparency and guidance. Our e-commerce solution now runs smoother than ever.",
    name: "Michael Brown",
    role: "CEO at MegaMart Indonesia",
  },
  {
    id: 4,
    quote:
      "Their expertise in UI/UX helped us create a seamless learning platform. Pixelatee is not just a vendor, they are a true partner.",
    name: "Sophia Tan",
    role: "Director at FutureEd Institute",
  },
  {
    id: 5,
    quote:
      "We appreciate their dedication and long-term support. Pixelatee goes beyond coding—they care about business results.",
    name: "Laura Kim",
    role: "COO at Horizon Tech",
  },
  {
    id: 6,
    quote:
      "Pixelatee delivered exactly what we needed — a secure and scalable fintech platform. Their team exceeded our expectations.",
    name: "Daniel Carter",
    role: "Head of Technology at Finova Capital",
  },
];

// projects
const projects = [
  {
    id: 1,
    company: "BrightWave Media",
    title: "NovaLink Shortener",
    image: "https://picsum.photos/seed/project1/600/400",
  },
  {
    id: 2,
    company: "Horizon Tech",
    title: "SkyHost Cloud",
    image: "https://picsum.photos/seed/project2/600/400",
  },
  {
    id: 3,
    company: "Urban Mart",
    title: "CoreCMS",
    image: "https://picsum.photos/seed/project3/600/400",
  },
];

export default function Home() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <NavBar />
      <main className="font-default bg-white text-gray-800">
        {/* Hero Section */}
        <section className="relative grid grid-cols-1 md:grid-cols-[3fr_2fr]">
          {/* Left: Blue block */}
          <div className="flex flex-col justify-between pt-19">
            <div className="bg-[#2563eb] text-white px-8 md:px-16 py-20">
              <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
                Transforming Ideas Into <br /> Digital Impact
              </h1>
              <p className="text-sm md:text-base text-blue-100">
                We craft meaningful experiences that help brands grow and
                connect with people.
              </p>
            </div>
            {/* Logos inside hero, with white bg */}
            <div className="bg-white py-6 px-6 md:px-2">
              <div className="flex flex-wrap justify-start items-center gap-10">
                <ClientSlider />
              </div>
            </div>
          </div>

          {/* Right: Image full */}
          <div className="hidden md:block">
            <img
              src="/img/photo4.png"
              alt="team work"
              className="h-130 w-full object-cover"
            />
          </div>
        </section>

        {/* Empowering Section */}
        <section className="text-center py-10 md:py-19 px-12 md:x-6">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Empowering{" "}
            <span className="text-blue-400 font-semibold">businesses</span>,
            inspiring{" "}
            <span className="text-blue-600 font-semibold">change</span>.
          </h2>
        </section>

        {/* Story, Vision, Values */}
        <section className="relative max-w-7xl px-12 md:px-26 grid grid-cols-1 md:grid-cols-2 gap-12 items-start overflow-hidden">
          {/* Circle Blur */}
          <div className="absolute top-50 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 "></div>
          <div className="absolute bottom-30 right-0 w-74 h-74 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>

          {/* Left */}
          <div>
            <h3 className="text-4xl md:text-5xl text-left font-bold text-gray-900 mb-6 leading-snug">
              Our <span className="text-blue-400">Story</span>,{" "}
              <span className="text-blue-500">Vision</span>, and{" "}
              <span className="text-blue-700">Values</span>
            </h3>

            <FaQuoteLeft className="text-blue-600 text-4xl mb-4" />

            <p className="text-gray-500 text-lg leading-8">
              Pixelatee began with a simple belief:{" "}
              <span className="text-blue-600">
                every idea deserves to be brought to life with creativity and
                purpose
              </span>
              . Today, we’ve grown into a digital studio dedicated to
              transforming ideas into impactful experiences. Guided by our
              vision and values—creativity, collaboration, integrity,
              excellence, and impact—we strive to be a trusted partner for
              brands worldwide.
            </p>
          </div>

          {/* Right */}
          <div>
            <img
              src="/img/photo5.png"
              alt="discussion"
              className="rounded-lg shadow-md mb-10"
            />

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-blue-600">8</p>
                <p className="text-gray-700 text-sm mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">20</p>
                <p className="text-gray-700 text-sm mt-1">Project Challenge</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">12</p>
                <p className="text-gray-700 text-sm mt-1">Industry Awards</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">40</p>
                <p className="text-gray-700 text-sm mt-1">Trusted Partners</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section What We Do Best */}
        <section className="max-w-7xl mx-auto px-12 md:px-26 pt-20">
          {/* Heading */}
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10">
            What We Do <span className="text-blue-600">Best</span>
          </h3>

          {/* Grid 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-green-500 rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h5 className="text-white text-lg font-semibold">UI/UX</h5>
              </div>
              <img
                src="/img/uiux.png"
                alt="UI/UX"
                className="w-full h-40 object-cover"
              />
            </div>

            {/* Card 2 */}
            <div className="bg-red-400 rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h4 className="text-white text-lg font-semibold">
                  Web Development
                </h4>
              </div>
              <img
                src="/img/web.png"
                alt="Web Development"
                className="w-full h-40 object-cover"
              />
            </div>

            {/* Card 3 */}
            <div className="bg-orange-400 rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h4 className="text-white text-lg font-semibold">
                  Mobile Application
                </h4>
              </div>
              <img
                src="/img/mobile.png"
                alt="Mobile Application"
                className="w-full h-40 object-cover"
              />
            </div>

            {/* Card 4 */}
            <div className="bg-cyan-700 rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h4 className="text-white text-lg font-semibold">
                  CRM System (SaaS Dashboard)
                </h4>
              </div>
              <img
                src="/img/crm.png"
                alt="CRM System"
                className="w-full h-40 object-cover"
              />
            </div>
          </div>
        </section>

        {/* section Project */}
        <section className="pt-20 px-12 md:px-26 bg-white">
          {/* Heading */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-snug">
              Transforming{" "}
              <span className="text-blue-500 font-bold">Creative Ideas</span>
              <br />
              Into Impactful{" "}
              <span className="text-blue-700 font-bold">Projects</span>
            </h2>
          </div>

          {/* Project Cards */}
          <div className="max-w-6xl mx-auto flex flex-col gap-5">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col md:flex-row overflow-hidden rounded-lg shadow bg-blue-500 text-white"
              >
                {/* Image */}
                <div className="md:w-1/3">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-40 md:h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="md:w-2/3 flex flex-col justify-center p-5">
                  <p className="text-lg opacity-80 mb-1">{project.company}</p>
                  <h3 className="text-2xl md:text-4xl font-semibold mb-3">
                    {project.title}
                  </h3>
                  <Link
                    to={`/portfolio/${project.id}`}
                    className="inline-flex items-center gap-2 mt-4 text-yellow-200 hover:text-white font-medium text-sm group"
                  >
                    <span>Get a Direction</span>
                    <HiArrowRight className="text-lg transform group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* See More Button */}
          <div className="flex justify-center mt-14">
            <Link
              to="/portfolio"
              className="inline-flex font-semibold text-xl rounded-full border border-blue-500  py-2 px-8 items-center gap-2 mt-4 text-blue-500 hover:text-white hover:bg-blue-500 group"
            >
              <span>See More</span>
              <HiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </section>
        {/* end section project */}

        {/* Testimonials & Newsletter Section */}
        <section className="bg-white pt-20 px-13 md:px-25">
          {/* Circle Blur */}
          <div className="absolute top-50 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 "></div>
          <div className="absolute bottom-30 right-0 w-74 h-74 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>

          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-snug">
              <span className="text-blue-600 font-bold">Words</span> from Those
              <br />
              Who <span className="text-blue-600 font-bold">Trusted Us</span>
            </h2>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 max-w-6xl mx-auto">
            
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white border rounded-lg shadow-lg p-6 hover:shadow-md transition"
              >
                <p className="text-gray-700 text-sm mb-4">“{t.quote}”</p>
                <p className="text-sm font-medium text-gray-900">
                  — <span className="text-blue-600">{t.name}</span>, {t.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <div className="bg-blue-600 mt-20 mb-16 py-12 text-center text-white w-full">
          <h3 className="text-3xl md:text-4xl text-gray-100 mb-8">
            Join Our{" "}
            <span className="text-white font-extrabold">Newsletter!</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center max-w-2xl mx-auto w-full gap-3 sm:gap-0 px-6">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full sm:flex-1 px-4 py-3 bg-white text-blue-600 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none"
            />
            <button className="w-full sm:w-auto px-6 py-3 bg-blue-800 rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-blue-900 transition">
              Subscribe
            </button>
          </div>
        </div>
        {/* end Testimonials & Newsletter Section */}

        {/* FAQ Section */}
        <section className="w-full py-16 px-6 md:px-12 lg:px-24">
          {/* Circle Blur */}
          <div className="absolute top-50 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 "></div>
          <div className="absolute bottom-30 right-0 w-74 h-74 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-100"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Left Heading */}
            <div className="md:col-span-1">
              <h2 className="text-5xl md:text-5xl font-extrabold text-blue-600">
                FAQ
              </h2>
            </div>

            {/* Right FAQ List */}
            <div className="md:col-span-3 space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border-b border-gray-200 pb-4 cursor-pointer"
                  onClick={() => toggle(faq.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-600 text-white font-bold px-3 py-1 rounded-md">
                        {faq.id}
                      </span>
                      <h3
                        className={`text-2xl font-bold ${
                          openId === faq.id ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                    {openId === faq.id ? (
                      <HiOutlineChevronUp className="text-blue-600 text-xl" />
                    ) : (
                      <HiOutlineChevronDown className="text-blue-600 text-xl" />
                    )}
                  </div>

                  {/* Answer */}
                  {openId === faq.id && faq.answer && (
                    <p className="mt-3 text-gray-500 text-lg pl-12">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Designed to grow with you. <br /> Get in Touch{" "}
              <Link to="/contact" className="text-blue-600 font-bold">
                Here!
              </Link>
            </h2>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
