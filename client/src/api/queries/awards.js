import axiosClient from "../axiosClient"

const baseAward = "awards"

export const getRoomAwards = async(roomId)=>{
    const response = await axiosClient.get(`/${baseAward}/${roomId}`)
    return response.data.data?.awards
}

export const createRoomAward = async(roomId,data)=>{
    return axiosClient.post(`/${baseAward}/${roomId}`,data)
}

export const deleteRoomAward = async(roomId,awardId)=>{
    return axiosClient.delete(`/${baseAward}/${roomId}/${awardId}`)
}

export const updateRoomAward = async(roomId,awardId,data)=>{
    return axiosClient.patch(`/${baseAward}/${roomId}/${awardId}`,data)
}
