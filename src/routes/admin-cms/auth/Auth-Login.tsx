import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../api/auth.api";
import { NavBar } from "../../../components/NavBar";
import { Footer } from "../../../components/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginApi(form);

      toast.success("Login berhasil! Mengarahkan ke dashboard...", {
        position: "top-right",
        style: {
          background: "#2563eb",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#2563eb",
        },
      });

      setTimeout(() => navigate("/panels-admins/dashboard"), 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Login gagal", {
          position: "top-right",
          style: { background: "#2563eb", color: "#fff" },
        });
      } else {
        toast.error("Unexpected error occurred", {
          position: "top-right",
          style: { background: "#2563eb", color: "#fff" },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-gray-100 to-blue-200 pt-26 pb-8 px-8 md:px-12">
        {/* Card container */}
        <div className="w-full max-w-4xl bg-white shadow-xl border border-gray-200 rounded-2xl overflow-hidden grid md:grid-cols-2 transform transition-all duration-700 animate-fadeIn">
          {/* Left side: form */}
          <div className="p-12 flex flex-col justify-center">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Admin Login
              </h1>
              <div className="w-20 h-1 mx-auto bg-blue-600 rounded"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 mt-1 bg-gray-50 text-gray-900 border border-gray-300 placeholder-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 mt-1 bg-gray-50 text-gray-900 border border-gray-300 placeholder-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="••••••••"
                />
                <div className="text-right mt-2">
                  <a
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl shadow hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-60"
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>

          {/* Right side: full image with overlay */}
          <div className="hidden md:block relative">
            <img
              src="/img/photo1.png"
              alt="Login Illustration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply"></div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Toast */}
      <Toaster />
    </>
  );
}
