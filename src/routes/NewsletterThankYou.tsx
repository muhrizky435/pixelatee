import { Link, useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export default function NewsletterThankYou() {
  const { memberId } = useParams();
  const { newsletterEmail } = useParams();

  return (
    <>
      <NavBar />
      <main className="min-h-[60vh] flex flex-col items-center justify-center bg-white px-4 py-24">
        <div className="bg-blue-50 rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
            Thank You for Confirming!
          </h1>
          <p className="text-gray-700 mb-6">
            Your subscription to our newsletter is now <span className="font-semibold text-blue-600">active</span>.
            <br />
            We’re excited to keep you updated with the latest news and offers from Pixelatee.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
        <div className="mt-8 text-gray-400 text-sm">
          Member ID: <span className="font-mono">{memberId}</span>
          Email : <span className="font-mono">{newsletterEmail}</span>
        </div>
      </main>
      <Footer />
    </>
  );
}