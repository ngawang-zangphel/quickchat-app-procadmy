import axios from "axios";

export const url = "https://quickchat-app-server-j9aj.onrender.com";

export const axiosInstance = axios.create({
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
});