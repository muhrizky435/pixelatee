import axiosInstance from "./axios";


export interface NewsletterPayload {
  title: string;
  content: string;
  type: "TECH" | "BUSINESS" | "INTERNAL" | "OTHER";
  isScheduled: boolean;
  status?: "PUBLISHED"; 
  file?: File | null;
}

export interface NewsletterJoinRequest {
  email: string;
}

export interface NewsletterResponse {
  id: string;
  title: string;
  content: string;
  type: string;
  status?: "PUBLISHED";
  isScheduled: boolean;
  sendAt: string;
  createdAt: string;
  photo?: string;
  author: string;
}

/* 
  -- PUBLIC API --
*/
export async function joinNewsletter(data: NewsletterJoinRequest) {
  return axiosInstance.post("/public/newsletters/join", data);
}



/* 
  -- ADMIN API --
*/

// Get Admin Newsletter
export async function getAdminNewsletters(filters?: {
  status?: string;
  type?: string;
  search?: string;
}) {
  return axiosInstance.get<{ data: NewsletterResponse[] }>(
    "/admin/newsletters",
    { params: filters }
  );
}

// Get Admin Detail Newsletter 
export async function getAdminNewsletterDetail(newsletterId: string) {
  return axiosInstance.get<{ data: NewsletterResponse }>(
    `/admin/newsletters/${newsletterId}`
  );
}

// Create Admin Newsletter
export async function createAdminNewsletter(data: NewsletterPayload) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("type", data.type);
  formData.append("isScheduled", String(data.isScheduled));
  formData.append("status", data.status || "PUBLISHED");
  if (data.file) formData.append("photo", data.file);


  return axiosInstance.post("/admin/newsletters", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Get Admin Newsletter Preview (untuk edit)
export async function getAdminNewsletterPreview(newsletterId: string) {
  const res = await axiosInstance.get<{ data: NewsletterResponse }>(
    `/admin/newsletters/${newsletterId}/preview`
  );
  return res.data.data;
}

// Update Admin Newsletter
export async function updateAdminNewsletter(
  newsletterId: string,
  data: NewsletterPayload
) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("type", data.type);
  formData.append("isScheduled", data.isScheduled ? "true" : "false");
  formData.append("status", data.status || "PUBLISHED");
  if (data.file) formData.append("photo", data.file);

  return axiosInstance.patch(`/admin/newsletters/${newsletterId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Delete Admin Newsletter
export const deleteNewsletter = async (newsletterId: string) => {
  const response = await axiosInstance.delete(`/admin/newsletters/${newsletterId}`);
  return response.data;
};

// Get Admin Scheduled Newsletters
export async function getAdminScheduledNewsletters() {
  const res = await axiosInstance.get<{ data: NewsletterResponse[] }>(
    "/admin/newsletters/scheduled"
  );
  return res.data.data;
}

