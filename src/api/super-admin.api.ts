import axiosInstance from "./axios";

export interface Admin {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: string;
  dateOfBirth?: string;
  address?: {
    city?: string | null;
    country?: string | null;
    zipCode?: string | null;
  };
}

export interface AdminListResponse {
  admins: Admin[];
  pagination: {
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
  };
}

export interface AdminRegisterRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  userRole: "ADMIN" | "SUPER_ADMIN";
  dateOfBirth: string;
  address: {
    city?: string | null;
    country?: string | null;
    zipCode?: string | null;
  };
}


// Register Admin
export async function registerAdmin(data: AdminRegisterRequest) {
  const res = await axiosInstance.post("/super-admin/admins/register", data);
  return res.data;
}

// Get Admin List
export async function getAdminList(
  page = 1,
  search?: string,
  role?: string
): Promise<AdminListResponse> {
  const params: Record<string, string | number> = { page };

  if (search && search.trim() !== "") {
    params.search = search;
  }
  if (role && role.trim() !== "") {
    params.role = role;
  }

  const res = await axiosInstance.get("/super-admin/admins", { params });
  return res.data.data;
}

// Update Admin
export const updateAdmin = async (adminId: number, data: Partial<Admin>) => {
  const res = await axiosInstance.patch(`/super-admin/admins/${adminId}`, data);
  return res.data;
};

// Delete Admin
export const deleteAdmin = async (adminId: number | string) => {
  const res = await axiosInstance.delete(`/super-admin/admins/${adminId}`);
  return res.data;
};
