import axiosInstance from "./axios";

export interface Client {
  id: string;
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
  return res.data.data;
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

// Delete client
export const deleteClientAdmin = async (clientId: string): Promise<void> => {
  await axiosInstance.delete(`/admin/clients/${clientId}`);
};

// Update client (optional, kalau backend punya route PUT/PATCH)
export const updateClientAdmin = async (
  clientId: string,
  data: { name?: string; logo?: File }
): Promise<Client> => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.logo) formData.append("logo", data.logo);

  const res = await axiosInstance.put(`/admin/clients/${clientId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data;
};
