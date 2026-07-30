import { useEffect, useState } from "react";
import { listarConferencias } from "../../services/cofreService";
import type { ConferenciaResponse } from "../../types/conferenciaType";
import NovaConferencia from "./NovaConferencia";

const formatBRL = (v?: number | null) =>
  (v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const formatDataHora = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const CofrePage = () => {
  const [conferencias, setConferencias] = useState<ConferenciaResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregar = async () => {
    setErro("");
    try {
      const dados = await listarConferencias();
      dados.sort((a, b) => b.dataConferencia.localeCompare(a.dataConferencia)); // mais recente primeiro
      setConferencias(dados);
    } catch {
      setErro("Não foi possível carregar as conferências.");
    } finally {
      setCarregando(false);
    }
  };
  useEffect(() => { carregar(); }, []);

  const ultima = conferencias[0]; // mais recente (lista já ordenada desc)

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 font-[Manrope]">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#191b1a]">Cofre</h1>
      <p className="mt-1 text-[#8a8e86]">Conferência do dinheiro guardado no cofre.</p>

      {/* card de saldo — usa o saldoEsperado da última conferência (não há endpoint de saldo puro) */}
      <div className="mt-6 rounded-[20px] border border-[#e7e8e3] bg-[#1f5b58] p-6 sm:p-8 text-white">
        <p className="text-sm text-white/70">
          {ultima
            ? (ultima.saldoEsperado != null ? "Saldo esperado na última conferência" : "Última conferência (baseline)")
            : "Cofre ainda não conferido"}
        </p>
        <p className="mt-1 text-4xl font-extrabold tabular-nums">
          {ultima ? formatBRL(ultima.saldoEsperado ?? ultima.contagemFisica) : formatBRL(0)}
        </p>
        {ultima && (
          <p className="mt-2 text-sm text-white/70">
            Última contagem física: <span className="font-semibold tabular-nums">{formatBRL(ultima.contagemFisica)}</span> · {formatDataHora(ultima.dataConferencia)}
          </p>
        )}
      </div>

      <div className="mt-6">
        <NovaConferencia onCriada={carregar} />
      </div>

      <h2 className="mt-8 text-lg font-bold text-[#191b1a]">Histórico de conferências</h2>
      {erro && <p className="mt-4 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{erro}</p>}

      {carregando ? (
        <p className="mt-4 text-sm text-[#8a8e86]">Carregando…</p>
      ) : conferencias.length === 0 ? (
        <p className="mt-4 rounded-[20px] border border-dashed border-[#e7e8e3] bg-white px-4 py-10 text-center text-sm text-[#a0a49b]">
          Nenhuma conferência registrada ainda.
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {conferencias.map((c) => {
            const baseline = c.saldoEsperado == null; // 1ª conferência
            const div = c.divergencia ?? 0;
            const bate = !baseline && div === 0;
            const falta = !baseline && div < 0;
            return (
              <div key={c.id} className="rounded-[18px] border border-[#e7e8e3] bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#191b1a]">{formatDataHora(c.dataConferencia)}</p>
                    <p className="mt-1 text-sm text-[#8a8e86]">
                      Contado <span className="font-semibold tabular-nums text-[#191b1a]">{formatBRL(c.contagemFisica)}</span>
                      {!baseline && <> · esperado <span className="font-semibold tabular-nums">{formatBRL(c.saldoEsperado)}</span></>}
                    </p>
                    <p className="mt-0.5 text-xs text-[#a0a49b]">por {c.usuario?.nome ?? "—"}</p>
                  </div>
                  <div className="text-right">
                    {baseline ? (
                      <span className="rounded-full bg-[#f0f1ed] px-3 py-1 text-xs font-semibold text-[#71756e]">Ponto de partida</span>
                    ) : bate ? (
                      <span className="rounded-full bg-[#eaf3ec] px-3 py-1 text-xs font-semibold text-[#1c6b3f]">Bateu certinho</span>
                    ) : (
                      <div className={`rounded-xl px-3 py-2 ${falta ? "bg-[#f9ece7]" : "bg-[#eaf3ec]"}`}>
                        <p className={`text-xs font-semibold ${falta ? "text-[#b4432f]" : "text-[#1c6b3f]"}`}>
                          {falta ? "Faltou" : "Sobrou"}
                        </p>
                        <p className={`text-lg font-bold tabular-nums ${falta ? "text-[#b4432f]" : "text-[#1c6b3f]"}`}>
                          {formatBRL(Math.abs(div))}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CofrePage;