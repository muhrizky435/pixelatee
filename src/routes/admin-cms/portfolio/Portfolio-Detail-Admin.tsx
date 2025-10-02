// portfolio-detail.tsx
import React, { useEffect } from "react";
import { FiEdit, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import type { Portfolio } from "../../../api/portfolio.api";
import DOMPurify from "dompurify";

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
    <div className="fixed inset-0 bg-blue-100/60 flex items-center justify-center z-40 p-1">
      <div
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-y-auto transform transition-all duration-300 animate-scaleIn
                  flex flex-col max-h-[95vh]"
      >
        {/* Header Image */}
        <div className="relative w-full flex justify-center">
          {portfolio.img && (
            <img
              src={portfolio.img}
              alt={portfolio.title}
              className="w-full mx-6 md:mx-10 my-8 h-45 md:h-65 object-cover rounded-xl shadow"
            />
          )}

          {/* Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => navigate(`/panels-admins/portfolios/edit/${portfolio.id}`)}
              className="p-2 bg-blue-100 text-gray-700 hover:bg-blue-300 rounded-full border-gray-200 shadow-xl"
            >
              <FiEdit size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-blue-100 text-gray-700 hover:bg-blue-300 rounded-full shadow-xl"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-8 py-6">
          <p className="text-sm text-gray-500 mb-2">
            {portfolio.time}, {portfolio.date}
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
            {portfolio.title}
          </h2>

          <div
            className="text-gray-700 leading-relaxed text-justify"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(portfolio.description),
            }}
          />

          {/* Gallery */}
          {portfolio.gallery && portfolio.gallery.length > 0 && (
            <>
              <h3 className="mt-8 mb-3 font-semibold">Gallery</h3>
              <div
                ref={galleryRef}
                className="flex gap-3 overflow-hidden pb-3"
              >
                {portfolio.gallery.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    alt={`gallery-${i}`}
                    className="w-45 h-28 rounded-lg object-cover flex-shrink-0 shadow"
                  />
                ))}
              </div>
            </>
          )}

          {portfolio.author && (
            <p className="text-sm text-gray-400 mt-6">
              Published by{" "}
              <span className="font-medium">
                {portfolio.author} at {portfolio.time}, {portfolio.date}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
