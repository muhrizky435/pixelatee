import { useState } from "react";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
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
import { sendContactAxios } from "../../api/contact.api";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // tambahan state untuk toast
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [toastMessage, setToastMessage] = useState("");

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

      // ✅ validasi service type
    if (!type) {
      setToastType("error");
      setToastMessage("Please select a service type.");
      setToastOpen(true);
      setLoading(false);
      return;
    }

    // fetch api kirim pesan (contact.api.ts)
    try {
      const res = await sendContactAxios({
        name,
        email,
        subject,
        type,
        message,
      });
      setFeedback(res.message || "Message sent successfully!");
      setName("");
      setEmail("");
      setSubject("");
      setType("");
      setMessage("");

      // tampilkan toast success
      setToastType("success");
      setToastMessage(res.message || "Message sent successfully!");
      setToastOpen(true);

      // auto close 4 detik
      setTimeout(() => setToastOpen(false), 4000);
    } catch (err) {
      let msg = "Failed to send message.";
      if (err && typeof err === "object" && "response" in err) {
        const errorObj = err as { response?: { data?: { message?: string } } };
        msg = errorObj.response?.data?.message || msg;
      }
      setFeedback(msg);

      // tampilkan toast error
      setToastType("error");
      setToastMessage(msg);
      setToastOpen(true);

      setTimeout(() => setToastOpen(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <main className="max-w-7xl px-12 md:px-20 py-28 font-default relative overflow-hidden">
        {/* Partikel Blur Background */}
        <div className="absolute top-10 left-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-60 right-0 w-74 h-74 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-10 left-0 -translate-x-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

        {/* Heading */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Tell Us <span className="text-blue-600 font-bold">your Idea!</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            We’d love to hear from you and explore how we can turn your thoughts
            into something real. Don’t hesitate—every great project starts with
            a simple conversation.
          </p>
        </div>

        {/* Grid Layout: kiri-image kanan-form */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* kiri Section */}
          <div>
            {/* Office Card */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-6">
              <img
                src="/img/rectangle1.png"
                alt="Our Office"
                className="w-full h-64 object-cover"
              />

              <div className="p-5">
                <h3 className="font-semibold text-xl mb-3">
                  We Work <span className="font-bold text-blue-600">here!</span>{" "}
                </h3>
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
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
                  <FaUser className="text-blue-500" /> Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Service Type */}
              <div>
                <p className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
                  <FaRegCommentDots className="text-blue-500" /> What type of
                  Service you were looking for?
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Customer Service", value: "CUSTOMER_SERVICE" },
                    { label: "IT Consultation", value: "IT_CONSULTATION" },
                    { label: "UI/UX Development", value: "UIUX_DEVELOPMENT" },
                    { label: "Mobile Development", value: "MOBILE_DEVELOPMENT" },
                    { label: "Web Development", value: "WEB_DEVELOPMENT" },
                  ].map((service) => (
                    <button
                      key={service.value}
                      type="button"
                      onClick={() => setType(service.value)}
                      className={`px-4 py-2 rounded-lg border transition ${
                        type === service.value
                          ? "bg-gray-200 border-gray-400"
                          : "bg-white border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-right text-sm text-gray-500">
                  {message.length}/1000
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {feedback && (
                <p className="text-center text-sm mt-2 text-gray-700">
                  {feedback}
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />

      {/* Toast (pojok kanan atas) */}
      <div
        className={`fixed top-5 right-5 transform transition-all duration-500 ${
          toastOpen ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0"
        }`}
      >
        <div
          className={`px-5 py-3 rounded-lg shadow-lg text-white ${
            toastType === "success" ? "bg-blue-500" : "bg-red-600"
          }`}
        >
          <p className="font-semibold">
            {toastType === "success" ? "Success" : "Error"}
          </p>
          <p className="text-sm">{toastMessage}</p>
        </div>
      </div>
    </>
  );
}
