import { FiX, FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { NewsletterResponse } from "../../../api/newsletter.api";
import { getAdminNewsletterDetail } from "../../../api/newsletter.api";
import DOMPurify from "dompurify";

interface NewsletterDetailModalProps {
  newsletter: NewsletterResponse | null;
  onClose: () => void;
}

export default function NewsletterDetailModal({
  newsletter,
  onClose,
}: NewsletterDetailModalProps) {
  const navigate = useNavigate();

  const [detail, setDetail] = useState<NewsletterResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!newsletter) return;
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getAdminNewsletterDetail(newsletter.id);
        setDetail(res.data.data);
      } catch (err) {
        console.error("Failed fetch newsletter detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [newsletter]);

  if (!newsletter) return null;

  return (
    <div className="fixed inset-0 bg-blue-100/60 flex items-center justify-center z-40 p-1">
      <div
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-y-auto transform transition-all duration-300 animate-scaleIn
                  flex flex-col max-h-[95vh]"
      >
        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center flex-1 p-6">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        {!loading && detail && (
          <>
            {/* Gambar Header */}
            <div className="relative w-full flex justify-center">
              {detail.photo && (
                <img
                  src={`${
                    import.meta.env.VITE_API_URL || "http://localhost:3000"
                  }/newsletter/${detail.photo}`}
                  alt={detail.title}
                  className="w-full mx-6 md:mx-10 my-8 h-45 md:h-65 object-cover rounded-md shadow"
                />
              )}

              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() =>
                    navigate(`/panels-admins/newsletter/edit/${newsletter.id}`)
                  }
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

            {/* Konten scrollable */}
            <div className="px-6 md:px-8 py-6">
              <p className="text-sm text-gray-500 mb-2">
                {new Date(detail.createdAt).toLocaleString()}
              </p>
              <span className="inline-block bg-gray-900 text-white text-xs px-2 py-1 rounded">
                {detail.type}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-4">
                {detail.title}
              </h2>

              <div
                className="text-gray-700 leading-relaxed text-justify"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(detail.content),
                }}
              />

              {detail.author && (
                <p className="text-sm text-gray-400 mt-6">
                  Published by{" "}
                  <span className="font-medium">
                    {detail.author +
                      " at " +
                      new Date(detail.createdAt).toLocaleString()}
                  </span>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
