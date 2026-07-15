import axios from "axios";
import { keys } from "../keys/keys";

const api = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 10000,
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})


api.interceptors.request.use((config)=>{
    const token = localStorage.getItem(keys.token)
    if(token && config.headers){
    config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
})