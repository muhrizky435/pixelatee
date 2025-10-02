import axiosInstance from "./axios";

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  status?: string;
  mainImage?: string;
  gallery?: string[];
  client?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PortfolioResponse {
  portfolios: Portfolio[];
  pagination: {
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
  };
}

/* -- API PUBLIC -- */

// Get all public portfolios
export const getAllPortfolios = async (): Promise<Portfolio[]> => {
  const res = await axiosInstance.get("/public/portfolios");
  return res.data.data;
};

// Get public portfolio detail
export const getPortfolioDetail = async (
  portfolioId: string
): Promise<Portfolio> => {
  const res = await axiosInstance.get(`/public/portfolios/${portfolioId}`);
  return res.data.data;
};


/* -- API ADMIN -- */

// Get all admin portfolios (with filter query)
export const getAllPortfoliosAdmin = async (params?: {
  page?: number;
  status?: string;
  title?: string;
  client?: string;
}): Promise<PortfolioResponse> => {
  const res = await axiosInstance.get("/admin/portfolios", { params });
  return res.data.data;
};

// Create new portfolio (handle file upload)
export const createPortfolioAdmin = async (
  data: {
    title: string;
    description?: string;
    status: string;
    client: string;
  },
  files?: File[]
): Promise<Portfolio> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("status", data.status);
  formData.append("client", data.client);
  if (data.description) formData.append("description", data.description);

  if (files && files.length > 0) {
    files.forEach((file) => {
      formData.append("photos", file);
    });
  }

  const res = await axiosInstance.post("/admin/portfolios", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data;
};


// Get admin portfolio detail
export const getPortfolioDetailAdmin = async (
  portfolioId: string
): Promise<Portfolio> => {
  const res = await axiosInstance.get(`/admin/portfolios/${portfolioId}`);
  return res.data.data;
};


// get preview edit admin portfolio
export async function getAdminPortfolioPreview(portfolioId: string) {
  const res = await axiosInstance.get<{ data: Portfolio }>(
    `/admin/portfolios/${portfolioId}/preview`
  );
  return res.data.data;
}


// Update admin portfolio
export const updatePortfolioAdmin = async (
  portfolioId: string,
  data: {
    title: string;
    description?: string;
    status: string;
    client: string;
  },
  files?: File[]
): Promise<Portfolio> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("status", data.status);
  formData.append("client", data.client);
  if (data.description) formData.append("description", data.description);

  if (files && files.length > 0) {
    files.forEach((file) => {
      formData.append("photos", file);
    });
  }

  const res = await axiosInstance.patch(`/admin/portfolios/${portfolioId}`, formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return res.data.data;
};


// Delete portfolio
export const deletePortfolioAdmin = async (
  portfolioId: string
): Promise<void> => {
  await axiosInstance.delete(`/admin/portfolios/${portfolioId}`);
};
