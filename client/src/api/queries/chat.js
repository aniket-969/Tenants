import axiosClient from "../axiosClient";

const baseChat = "chat";

export const fetchMessages = async (roomId) => {
  const response = await axiosClient.get(`${baseChat}/${roomId}`);
  return response.data.data;
};

export const sendMessage = async (roomId) => {
  const repsonse = await axiosClient.post(`${baseChat}/${roomId}/`);
  return response.data?.data;
};

export const deleteMessage = async (roomId, messageId) => {
  const repsonse = await axiosClient.delete(
    `${baseChat}/${roomId}/${messageId}`
  );
  return response.data?.data;
};
