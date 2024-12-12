import axiosClient from "../axiosClient"

const baseAward = "awards"

export const getRoomAwards = async(roomId)=>{
    return axiosClient.get(`/${baseAward}/${roomId}`)
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
