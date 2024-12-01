import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default axiosClient