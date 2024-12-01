import axiosClient from "../axiosClient";

const baseAuth = "users";

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
  return axiosClient.patch(`/${baseAuth}/change-password`, data);
};
