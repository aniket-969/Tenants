import axiosClient from "../axiosClient";

const baseRoom = "room";

export const createRoom = async (data) => {
  return axiosClient.post(`/${baseRoom}`, data);
};

export const addUserRequest = async (data, roomId) => {
  return axiosClient.post(`/${baseRoom}/${roomId}/request`, data);
};

export const adminResponse = async (data, roomId) => {
  return axiosClient.post(`/${baseRoom}/${roomId}/response`, data);
};

export const updateRoom = async (roomId, data) => {
  return axiosClient.patch(`/${baseRoom}/${roomId}`, data);
};

export const deleteRoom = async (data, roomId) => {
  return axiosClient.delete(`/${baseRoom}/${roomId}`, data);
};

export const getRoom = async (data, roomId) => {
  return axiosClient.get(`/${baseRoom}/${roomId}`, data);
};

export const leaveRoom = async (data, roomId) => {
  return axiosClient.patch(`/${baseRoom}/${roomId}/leave`, data);
};

export const adminTransfer = async (data) => {
  return axiosClient.post(`/${baseRoom}/${roomId}/admin/transfer`);
};
