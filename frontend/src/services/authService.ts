import { ENDPOINTS } from "../constants/endPoints";
import api from "../shared/api";
import type { userCadastroRequestDTO, userCadastroResponseDTO, userLoginRequestDTO, userLoginResponseDTO } from "../types/userType";



export const criarUsuario = async (usuario:userCadastroRequestDTO):Promise<userCadastroResponseDTO>=>{
    const response = await api.post(ENDPOINTS.auth.cadastro, usuario);
    return response.data;

}


export const loginUsuario = async (usuario:userLoginRequestDTO):Promise<userLoginResponseDTO>=>{
    const response = await api.post(ENDPOINTS.auth.login, usuario);
    return response.data;
}