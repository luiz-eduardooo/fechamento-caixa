import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { FechamentoResponse } from "../../types/fechamentoType";
import { useAuth } from "../../contexts/AuthContext";
import { verFechamento, reabrirCaixa, fecharCaixa } from "../../services/fechamentoService";
import EditarVendas from "../fechamento/EditarVendas";
import GastosDoDia from "../fechamento/GastosDoDia";

const formatBRL = (v?: number) => (v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const formatData = (iso: string) => new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
const formatHora = (iso: string | null) => (iso ? new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—");

const Valor = ({ rotulo, valor }: { rotulo: string; valor?: number }) => (
  <div>
    <p className="text-sm font-medium text-[#71756e]">{rotulo}</p>
    <p className="mt-1 font-semibold tabular-nums text-[#191b1a]">{formatBRL(valor)}</p>
  </div>
);

const HistoricoDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario }: any = useAuth();
  const isAdmin = usuario?.role === "ADMIN";

  const [f, setF] = useState<FechamentoResponse | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [reabrindo, setReabrindo] = useState(false);
  const [fechando, setFechando] = useState(false);
  const [editando, setEditando] = useState(false);

  const recarregar = async () => {
    try { setF(await verFechamento(Number(id))); }
    catch { setErro("Não foi possível recarregar o fechamento."); }
  };

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro("");
    setF(null);
    setEditando(false);
    (async () => {
      try {
        const dados = await verFechamento(Number(id));
        if (ativo) setF(dados);
      } catch {
        if (ativo) setErro("Fechamento não encontrado.");
      } finally {
        if (ativo) setCarregando(false);
      }
    })();
    return () => { ativo = false; };
  }, [id]);

  const handleReabrir = async () => {
    if (!f) return;
    setReabrindo(true); setErro("");
    try { await reabrirCaixa(f.id); await recarregar(); }
    catch { setErro("Não foi possível reabrir o caixa."); }
    finally { setReabrindo(false); }
  };

  const handleFechar = async () => {
    if (!f) return;
    setFechando(true); setErro("");
    try { await fecharCaixa(f.id); await recarregar(); }
    catch { setErro("Não foi possível fechar o caixa."); }
    finally { setFechando(false); }
  };

  if (carregando) return <div className="mx-auto max-w-3xl px-4 py-8 font-[Manrope] text-sm text-[#8a8e86]">Carregando…</div>;
  if (erro || !f) return (
    <div className="mx-auto max-w-3xl px-4 py-8 font-[Manrope]">
      <button onClick={() => navigate("/historico")} className="cursor-pointer text-sm font-semibold text-[#1f5b58] hover:underline">‹ Voltar ao histórico</button>
      <p className="mt-4 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{erro || "Não encontrado."}</p>
    </div>
  );

  const aberto = f.status === "ABERTO";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 font-[Manrope]">
      <button onClick={() => navigate("/historico")} className="cursor-pointer text-sm font-semibold text-[#1f5b58] hover:underline">‹ Voltar ao histórico</button>
      <h1 className="mt-3 text-3xl font-extrabold capitalize tracking-tight text-[#191b1a]">{formatData(f.data)}</h1>

      <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
        f.status === "ABERTO" ? "bg-[#eaf3ec] text-[#1c6b3f]"
        : f.status === "FECHADO" ? "bg-[#f0f1ed] text-[#71756e]"
        : "bg-[#f9ece7] text-[#b4432f]"
      }`}>
        {f.status === "ABERTO" ? "Aberto" : f.status === "FECHADO" ? "Fechado" : "Cancelado"}
      </span>

      <p className="mt-2 text-[#8a8e86]">
        Registrado por {f.usuario?.nome ?? "—"} · aberto em {formatHora(f.createdAt)}
        {f.status === "FECHADO" && <> · fechado em {formatHora(f.closedAt)}</>}
      </p>

      {isAdmin && f.status === "FECHADO" && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#e7e8e3] bg-[#fafbf9] px-4 py-3">
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#191b1a]">Reabrir caixa</p>
            <p className="text-xs text-[#8a8e86]">Volta o caixa para ABERTO, permitindo corrigir valores e gastos.</p>
          </div>
          <button onClick={handleReabrir} disabled={reabrindo}
            className="cursor-pointer rounded-lg border border-[#1f5b58] px-4 py-2 text-sm font-semibold text-[#1f5b58] transition hover:bg-[#eaf3ec] active:scale-[.98] disabled:opacity-60">
            {reabrindo ? "Reabrindo..." : "Reabrir"}
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-6">
        {aberto && editando ? (
          <EditarVendas
            fechamento={f}
            onSalvo={() => { setEditando(false); recarregar(); }}
            onCancelar={() => setEditando(false)}
          />
        ) : (
          <div className="rounded-[20px] border border-[#e7e8e3] bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#191b1a]">Vendas</h2>
              {aberto && (
                <button onClick={() => setEditando(true)}
                  className="cursor-pointer rounded-lg border border-[#e7e8e3] px-3 py-1.5 text-sm font-semibold text-[#1f5b58] transition hover:bg-[#fafbf9]">
                  Editar
                </button>
              )}
            </div>
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
        )}

        <GastosDoDia
          fechamentoId={f.id}
          gastos={f.gastos}
          totalGastos={f.totalGastos}
          podeAdicionar={aberto}
          onGastoAdicionado={recarregar}
        />

        {aberto && (
          <button onClick={handleFechar} disabled={fechando}
            className="cursor-pointer self-end rounded-xl bg-[#1f5b58] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3b39] active:scale-[.98] disabled:opacity-60">
            {fechando ? "Fechando..." : "Fechar caixa"}
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoricoDetalhe;