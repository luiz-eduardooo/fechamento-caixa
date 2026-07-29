import api from "../shared/api";
import { ENDPOINTS } from "../constants/endPoints";
import type { GastoRequest, GastoResponse } from "../types/gastoType";

export const adicionarGasto = async (
  fechamentoId: number,
  dto: GastoRequest
): Promise<GastoResponse> => {
  const response = await api.post<GastoResponse>(
    ENDPOINTS.fechamento.gasto(fechamentoId),
    dto
  );
  return response.data;
};