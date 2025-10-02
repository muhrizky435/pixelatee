import axiosInstance from "./axios";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photo?: string | null;
  phoneNumber: string;
  userRole: string;
  password: string;
  dateOfBirth?: string | null;
  addresses: {
    city: string;
    country: string;
    zipCode: string;
  };
  permissions?: Record<string, boolean>;
}


// get user profile
export const getUserProfile = async (): Promise<UserProfile> => {
  const res = await axiosInstance.get("/users/profiles");
  return res.data.data;
};

// get personal info preview
export const getPersonalInfoPreview = async (): Promise<UserProfile> => {
  const res = await axiosInstance.get("/users/profiles/personal-info/preview");
  return res.data.data;
};

// update personal info
export type PersonalInfoUpdate = {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: string;
};

export const updatePersonalInfo = async (data: PersonalInfoUpdate) => {
  const payload: PersonalInfoUpdate = { ...data };

  if (payload.dateOfBirth && /^\d{4}-\d{2}-\d{2}$/.test(payload.dateOfBirth)) {
    payload.dateOfBirth = new Date(payload.dateOfBirth).toISOString();
  }

  const res = await axiosInstance.patch("/users/profiles/personal-info", payload);
  return res.data;
};

// get addresses preview
export const getAddressPreview = async (): Promise<{
  country: string;
  city: string;
  zipCode: string;
}> => {
  const res = await axiosInstance.get("/users/profiles/addresses/preview");
  const data = res.data.data;

  return {
    country: data.addresses.country,
    city: data.addresses.city,
    zipCode: data.addresses.zipCode,
  };
};


// update address
export const updateAddress = async (data: {
  country: string;
  city: string;
  zipCode: string;
}) => {
  const res = await axiosInstance.patch("/users/profiles/addresses", data);
  return res.data;
};

// update password
export const updatePassword = async (password: string) => {
  const res = await axiosInstance.patch("/users/profiles/password", {
    password,
  });
  return res.data;
};


// update photo
export const updatePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append("photo", file);

  const res = await axiosInstance.patch("/users/profiles/photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// logout User
export const logoutUser = async () => {
  const res = await axiosInstance.post("/users/logout");
  return res.data;
};

