import axiosClient from "../axiosClient";

const baseEvent = "event"

export const createCalendarEvent = async((data,roomId)=>{
    return axiosClient.post(`/${baseEvent}/${roomId}`,data)
})

export const deleteCalendarEvent = async((roomId,eventId)=>{
    return axiosClient.delete(`/${baseEvent}/${roomId}/${eventId}`)
})

export const getSingleCalendarEvent = async((eventId)=>{
    return axiosClient.get(`/${baseEvent}/${roomId}/${eventId}`)
})

export const getRoomCalendarEvent = async((roomId)=>{
    return axiosClient.get(`/${baseEvent}/room/${roomId}`)
})

export const getMonthlyCalendarEvent = async((roomId)=>{
    return axiosClient.get(`/${baseEvent}/room/${roomId}/monthly`)
})