import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:3000"
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

export const signup = async (data) => {
    const res = await API.post("/signup" , data);
    return res.data;
}

export const signin = async (data) => {
    const res = await API.post("/signin" , data);
    localStorage.setItem("token" , res.data.token);
    return res.data;
}

export const submitKYC = async (formData) => {
    const res = await API.post("/kyc" , formData );
    return res.data;
}


export default API;