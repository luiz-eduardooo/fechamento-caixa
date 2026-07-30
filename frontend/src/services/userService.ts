import api from "../shared/api";
import { ENDPOINTS } from "../constants/endPoints";
import type { UserResponse, CadastroRequest } from "../types/userType";

export const listarUsuarios = async (): Promise<UserResponse[]> => {
  const r = await api.get<UserResponse[]>(ENDPOINTS.user.listar);
  return r.data;
};

export const cadastrarUsuario = async (dto: CadastroRequest): Promise<UserResponse> => {
  const r = await api.post<UserResponse>(ENDPOINTS.auth.cadastro, dto);
  return r.data;
};