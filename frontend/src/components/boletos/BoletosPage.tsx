import { useEffect, useMemo, useState } from "react";
import { listarBoletos, pagarBoletoDinheiro, pagarBoletoBanco, deletarBoleto } from "../../services/boletoService";
import type { BoletoResponse, StatusBoleto } from "../../types/boletoType";
import NovoBoletoForm from "./NovoBoletoForm";

const formatBRL = (v?: number) => (v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const formatData = (iso: string) => new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
const diasParaVencer = (venc: string) => {
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  return Math.round((new Date(venc + "T00:00:00").getTime() - hoje.getTime()) / 86400000);
};

const badge: Record<StatusBoleto, { txt: string; cls: string }> = {
  PENDENTE:   { txt: "Pendente",    cls: "bg-[#f0f1ed] text-[#71756e]" },
  PAGO_LOJA:  { txt: "Pago · loja", cls: "bg-[#eaf3ec] text-[#1c6b3f]" },
  PAGO_BANCO: { txt: "Pago · banco", cls: "bg-[#eef1f5] text-[#4a6b8a]" },
};

type Filtro = "TODOS" | "PENDENTE" | "PAGOS";

const BoletosPage = () => {
  const [boletos, setBoletos] = useState<BoletoResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [filtro, setFiltro] = useState<Filtro>("TODOS");
  const [pagandoId, setPagandoId] = useState<number | null>(null);

  const carregar = async () => {
    setErro("");
    try {
      const dados = await listarBoletos();
      dados.sort((a, b) => a.dataVencimento.localeCompare(b.dataVencimento)); // vence antes primeiro
      setBoletos(dados);
    } catch {
      setErro("Não foi possível carregar os boletos.");
    } finally {
      setCarregando(false);
    }
  };
  useEffect(() => { carregar(); }, []);

  const fornecedoresSugeridos = useMemo(
    () => Array.from(new Set(boletos.map((b) => b.nomeFornecedor))).sort(),
    [boletos]
  );

  const visiveis = boletos.filter((b) =>
    filtro === "TODOS" ? true : filtro === "PENDENTE" ? b.statusBoleto === "PENDENTE" : b.statusBoleto !== "PENDENTE"
  );

  const pagar = async (id: number, via: "dinheiro" | "banco") => {
    setErro("");
    try {
      await (via === "dinheiro" ? pagarBoletoDinheiro(id) : pagarBoletoBanco(id));
      setPagandoId(null);
      carregar();
    } catch { setErro("Não foi possível pagar o boleto."); }
  };

  const excluir = async (id: number) => {
    setErro("");
    try { await deletarBoleto(id); carregar(); }
    catch { setErro("Não foi possível excluir o boleto."); }
  };

  const tabClass = (ativo: boolean) =>
    `cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition ${ativo ? "bg-[#1f5b58] text-white" : "text-[#71756e] hover:bg-[#f0f1ed]"}`;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 font-[Manrope]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#191b1a]">Boletos</h1>
          <p className="mt-1 text-[#8a8e86]">Contas a pagar da loja.</p>
        </div>
        <button onClick={() => setMostrarForm((v) => !v)}
          className="cursor-pointer rounded-xl bg-[#1f5b58] px-5 py-2.5 font-semibold text-white transition hover:bg-[#0f3b39] active:scale-[.98]">
          {mostrarForm ? "Fechar" : "Novo boleto"}
        </button>
      </div>

      {mostrarForm && (
        <div className="mt-6">
          <NovoBoletoForm
            fornecedoresSugeridos={fornecedoresSugeridos}
            onCriado={() => { setMostrarForm(false); carregar(); }}
          />
        </div>
      )}

      <div className="mt-6 flex gap-2">
        <button className={tabClass(filtro === "TODOS")} onClick={() => setFiltro("TODOS")}>Todos</button>
        <button className={tabClass(filtro === "PENDENTE")} onClick={() => setFiltro("PENDENTE")}>Pendentes</button>
        <button className={tabClass(filtro === "PAGOS")} onClick={() => setFiltro("PAGOS")}>Pagos</button>
      </div>

      {erro && <p className="mt-4 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{erro}</p>}

      {carregando ? (
        <p className="mt-8 text-sm text-[#8a8e86]">Carregando…</p>
      ) : visiveis.length === 0 ? (
        <p className="mt-6 rounded-[20px] border border-dashed border-[#e7e8e3] bg-white px-4 py-10 text-center text-sm text-[#a0a49b]">
          Nenhum boleto {filtro === "PENDENTE" ? "pendente" : filtro === "PAGOS" ? "pago" : ""}.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {visiveis.map((b) => {
            const dias = diasParaVencer(b.dataVencimento);
            const pendente = b.statusBoleto === "PENDENTE";
            const vencido = pendente && dias < 0;
            const venceProximo = pendente && dias >= 0 && dias <= 3;
            return (
              <div key={b.id} className={`rounded-[18px] border bg-white p-5 transition ${vencido ? "border-[#e6b3a8]" : "border-[#e7e8e3]"}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#191b1a]">{b.nomeFornecedor}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge[b.statusBoleto].cls}`}>{badge[b.statusBoleto].txt}</span>
                    </div>
                    <p className="mt-1 text-sm text-[#8a8e86]">
                      Vence {formatData(b.dataVencimento)}
                      {vencido && <span className="ml-1 font-semibold text-[#b4432f]">· vencido há {Math.abs(dias)}d</span>}
                      {venceProximo && <span className="ml-1 font-semibold text-[#b4432f]">· vence em {dias}d</span>}
                    </p>
                    <p className="mt-0.5 break-all text-xs text-[#a0a49b]">Cód.: {b.codigoDeBarras}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold tabular-nums text-[#191b1a]">{formatBRL(b.valor)}</p>
                  </div>
                </div>

                {pendente && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#eef0ec] pt-4">
                    {pagandoId === b.id ? (
                      <>
                        <span className="text-sm text-[#71756e]">Pagar pelo:</span>
                        <button onClick={() => pagar(b.id, "dinheiro")}
                          className="cursor-pointer rounded-lg bg-[#1f5b58] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[#0f3b39]">
                          Caixa <span className="opacity-80">(sai do cofre)</span>
                        </button>
                        <button onClick={() => pagar(b.id, "banco")}
                          className="cursor-pointer rounded-lg border border-[#e7e8e3] px-3 py-1.5 text-sm font-semibold text-[#4a6b8a] transition hover:bg-[#fafbf9]">
                          Banco
                        </button>
                        <button onClick={() => setPagandoId(null)}
                          className="cursor-pointer px-2 py-1.5 text-sm text-[#a0a49b] hover:underline">cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setPagandoId(b.id)}
                          className="cursor-pointer rounded-lg border border-[#1f5b58] px-3 py-1.5 text-sm font-semibold text-[#1f5b58] transition hover:bg-[#eaf3ec]">
                          Pagar
                        </button>
                        <button onClick={() => excluir(b.id)}
                          className="cursor-pointer px-2 py-1.5 text-sm font-medium text-[#b4432f] transition hover:underline">
                          excluir
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BoletosPage;