export type StatusBoleto = "PENDENTE" | "PAGO_LOJA" | "PAGO_BANCO";

export type BoletoRequest = {
  nomeFornecedor: string;
  valor: number;
  codigoDeBarras: string;
  dataVencimento: string; // yyyy-MM-dd (LocalDate)
  dataChegada: string;    // yyyy-MM-dd (LocalDate)
};

export type BoletoResponse = {
  id: number;
  nomeFornecedor: string;
  valor: number;
  codigoDeBarras: string;
  dataVencimento: string;
  dataChegada: string;
  dataPagamento: string | null; // Instant
  statusBoleto: StatusBoleto;
};