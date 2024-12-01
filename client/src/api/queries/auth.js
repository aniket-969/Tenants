import axiosClient from "../axiosClient";

const baseAuth = 'users'

export const registerUser = async(data)=>{
    return axiosClient.post(`/${baseAuth}/register`,data)
}