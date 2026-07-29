import { ENDPOINTS } from "../constants/endPoints";
import api from "../shared/api";
import type { fechamentoRequestDTO } from "../types/fechamentoType";

export const criarFechamento = async(dados:fechamentoRequestDTO)=>{
    const dadosApi = await api.post(ENDPOINTS.fechamento.criar, {dados})
    return dadosApi.data;
}