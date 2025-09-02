import axiosInstance from "./axios";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// versi axios
export const sendContactAxios = async (payload: ContactPayload) => {
  const res = await axiosInstance.post("/public/contacts", payload);
  return res.data;
};

