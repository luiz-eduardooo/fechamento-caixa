import axios from "axios";
import { keys } from "../keys/keys";
import { ENDPOINTS } from "../constants/endPoints";

const api = axios.create({
    baseURL: "http://localhost:8080",
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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const url = error.config?.url;   // a URL da requisição que falhou
        const foiLogin = url === ENDPOINTS.auth.login;

        if (error.response?.status === 401 && !foiLogin) {
            // 401 numa rota protegida = sessão expirou
            localStorage.removeItem(keys.token);
            localStorage.removeItem(keys.usuario);
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;