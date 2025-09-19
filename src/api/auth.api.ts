import axiosInstance from "./axios";

// Login
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  code: number;
  data: {
    id: string;
    email: string;
    role: string;
    token: string;
  };
  message: string;
}

// Register
export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: string;
  code: number;
  data: {
    id: string;
    email: string;
    role: string;
  };
  message: string;
}

export const loginApi = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/public/auth/login",
    payload,
    { withCredentials: true }
  );
  return response.data;
};

export const registerApi = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const response = await axiosInstance.post<RegisterResponse>(
    "/public/auth/register",
    payload,
    { withCredentials: true }
  );
  return response.data;
};

