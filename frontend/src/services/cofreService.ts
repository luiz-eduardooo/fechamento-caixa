import api from "../shared/api";
import { ENDPOINTS } from "../constants/endPoints";
import type { ConferenciaRequest, ConferenciaResponse } from "../types/conferenciaType";

export const listarConferencias = async (): Promise<ConferenciaResponse[]> => {
  const r = await api.get<ConferenciaResponse[]>(ENDPOINTS.cofre.base);
  return r.data;
};

export const criarConferencia = async (dto: ConferenciaRequest): Promise<ConferenciaResponse> => {
  const r = await api.post<ConferenciaResponse>(ENDPOINTS.cofre.criar, dto);
  return r.data;
};