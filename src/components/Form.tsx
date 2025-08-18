import { useState } from "react";

export function ContactForm() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [subjek, setSubjek] = useState("");
  const [pesan, setPesan] = useState("");

  return (
    <section className="flex flex-col items-center justify-center px-6 py-16 max-w-5xl mx-auto">
      {/* Form */}
      <form className="w-full space-y-6">
        {/* Nama & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-left text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              maxLength={191}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-xs text-gray-500 text-right">{nama.length}/191</p>
          </div>

          <div>
            <label className="block text-left text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={191}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-xs text-gray-500 text-right">{email.length}/191</p>
          </div>
        </div>

        {/* Subjek */}
        <div>
          <label className="block text-left text-sm font-medium mb-1">Subjek</label>
          <input
            type="text"
            value={subjek}
            onChange={(e) => setSubjek(e.target.value)}
            maxLength={191}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-xs text-gray-500 text-right">{subjek.length}/191</p>
        </div>

        {/* Pesan */}
        <div>
          <label className="block text-left text-sm font-medium mb-1">Pesan</label>
          <textarea
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            maxLength={2000}
            rows={6}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-xs text-gray-500 text-right">{pesan.length}/2000</p>
        </div>

        {/* Tombol */}
        <div className="flex justify-start">
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                Kirim
            </button>
        </div>
      </form>
    </section>
  );
}
