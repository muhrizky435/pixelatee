import axiosInstance from "./axios";

export interface DashboardChart {
  date: string;
  count: number;
}

export interface DashboardResponse {
  chart: DashboardChart[];
}

export const getDashboard = async () => {
  const res = await axiosInstance.get<{ 
    status: string; 
    code: number; 
    data: DashboardResponse; 
    message: string 
  }>("/users/dashboard");
  
  return res.data.data;
};
