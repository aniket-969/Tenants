import axiosClient from "../axiosClient";

const baseAuth = "users";

export const fetchSession = async () => {
  const response = axiosClient.get(`/${baseAuth}/session`);
  return response.data?.data;
};

export const registerUser = async (data) => {
  return axiosClient.post(`/${baseAuth}/register`, data);
};

export const loginUser = async (data) => {
  return axiosClient.post(`/${baseAuth}/login`, data);
};

export const logOut = async (data) => {
  return axiosClient.post(`/${baseAuth}/logout`, data);
};

export const refreshTokens = async (data) => {
  return axiosClient.post(`/${baseAuth}/refreshTokens`, data);
};

export const updateUser = async (data) => {
  return axiosClient.patch(`/${baseAuth}/update-user`, data);
};

export const changePassword = async (data) => {
  return axiosClient.post(`/${baseAuth}/change-password`, data);
};
