import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { getContactByIdAdmin } from "../../../api/contact.api";
import type { Contact } from "../../../api/contact.api";

// mapping label type
const TYPE_LABELS: Record<string, string> = {
  CUSTOMER_SERVICE: "Customer Service",
  IT_CONSULTATION: "IT Consultation",
  UIUX_DEVELOPMENT: "UI/UX Development",
  MOBILE_DEVELOPMENT: "Mobile Development",
  WEB_DEVELOPMENT: "Web Development",
  OTHER: "Other",
};

interface ContactDetailModalProps {
  contactId: string | null;
  onClose: () => void;
}

export default function ContactDetailModal({
  contactId,
  onClose,
}: ContactDetailModalProps) {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!contactId) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const contactData = await getContactByIdAdmin(contactId);
        setContact(contactData);
      } catch (err) {
        console.error("Failed to fetch contact detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [contactId]);

  if (!contactId) return null;

  return (
    <div className="fixed inset-0 bg-blue-100/60 flex items-center justify-center z-40">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-scaleIn max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative w-full p-6 border-b">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <p className="text-md text-gray-600">
              From :{" "}
              <span className="font-medium text-gray-800">
                {contact?.name}
              </span>{" "}
              | <span className="text-gray-600">{contact?.email}</span>
            </p>
          )}
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full transition absolute top-6 right-6 bg-white/50 hover:bg-gray-300 shadow"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto">
          {loading ? (
            <p className="text-gray-500">Loading detail...</p>
          ) : contact ? (
            <>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Type</p>
                <p className="text-base font-medium text-gray-800">
                  {TYPE_LABELS[contact.type] ?? contact.type}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">Subject</p>
                <h2 className="text-lg font-semibold text-gray-800">
                  {contact.subject}
                </h2>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">Message</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {contact.message}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No detail found</p>
          )}
        </div>

        {/* Footer */}
        {(contact?.date || contact?.time) && (
          <div className="px-6 py-3 border-t text-sm text-gray-500">
            {contact?.date && <span>{contact.date}</span>}
            {contact?.time && <span> • {contact.time}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
