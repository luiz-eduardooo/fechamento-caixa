import api from "../shared/api";
import { ENDPOINTS } from "../constants/endPoints";
import type { BoletoRequest, BoletoResponse } from "../types/boletoType";

export const listarBoletos = async (): Promise<BoletoResponse[]> => {
  const r = await api.get<BoletoResponse[]>(ENDPOINTS.boleto.base);
  return r.data;
};

export const criarBoleto = async (dto: BoletoRequest): Promise<BoletoResponse> => {
  const r = await api.post<BoletoResponse>(ENDPOINTS.boleto.criar, dto);
  return r.data;
};

export const pagarBoletoDinheiro = async (id: number): Promise<BoletoResponse> => {
  const r = await api.patch<BoletoResponse>(ENDPOINTS.boleto.pagarDinheiro(id), {});
  return r.data;
};

export const pagarBoletoBanco = async (id: number): Promise<BoletoResponse> => {
  const r = await api.patch<BoletoResponse>(ENDPOINTS.boleto.pagarBanco(id), {});
  return r.data;
};

export const deletarBoleto = async (id: number): Promise<void> => {
  await api.delete(ENDPOINTS.boleto.deletar(id));
};