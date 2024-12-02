import axiosClient from "../axiosClient";

const baseEvent = "event"

export const createCalendarEvent = async((data)=>{
    return axiosClient.post(`/${baseEvent}`,data)
})

export const deleteCalendarEvent = async((eventId)=>{
    return axiosClient.delete(`/${baseEvent}/${eventId}`)
})

export const getRoomCalendarEvent = async((roomId)=>{
    return axiosClient.get(`/${baseEvent}/room/${roomId}`)
})

export const getSingleCalendarEvent = async((eventId)=>{
    return axiosClient.get(`/${baseEvent}/${eventId}`)
})

export const getMonthlyCalendarEvent = async((roomId)=>{
    return axiosClient.get(`/${baseEvent}/${roomId}/monthly`)
})