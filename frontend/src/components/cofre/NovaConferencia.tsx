import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { criarConferencia } from "../../services/cofreService";

type Props = { onCriada: () => void };

const NovaConferencia = ({ onCriada }: Props) => {
  const [contagemFisica, setContagemFisica] = useState<number | undefined>(undefined);
  const [confirmando, setConfirmando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const salvar = async () => {
    if (!contagemFisica) { setErro("Informe o valor contado."); return; }
    setCarregando(true);
    setErro("");
    try {
      await criarConferencia({ contagemFisica });
      setContagemFisica(undefined);
      setConfirmando(false);
      onCriada();
    } catch {
      setErro("Não foi possível registrar a conferência.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="rounded-[20px] border border-[#e7e8e3] bg-white p-6 sm:p-8">
      <h2 className="text-lg font-bold text-[#191b1a]">Nova conferência</h2>
      <p className="mt-1 text-sm text-[#8a8e86]">
        Conte todo o dinheiro do cofre e informe o total. O sistema compara com o esperado desde a última conferência.
      </p>

      <div className="mt-5 flex flex-col gap-1.5 sm:max-w-xs">
        <label className="text-sm font-medium text-[#71756e]">Valor contado no cofre</label>
        <NumericFormat
          value={contagemFisica} onValueChange={(v) => setContagemFisica(v.floatValue)}
          thousandSeparator="." decimalSeparator="," decimalScale={2}
          fixedDecimalScale prefix="R$ " allowNegative={false}
          className="w-full rounded-xl border border-[#e7e8e3] bg-[#fafbf9] px-4 py-3 text-[#191b1a] tabular-nums outline-none transition focus:border-[#1f5b58] focus:bg-white"
        />
      </div>

      {erro && <p className="mt-4 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{erro}</p>}

      {!confirmando ? (
        <button onClick={() => { if (!contagemFisica) { setErro("Informe o valor contado."); return; } setErro(""); setConfirmando(true); }}
          className="mt-6 cursor-pointer rounded-xl bg-[#1f5b58] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3b39] active:scale-[.98]">
          Registrar conferência
        </button>
      ) : (
        <div className="mt-6 rounded-xl border border-[#e7e8e3] bg-[#fafbf9] p-4">
          <p className="text-sm text-[#71756e]">
            Confirmar contagem de <span className="font-bold text-[#191b1a] tabular-nums">
              {(contagemFisica ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>? Isso registra um marco no histórico e não pode ser desfeito.
          </p>
          <div className="mt-3 flex gap-2">
            <button onClick={salvar} disabled={carregando}
              className="cursor-pointer rounded-lg bg-[#1f5b58] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f3b39] disabled:opacity-60">
              {carregando ? "Registrando..." : "Confirmar"}
            </button>
            <button onClick={() => setConfirmando(false)} disabled={carregando}
              className="cursor-pointer rounded-lg border border-[#e7e8e3] px-4 py-2 text-sm font-semibold text-[#71756e] transition hover:bg-white">
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NovaConferencia;