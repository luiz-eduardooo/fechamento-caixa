export type TipoGasto =
  | "LIMPEZA"
  | "MOTOBOY"
  | "COMIDA"
  | "FARMACIA"
  | "PAPELARIA"
  | "GRAFICA";

export type GastoRequest = {
  tipoGasto: TipoGasto;
  valorGasto: number;
};

export type GastoResponse = {
  id: number;
  tipoGasto: TipoGasto;
  valorGasto: number;
};