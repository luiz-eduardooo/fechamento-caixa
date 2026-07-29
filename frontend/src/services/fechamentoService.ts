import { ENDPOINTS } from "../constants/endPoints";
import api from "../shared/api";
import type { fechamentoRequestDTO, FechamentoResponse, FechamentoUpdate } from "../types/fechamentoType";

export const criarFechamento = async(dados:fechamentoRequestDTO)=>{
    const dadosApi = await api.post(ENDPOINTS.fechamento.criar, dados)
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


export const editarFechamento = async (id: number, dto: FechamentoUpdate): Promise<FechamentoResponse> => {
  const response = await api.put<FechamentoResponse>(ENDPOINTS.fechamento.editar(id), dto);
  return response.data;
};

export const removerGasto = async (fechamentoId: number, gastoId: number): Promise<FechamentoResponse> => {
  const response = await api.delete<FechamentoResponse>(ENDPOINTS.fechamento.removerGasto(fechamentoId, gastoId));
  return response.data;
};