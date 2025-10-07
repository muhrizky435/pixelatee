import axiosInstance from "./axios";

export interface Client {
  id: string;
  // realId: string;
  localKey: string;
  name: string;
  logo: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientResponse {
  clients: Client[];
  pagination?: {
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
  };
}


// Get all admin clients
export const getAllClientsAdmin = async (): Promise<Client[]> => {
  const res = await axiosInstance.get("/admin/clients");

  // Karena backend mengembalikan array of { clients: [...] }
  const data = res.data.data;
  if (Array.isArray(data) && data[0]?.clients) {
    return data[0].clients; // ambil array clients dari objek pertama
  }

  // fallback kalau format berubah nanti
  return Array.isArray(data) ? data : [];
};



// Create client (with logo upload)
export const createClientAdmin = async (
  name: string,
  logo: File
): Promise<Client> => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("logo", logo);

  const res = await axiosInstance.post("/admin/clients", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data;
};


// Delete portfolio
export const deleteClientAdmin = async (
  clientId: string
): Promise<void> => {
  await axiosInstance.delete(`/admin/clients/${clientId}`);
};

// Update client
export const updateClientAdmin = async (
  clientId: string,
  data: { name?: string; logo?: File }
): Promise<Client> => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.logo) formData.append("logo", data.logo);

  const res = await axiosInstance.patch(`/admin/clients/${clientId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data;
};


// Get clients khusus untuk portfolio form
export const getClientsForPortfolioForm = async (): Promise<Client[]> => {
  const res = await axiosInstance.get("/admin/clients/form");
  return res.data.data;
};

// logo
export const getClientLogoUrl = (logo?: string | null) => {
  if (!logo) return "/img/Logo.png"; // fallback jika logo belum ada
  const BASE_URL = "http://localhost:3000";
  return `${BASE_URL}/client/${encodeURIComponent(logo)}`;
};


