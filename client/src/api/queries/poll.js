import axiosClient from "../axiosClient";

const basePoll = "poll"

export const createPoll = async((roomId,data)=>{
    return axiosClient.post(`${basePoll}/room/${roomId}`,data)
})

export const castVote = async (pollId, optionId, data) => {
    return axiosClient.post(`/${basePoll}/${pollId}/option/${optionId}/vote`, data);
  };
  
  // Update details of a specific poll
  export const updatePoll = async (pollId, data) => {
    return axiosClient.patch(`/${basePoll}/${pollId}`, data);
  };
  
  // Get all polls for a specific room
  export const getRoomPolls = async (roomId) => {
    return axiosClient.get(`/${basePoll}/room/${roomId}`);
  };
  
  // Delete a specific poll
  export const deletePoll = async (pollId) => {
    return axiosClient.delete(`/${basePoll}/${pollId}`);
  };