import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verFechamento } from "../../services/fechamentoService";
import type { FechamentoResponse } from "../../types/fechamentoType";

const formatBRL = (v?: number) => (v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const formatData = (iso: string) => new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
const formatHora = (iso: string | null) => (iso ? new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—");

const tipoLabel: Record<string, string> = {
  LIMPEZA: "Limpeza", MOTOBOY: "Motoboy", COMIDA: "Comida", FARMACIA: "Farmácia", PAPELARIA: "Papelaria", GRAFICA: "Gráfica",
};

const Valor = ({ rotulo, valor }: { rotulo: string; valor?: number }) => (
  <div>
    <p className="text-sm font-medium text-[#71756e]">{rotulo}</p>
    <p className="mt-1 font-semibold tabular-nums text-[#191b1a]">{formatBRL(valor)}</p>
  </div>
);

const HistoricoDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [f, setF] = useState<FechamentoResponse | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setF(await verFechamento(Number(id)));
      } catch {
        setErro("Fechamento não encontrado.");
      } finally {
        setCarregando(false);
      }
    })();
  }, [id]);

  if (carregando) return <div className="mx-auto max-w-3xl px-4 py-8 font-[Manrope] text-sm text-[#8a8e86]">Carregando…</div>;
  if (erro || !f) return (
    <div className="mx-auto max-w-3xl px-4 py-8 font-[Manrope]">
      <button onClick={() => navigate("/historico")} className="cursor-pointer text-sm font-semibold text-[#1f5b58] hover:underline">‹ Voltar ao histórico</button>
      <p className="mt-4 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{erro || "Não encontrado."}</p>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 font-[Manrope]">
      <button onClick={() => navigate("/historico")} className="cursor-pointer text-sm font-semibold text-[#1f5b58] hover:underline">‹ Voltar ao histórico</button>
      <h1 className="mt-3 text-3xl font-extrabold capitalize tracking-tight text-[#191b1a]">{formatData(f.data)}</h1>
      <p className="mt-1 text-[#8a8e86]">Fechado por {f.usuario?.nome ?? "—"} · aberto {formatHora(f.createdAt)} · fechado {formatHora(f.closedAt)}</p>

      <div className="mt-6 flex flex-col gap-6">
        <div className="rounded-[20px] border border-[#e7e8e3] bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-[#191b1a]">Vendas</h2>
          <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
            <Valor rotulo="Total de vendas" valor={f.totalVendas} />
            <Valor rotulo="Pix" valor={f.totalPix} />
            <Valor rotulo="Crédito" valor={f.totalCredito} />
            <Valor rotulo="Débito" valor={f.totalDebito} />
          </div>
          {f.observacao && <p className="mt-5 text-sm text-[#71756e]">Obs.: {f.observacao}</p>}
          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-[#eef0ec] pt-6 sm:grid-cols-3">
            <div className="rounded-xl bg-[#fafbf9] px-4 py-3"><p className="text-sm text-[#8a8e86]">Esperado</p><p className="mt-0.5 text-lg font-bold tabular-nums text-[#191b1a]">{formatBRL(f.dinheiroEsperado)}</p></div>
            <div className="rounded-xl bg-[#fafbf9] px-4 py-3"><p className="text-sm text-[#8a8e86]">Gastos</p><p className="mt-0.5 text-lg font-bold tabular-nums text-[#b4432f]">{f.totalGastos > 0 ? "- " : ""}{formatBRL(f.totalGastos)}</p></div>
            <div className="rounded-xl bg-[#eaf3ec] px-4 py-3"><p className="text-sm text-[#1c6b3f]">Subiu p/ cofre</p><p className="mt-0.5 text-lg font-bold tabular-nums text-[#1c6b3f]">{formatBRL(f.dinheiroSubido)}</p></div>
          </div>
        </div>

        <div className="rounded-[20px] border border-[#e7e8e3] bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-[#191b1a]">Gastos do dia</h2>
          {f.gastos.length === 0 ? (
            <p className="mt-4 text-sm text-[#a0a49b]">Nenhum gasto lançado.</p>
          ) : (
            <ul className="mt-4 divide-y divide-[#eef0ec]">
              {f.gastos.map((g) => (
                <li key={g.id} className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-[#191b1a]">{tipoLabel[g.tipoGasto] ?? g.tipoGasto}</span>
                  <span className="text-sm font-semibold tabular-nums text-[#191b1a]">{formatBRL(g.valorGasto)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoricoDetalhe;