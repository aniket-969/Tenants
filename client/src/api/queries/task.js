import axiosClient from "../axiosClient";

const baseMaintenance = "tasks"

export const createRoomTask = async((roomId)=>{
    return axiosClient.post(`/${roomId}`)
})

export const deleteRoomTask = async((roomId,taskId)=>{
    return axiosClient.delete(`/${taskId}/${roomId}`)
})

export const updateRoomTask = async((roomId,taskId,data)=>{
    return axiosClient.patch(`/${taskId}/${roomId}`,data)
})

export const createSwitchRequest = async((roomId,taskId,data)=>{
    return axiosClient.post(`/taskSwitch/${taskId}/${roomId}`,data)
})

export const createSwitchResponse = async((roomId,taskId,data)=>{
    return axiosClient.post(`/taskSwitchResponse/${taskId}/${roomId}`,data)
})
