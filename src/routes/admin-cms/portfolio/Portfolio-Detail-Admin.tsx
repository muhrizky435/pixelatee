import React, { useEffect } from "react";
import { FiEdit, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import type { Portfolio } from "../../../api/portfolio.api";

// extend API type untuk UI
interface PortfolioUI extends Portfolio {
  date: string;
  time: string;
  img: string;
  author?: string;
}

interface PortfolioModalProps {
  portfolio: PortfolioUI | null;
  onClose: () => void;
  galleryRef?: React.RefObject<HTMLDivElement | null>;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ portfolio, onClose, galleryRef }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!portfolio || !galleryRef?.current) return;
    const container = galleryRef.current;

    const interval = setInterval(() => {
      if (container) {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 150, behavior: "smooth" });
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [portfolio, galleryRef]);

  if (!portfolio) return null;

  return (
    <div className="fixed inset-0 bg-blue-100/60 flex items-end justify-center z-30">
      <div className="w-full max-w-6xl bg-white rounded-t-2xl shadow-lg p-6 transform transition-all duration-300 translate-y-0 animate-slideUp">
        <div className="flex flex-col relative">
          {/* Tombol Icon */}
          <div className="flex justify-end gap-3 mb-3">
            <button
              onClick={() => navigate(`/panels-admins/portfolios/edit/${portfolio.id}`)}
              className="p-2 text-gray-600"
            >
              <FiEdit size={18} />
            </button>
            <button onClick={onClose} className="p-2 text-gray-600">
              <FiX size={18} />
            </button>
          </div>

          {/* Content 2 Kolom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kiri: Judul + Deskripsi */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{portfolio.title}</h2>
                <p className="text-gray-600 mt-3">{portfolio.description}</p>
              </div>
            </div>

            {/* Gambar Utama */}
            <img
              src={portfolio.img}
              alt={portfolio.title}
              className="w-full h-72 md:h-80 rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Gallery */}
        <h3 className="mt-8 mb-3 font-semibold">Gallery</h3>
        <div ref={galleryRef} className="flex gap-3 overflow-hidden pb-3">
          {portfolio.gallery?.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              alt={`gallery-${i}`}
              className="w-45 h-20 rounded-lg object-cover flex-shrink-0"
            />
          ))}
        </div>

        <p className="text-sm text-gray-400 mt-6">
          Publish by {portfolio.author} at {portfolio.time}, {portfolio.date}
        </p>
      </div>
    </div>
  );
};

export default PortfolioModal;
