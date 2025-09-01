import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaRegCommentDots,
  FaTag,
  FaUser,
  FaFacebookSquare,
} from "react-icons/fa";
import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";

export default function Contact() {
  return (
    <>
      <NavBar />
      <main className="max-w-7xl px-12 md:px-20 py-32 font-default relative overflow-hidden">
        {/* Partikel Blur Background */}
        <div className="absolute top-10 left-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-60 right-0 w-74 h-74 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-10 left-0 -translate-x-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

        {/* Heading */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Tell Us{" "}
            <span className="text-blue-600 font-bold text-4xl">your Idea!</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            We’d love to hear from you and explore how we can turn your thoughts
            into something real. Don’t hesitate—every great project starts with
            a simple conversation.
          </p>
        </div>

        {/* Grid Layout: Office Card (left) + Form (right) */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Section */}
          <div>
            {/* Office Card */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-6">
              <img
                src="/img/rectangle1.png"
                alt="Our Office"
                className="w-full h-64 object-cover"
              />

              <div className="p-5">
                <h3 className="font-semibold text-xl mb-3">We Work <span className="font-bold text-blue-600">here!</span> </h3>
                <p className="flex items-center gap-2 text-gray-700">
                  <FaMapMarkerAlt className="text-blue-500" /> 24, Id Street,
                  Konohagakure
                </p>
                <a
                  href="#"
                  className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-900"
                >
                  Get a Direction →
                </a>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="tel:+6287732160963"
                className="flex items-center justify-center gap-2 flex-1 bg-blue-500 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-600 transition"
              >
                <FaPhoneAlt /> +62 877 3216 0963
              </a>
              <a
                href="mailto:support@pixelatee.com"
                className="flex items-center justify-center gap-2 flex-1 bg-blue-500 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-600 transition"
              >
                <FaEnvelope /> support@pixelatee.com
              </a>
            </div>

            {/* Social Media */}
            <p className="text-gray-700 text-2xl md:mt-24">
              And, we have{" "}
              <span className="font-semibold text-blue-600">Social Media</span>,
              too!
            </p>
            <div className="flex items-center gap-4 text-2xl mt-4">
              <a href="#" className="text-pink-600 hover:scale-110 transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-black hover:scale-110 transition">
                <FaXTwitter />
              </a>
              <a href="#" className="text-blue-700 hover:scale-110 transition">
                <FaLinkedin />
              </a>
              <a href="#" className="text-blue-700 hover:scale-110 transition">
                <FaFacebookSquare />
              </a>
            </div>
          </div>

          {/* Right Section (Form) */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Also, you can <span className="text-blue-600">Contact Us!</span>
            </h3>
            <form className="space-y-4">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
                  <FaUser className="text-blue-500" /> Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
                  <FaEnvelope className="text-blue-500" /> Your Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
                  <FaTag className="text-blue-500" /> Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
                  <FaRegCommentDots className="text-blue-500" /> Your Message
                </label>
                <textarea
                  placeholder="Write your message..."
                  rows={5}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-right text-sm text-gray-500">0/1000</p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
