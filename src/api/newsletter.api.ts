import axiosInstance from "./axios";

export interface NewsletterJoinRequest {
  email: string;
}

export async function joinNewsletter(data: NewsletterJoinRequest) {
  return axiosInstance.post("/public/newsletters/join", data);
}