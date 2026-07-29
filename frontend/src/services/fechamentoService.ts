import { ENDPOINTS } from "../constants/endPoints";
import api from "../shared/api";
import type { fechamentoRequestDTO, FechamentoResponse } from "../types/fechamentoType";

export const criarFechamento = async(dados:fechamentoRequestDTO)=>{
    const dadosApi = await api.post(ENDPOINTS.fechamento.criar, {dados})
    return dadosApi.data;
}

export const verFechamentoDiario = async (): Promise<FechamentoResponse> => {
  const response = await api.get<FechamentoResponse>(ENDPOINTS.fechamento.hoje);
  return response.data;
};

export const fecharCaixa = async (id: number): Promise<FechamentoResponse> => {
  const response = await api.patch<FechamentoResponse>(ENDPOINTS.fechamento.fechar(id), {});
  return response.data;
};