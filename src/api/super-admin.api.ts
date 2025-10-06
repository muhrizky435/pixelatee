import axiosInstance from "./axios";

export interface Admin {
  id: string;
  name: string;
  email: string;
  img: string;
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

export interface AdminPermission {
  canReadAdmin: boolean;
  canWriteAdmin: boolean;
  canUpdateAdmin: boolean;
  canDeleteAdmin: boolean;

  canReadClient: boolean;
  canWriteClient: boolean;
  canUpdateClient: boolean;
  canDeleteClient: boolean;

  canReadContact: boolean;
  canWriteContact: boolean;
  canUpdateContact: boolean;
  canDeleteContact: boolean;

  canReadNewsletter: boolean;
  canWriteNewsletter: boolean;
  canUpdateNewsletter: boolean;
  canDeleteNewsletter: boolean;

  canReadPortfolio: boolean;
  canWritePortfolio: boolean;
  canUpdatePortfolio: boolean;
  canDeletePortfolio: boolean;
}

export interface AdminDetail {
  id: string;
  name: string;
  email: string;
  img: string;
  phoneNumber?: string;
  role: string;
  dateOfBirth?: string;
  address?: {
    city?: string | null;
    country?: string | null;
    zipCode?: string | null;
  };
  permissions: AdminPermission;
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

// Get Detail Admin
export const getAdminDetail = async (adminId: string): Promise<AdminDetail> => {
  const res = await axiosInstance.get(`/super-admin/admins/${adminId}`);
  return res.data;
};

// Update Permissions
export const updateAdminPermissions = async (
  adminId: string,
  permissions: AdminPermission
): Promise<AdminDetail> => {
  const res = await axiosInstance.patch(
    `/super-admin/admins/${adminId}/permissions`,
    permissions
  );
  return res.data.data;
};

