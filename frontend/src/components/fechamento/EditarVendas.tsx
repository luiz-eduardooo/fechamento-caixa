import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { editarFechamento } from "../../services/fechamentoService";
import type { FechamentoResponse } from "../../types/fechamentoType";

type Props = {
  fechamento: FechamentoResponse;
  onSalvo: () => void;
  onCancelar: () => void;
};

const inputClass =
  "w-full rounded-xl border border-[#e7e8e3] bg-[#fafbf9] px-4 py-3 text-[#191b1a] tabular-nums outline-none transition focus:border-[#1f5b58] focus:bg-white";

const Campo = ({ label, value, onChange }: { label: string; value?: number; onChange: (v?: number) => void }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-[#71756e]">{label}</label>
    <NumericFormat
      value={value} onValueChange={(v) => onChange(v.floatValue)}
      thousandSeparator="." decimalSeparator="," decimalScale={2}
      fixedDecimalScale prefix="R$ " allowNegative={false} className={inputClass}
    />
  </div>
);

const EditarVendas = ({ fechamento, onSalvo, onCancelar }: Props) => {
  const [totalVendas, setTotalVendas] = useState<number | undefined>(fechamento.totalVendas);
  const [totalPix, setTotalPix] = useState<number | undefined>(fechamento.totalPix);
  const [totalCredito, setTotalCredito] = useState<number | undefined>(fechamento.totalCredito);
  const [totalDebito, setTotalDebito] = useState<number | undefined>(fechamento.totalDebito);
  const [observacao, setObservacao] = useState(fechamento.observacao ?? "");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const handleSalvar = async (e: any) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");
    try {
      await editarFechamento(fechamento.id, {
        totalVendas: totalVendas ?? 0,
        totalPix: totalPix ?? 0,
        totalCredito: totalCredito ?? 0,
        totalDebito: totalDebito ?? 0,
        observacao,
      });
      onSalvo();
    } catch (err: any) {
      setErro("Não foi possível salvar as alterações.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSalvar} className="rounded-[20px] border border-[#e7e8e3] bg-white p-6 sm:p-8">
      <h2 className="text-lg font-bold text-[#191b1a]">Editar vendas do dia</h2>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Campo label="Total de vendas" value={totalVendas} onChange={setTotalVendas} />
        <Campo label="Pix" value={totalPix} onChange={setTotalPix} />
        <Campo label="Crédito" value={totalCredito} onChange={setTotalCredito} />
        <Campo label="Débito" value={totalDebito} onChange={setTotalDebito} />
      </div>
      <div className="mt-5 flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#71756e]">Observação</label>
        <textarea
          value={observacao} onChange={(e) => setObservacao(e.target.value)} rows={3}
          className="w-full resize-none rounded-xl border border-[#e7e8e3] bg-[#fafbf9] px-4 py-3 text-[#191b1a] outline-none transition focus:border-[#1f5b58] focus:bg-white"
        />
      </div>
      {erro && <p className="mt-4 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{erro}</p>}
      <div className="mt-6 flex gap-3">
        <button type="submit" disabled={carregando}
          className="rounded-xl bg-[#1f5b58] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3b39] disabled:opacity-60">
          {carregando ? "Salvando..." : "Salvar alterações"}
        </button>
        <button type="button" onClick={onCancelar}
          className="rounded-xl border border-[#e7e8e3] px-6 py-3 font-semibold text-[#71756e] transition hover:bg-[#fafbf9]">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditarVendas;