import axiosClient from "../axiosClient";

const baseMaintenance = "maintenance"

export const createMaintenance = async((roomId,data)=>{
    return axiosClient.post(`${baseMaintenance}/${roomId}`,data)
})
 
export const deleteMaintenance = async((roomId,maintenanceId)=>{
    return axiosClient.delete(`${baseMaintenance}/${maintenanceId}/${roomId}`)
}){baseMaintenance}

export const updateMaintenance = async((roomId,maintenanceId,data)=>{
    return axiosClient.patch(`${baseMaintenance}/${maintenanceId}/${roomId}`,data)
})

