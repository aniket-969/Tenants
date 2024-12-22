import axiosClient from "../axiosClient";

const baseChat = "chat";

export const fetchMessages = async (roomId) => {
  const response = await axiosClient.get(`${baseChat}/${roomId}`);
  return response.data.data;
};

export const sendMessage = async (data,roomId) => {
  console.log(data,roomId)
  const response = await axiosClient.post(`${baseChat}/${roomId}/`,data);
  return response.data?.data;
};

export const deleteMessage = async (roomId, messageId) => {
  const repsonse = await axiosClient.delete(
    `${baseChat}/${roomId}/${messageId}`
  );
  return response.data?.data;
};
