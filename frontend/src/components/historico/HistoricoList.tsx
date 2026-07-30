import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verTodosFechamentos } from "../../services/fechamentoService";
import type { FechamentoResponse, StatusCaixa } from "../../types/fechamentoType";

const formatBRL = (v?: number) => (v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const formatData = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

const badge: Record<StatusCaixa, string> = {
  ABERTO: "bg-[#eaf3ec] text-[#1c6b3f]",
  FECHADO: "bg-[#f0f1ed] text-[#71756e]",
  CANCELADO: "bg-[#f9ece7] text-[#b4432f]",
};
const rotuloStatus: Record<StatusCaixa, string> = { ABERTO: "Aberto", FECHADO: "Fechado", CANCELADO: "Cancelado" };

const HistoricoList = () => {
  const [fechamentos, setFechamentos] = useState<FechamentoResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setFechamentos(await verTodosFechamentos());
      } catch {
        setErro("Não foi possível carregar o histórico.");
      } finally {
        setCarregando(false);
      }
    })();
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 font-[Manrope]">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#191b1a]">Histórico</h1>
      <p className="mt-1 text-[#8a8e86]">Todos os fechamentos registrados.</p>

      {carregando ? (
        <p className="mt-8 text-sm text-[#8a8e86]">Carregando…</p>
      ) : erro ? (
        <p className="mt-8 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{erro}</p>
      ) : fechamentos.length === 0 ? (
        <p className="mt-8 rounded-[20px] border border-dashed border-[#e7e8e3] bg-white px-4 py-10 text-center text-sm text-[#a0a49b]">
          Nenhum fechamento registrado ainda.
        </p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-[20px] border border-[#e7e8e3] bg-white">
          <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr_auto] gap-4 border-b border-[#eef0ec] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#a0a49b] sm:grid">
            <span>Data</span><span>Status</span><span>Total de vendas</span><span>Subiu p/ cofre</span><span></span>
          </div>
          <ul className="divide-y divide-[#eef0ec]">
            {fechamentos.map((f) => (
              <li
                key={f.id}
                onClick={() => navigate(`/historico/${f.id}`)}
                className="grid cursor-pointer grid-cols-2 gap-4 px-6 py-4 transition hover:bg-[#fafbf9] active:bg-[#f4f5f2] sm:grid-cols-[1.2fr_1fr_1fr_1fr_auto] sm:items-center"
              >
                <span className="font-semibold text-[#191b1a]">{formatData(f.data)}</span>
                <span>
                  <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${badge[f.status]}`}>
                    {rotuloStatus[f.status]}
                  </span>
                </span>
                <span className="tabular-nums text-[#191b1a]">{formatBRL(f.totalVendas)}</span>
                <span className="tabular-nums font-semibold text-[#1c6b3f]">{formatBRL(f.dinheiroSubido)}</span>
                <span className="hidden text-[#a0a49b] sm:block">›</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HistoricoList;