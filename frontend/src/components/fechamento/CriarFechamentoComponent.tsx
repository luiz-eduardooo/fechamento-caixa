import { useState } from "react";
import { NumericFormat } from "react-number-format";
import type { fechamentoRequestDTO } from "../../types/fechamentoType";
import { criarFechamento } from "../../services/fechamentoService";

const fechamentoInicial: fechamentoRequestDTO = {
  totalDebito: 0, totalPix: 0, totalVendas: 0, totalCredito: 0, observacao: "",
};

// classe compartilhada dos inputs de dinheiro (mata a repetição)
const inputClass =
  "w-full rounded-xl border border-[#e7e8e3] bg-[#fafbf9] px-4 py-3 text-[#191b1a] " +
  "tabular-nums outline-none transition focus:border-[#1f5b58] focus:bg-white";


type Props = { onCriado?: () => void };
const CriarFechamentoComponent = ({onCriado}:Props) => {
  const [fechamento, setFechamento] = useState<fechamentoRequestDTO>(fechamentoInicial);
  const [error, setError] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleValor =
    (name: keyof fechamentoRequestDTO) =>
    (values: { floatValue?: number }) =>
      setFechamento(prev => ({ ...prev, [name]: values.floatValue ?? 0 }));

  const handleObservacao = (e: any) =>
    setFechamento(prev => ({ ...prev, observacao: e.target.value }));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setCarregando(true);
    setError("");
    setMensagem("");
    try {
      await criarFechamento(fechamento);
      setMensagem("Fechamento criado com sucesso!");
      setFechamento(fechamentoInicial);
      onCriado?.();
    } catch (error: any) {
      if (error.response?.status === 409) {
        setError("Fechamento já criado no dia.");
      } else {
        setError("Erro ao conectar. Tente novamente!");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f5f2] px-4 py-10 font-[Manrope]">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-xl rounded-[20px] border border-[#e7e8e3] bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-[#191b1a]">Abrir caixa</h1>
        <p className="mt-1 text-sm text-[#8a8e86]">Informe os valores do dia.</p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#71756e]">Total de vendas</label>
            <NumericFormat
              value={fechamento.totalVendas} onValueChange={handleValor("totalVendas")}
              thousandSeparator="." decimalSeparator="," decimalScale={2}
              fixedDecimalScale prefix="R$ " allowNegative={false} className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#71756e]">Pix</label>
            <NumericFormat
              value={fechamento.totalPix} onValueChange={handleValor("totalPix")}
              thousandSeparator="." decimalSeparator="," decimalScale={2}
              fixedDecimalScale prefix="R$ " allowNegative={false} className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#71756e]">Crédito</label>
            <NumericFormat
              value={fechamento.totalCredito} onValueChange={handleValor("totalCredito")}
              thousandSeparator="." decimalSeparator="," decimalScale={2}
              fixedDecimalScale prefix="R$ " allowNegative={false} className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#71756e]">Débito</label>
            <NumericFormat
              value={fechamento.totalDebito} onValueChange={handleValor("totalDebito")}
              thousandSeparator="." decimalSeparator="," decimalScale={2}
              fixedDecimalScale prefix="R$ " allowNegative={false} className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#71756e]">Observação</label>
          <textarea
            name="observacao" value={fechamento.observacao} onChange={handleObservacao}
            rows={3}
            className="w-full resize-none rounded-xl border border-[#e7e8e3] bg-[#fafbf9] px-4 py-3 text-[#191b1a] outline-none transition focus:border-[#1f5b58] focus:bg-white"
          />
        </div>

        <button
          type="submit" disabled={carregando}
          className="mt-8 w-full rounded-xl bg-[#1f5b58] py-3.5 font-semibold text-white transition hover:bg-[#0f3b39] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {carregando ? "Abrindo..." : "Abrir caixa"}
        </button>

        {error && (
          <p className="mt-4 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{error}</p>
        )}
        {mensagem && (
          <p className="mt-4 rounded-xl bg-[#eaf3ec] px-4 py-3 text-sm font-medium text-[#1c6b3f]">{mensagem}</p>
        )}
      </form>
    </div>
  );
};

export default CriarFechamentoComponent;