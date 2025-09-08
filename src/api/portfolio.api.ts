import axiosInstance from "./axios";

export interface Portfolio {
  id: string;
  type: string;
  title: string;
  description: string;
  mainImage: string;
  gallery?: string[];
}

export const getAllPortfolios = async (): Promise<Portfolio[]> => {
  const res = await axiosInstance.get("/public/portfolios");
  return res.data.data;
};

export const getPortfolioDetail = async (portfolioId: string): Promise<Portfolio> => {
  const res = await axiosInstance.get(`/public/portfolios/${portfolioId}`);
  return res.data.data;
};
