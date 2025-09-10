import { FiX, FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

interface NewsletterDetailModalProps {
  newsletter: {
    id: number;
    title: string;
    type: string;
    date: string;
    time: string;
    desc: string;
    img: string;
    gallery?: string[];
    author?: string;
    publishTime?: string;
  } | null;
  onClose: () => void;
}

export default function NewsletterDetailModal({
  newsletter,
  onClose,
}: NewsletterDetailModalProps) {
  const navigate = useNavigate();
  const galleryRef = useRef<HTMLDivElement>(null);

  if (!newsletter) return null;

  return (
    <div className="fixed inset-0 bg-blue-100/60 flex items-center justify-center z-40">
      {/* Wrapper Modal */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-scaleIn min-h-screen mt-22 flex flex-col">
        {/* Gambar Header */}
        <div className="relative w-full p-6">
          <img
            src={newsletter.img}
            alt={newsletter.title}
            className="w-full h-56 md:h-72 object-cover rounded-xl shadow"
          />
          {/* Tombol Edit + Close */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button
              onClick={() =>
                navigate(`/panels-admins/newsletter/edit/${newsletter.id}`)
              }
              className="m-1 p-2 bg-white/80 text-gray-700 hover:bg-white rounded-full shadow"
            >
              <FiEdit size={18} />
            </button>
            <button
              onClick={onClose}
              className="m-1 p-2 bg-white/80 text-gray-700 hover:bg-white rounded-full shadow"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Konten scrollable */}
        <div className="px-6 pb-6 overflow-y-auto flex-1">
          {/* Info Newsletter */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              {newsletter.time}, {newsletter.date}
            </p>
            <span className="inline-block bg-gray-900 text-white text-xs px-2 py-1 rounded">
              {newsletter.type}
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-4">
              {newsletter.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{newsletter.desc}</p>
          </div>

          {/* Gallery */}
          {newsletter.gallery && newsletter.gallery.length > 0 && (
            <>
              <h3 className="mt-8 mb-3 font-semibold">Gallery</h3>
              <div
                ref={galleryRef}
                className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide"
              >
                {newsletter.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="gallery"
                    className="w-40 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                ))}
              </div>
            </>
          )}

          {/* Footer */}
          {newsletter.author && newsletter.publishTime && (
            <p className="text-sm text-gray-400 mt-6">
              Published by{" "}
              <span className="font-medium">{newsletter.author}</span> at{" "}
              {newsletter.publishTime}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
