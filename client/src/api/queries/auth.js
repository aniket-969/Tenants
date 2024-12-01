import axiosClient from "../axiosClient";

const baseAuth = 'users'

export const registerUser = async()=>{
    return axiosClient.post(`/${baseAuth}/register`)
}