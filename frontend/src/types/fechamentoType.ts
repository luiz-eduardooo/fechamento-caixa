import type { GastoResponse } from "./gastoType";

export type fechamentoRequestDTO = {
    totalPix:number,
    totalDebito:number,
    totalCredito:number,
    totalVendas:number,
    observacao:string
}

export type StatusCaixa = "ABERTO" | "FECHADO" | "CANCELADO";
export type CriadoPor = { id: string; nome: string };

export type FechamentoResponse = {
  id: number;
  createdAt: string;
  closedAt: string | null;
  usuario: CriadoPor;
  status: StatusCaixa;
  gastos: GastoResponse[];
  totalPix: number;
  totalCredito: number;
  totalDebito: number;
  totalVendas: number;
  observacao: string | null;
  data: string;
  dinheiroSubido: number;
  dinheiroEsperado: number;
  totalGastos: number;
};