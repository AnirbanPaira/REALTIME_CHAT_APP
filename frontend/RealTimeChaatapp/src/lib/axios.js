import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://realtime-chatapp-backend-c6sg.onrender.com";

export const axiosInstance = axios.create({
    baseURL:`${API_URL}/api`,
    withCredentials:true
})
