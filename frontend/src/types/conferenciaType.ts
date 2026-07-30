import type { CriadoPor } from "./fechamentoType";

export type ConferenciaRequest = {
  contagemFisica: number;
};

export type ConferenciaResponse = {
  id: number;
  dataConferencia: string;        // Instant
  contagemFisica: number;
  saldoEsperado: number | null;   // null na 1ª conferência (baseline)
  divergencia: number | null;     // null na 1ª conferência
  usuario: CriadoPor;
};