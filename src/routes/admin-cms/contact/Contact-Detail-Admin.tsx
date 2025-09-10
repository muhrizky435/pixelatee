import { FiX } from "react-icons/fi";

interface ContactDetailModalProps {
  contact: {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    date?: string;
    time?: string;
  } | null;
  onClose: () => void;
}

export default function ContactDetailModal({
  contact,
  onClose,
}: ContactDetailModalProps) {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 bg-blue-100/60 flex items-center justify-center z-40">
      {/* Wrapper Modal */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-scaleIn min-h-screen mt-22 flex flex-col">
        {/* Gambar Header */}
        <div className="relative w-full p-6">
          <div>
            <p className="text-md text-gray-600">
              From :{" "}
              <span className="font-medium text-gray-800">
                {contact.name} ||
              </span>{" "}
              <span className="text-gray-600">{contact.email}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full transition justify-self-end absolute top-6 right-6 bg-white/50 hover:bg-gray-300 shadow"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-800">
            {contact.subject}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {contact.message}
          </p>
        </div>

        {/* Footer (opsional, kalau mau info tambahan) */}
        {(contact.date || contact.time) && (
          <div className="px-6 py-3 border-t text-sm text-gray-500">
            {contact.date && <span>{contact.date}</span>}
            {contact.time && <span> • {contact.time}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
