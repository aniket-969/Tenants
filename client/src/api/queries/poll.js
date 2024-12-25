import axiosClient from "../axiosClient";

const basePoll = "poll";

export const createPoll = async (data,roomId) => {
  // console.log(data,roomId)
  return axiosClient.post(`${basePoll}/${roomId}/polls`, data);
};

export const castVote = async (pollId, optionId, data) => {
  return axiosClient.patch(
    `/${basePoll}/${pollId}/vote/${optionId}`,
    data
  );
};

// Delete a specific poll
export const deletePoll = async (pollId) => {
  return axiosClient.delete(`/${basePoll}/${pollId}`);
};

// Update details of a specific poll
export const updatePoll = async (pollId, data) => {
  return axiosClient.patch(`/${basePoll}/${pollId}`, data);
};

// Get all polls for a specific room
export const getRoomPolls = async (roomId) => {
  return axiosClient.get(`/${basePoll}/room/${roomId}`);
};
