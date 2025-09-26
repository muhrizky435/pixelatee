import axiosInstance from "./axios";

/* =====================
   TYPES
===================== */
export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  type: string;
  message: string;
}

export interface Contact {
  id: string;        // UUID
  name: string;
  email: string;
  subject: string;
  type: string;
  message: string;
  status?: "NEW" | "READ";
  createdAt?: string; // backend biasanya pakai createdAt
  updatedAt?: string;
  // opsional tambahan
  date?: string;     
  time?: string;
}


export interface ApiResponse<T> {
  status: string;
  code: number;
  data: T;
  message: string;
}


// Public API


// Kirim contact dari user publik
export const sendContactAxios = async (
  payload: ContactPayload
): Promise<ApiResponse<Contact>> => {
  const res = await axiosInstance.post<ApiResponse<Contact>>("/public/contacts", payload);
  return res.data;
};


// Admin API

// Ambil semua kontak
export const getAllContactsAdmin = async (): Promise<ApiResponse<{ contacts: Contact[] }>> => {
  const res = await axiosInstance.get<ApiResponse<{ contacts: Contact[] }>>("/admin/contacts");
  return res.data;
};


// Ambil detail contact berdasarkan ID
export const getContactByIdAdmin = async (contactId: string): Promise<Contact> => {
  const res = await axiosInstance.get(`/admin/contacts/${contactId}`);
  return res.data.data;
};


// Hapus contact
export const deleteContactAdmin = async (contactId: string) => {
  const res = await axiosInstance.delete(`/admin/contacts/${contactId}`);
  return res.data;
};

// (Opsional) Update status contact
export const updateContactStatusAdmin = async (
  contactId: string,
  status: "NEW" | "READ"
): Promise<Contact> => {
  const res = await axiosInstance.patch(`/admin/contacts/${contactId}`, { status });
  return res.data;
};
