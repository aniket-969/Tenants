import axiosClient from "../axiosClient";

const baseMaintenance = "maintenance"

export const createMaintenance = async((roomId)=>{
    return axiosClient.post(`/${roomId}`)
})

export const deleteMaintenance = async((roomId,maintenanceId)=>{
    return axiosClient.delete(`/${maintenanceId}/${roomId}`)
})

export const updateMaintenance = async((roomId,maintenanceId,data)=>{
    return axiosClient.patch(`/${maintenanceId}/${roomId}`,data)
})

