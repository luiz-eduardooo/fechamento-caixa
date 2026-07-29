import { useEffect, useState } from "react";
import { verFechamentoDiario, fecharCaixa } from "../../services/fechamentoService";
import type { FechamentoResponse } from "../../types/fechamentoType";
import CriarFechamentoComponent from "./CriarFechamentoComponent";
import GastosDoDia from "./GastosDoDia";

const formatBRL = (v?: number) =>
  (v ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const hojeExtenso = () =>
  new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

const Valor = ({ rotulo, valor }: { rotulo: string; valor?: number }) => (
  <div>
    <p className="text-sm font-medium text-[#71756e]">{rotulo}</p>
    <p className="mt-1 font-semibold tabular-nums text-[#191b1a]">{formatBRL(valor)}</p>
  </div>
);

const FechamentoDoDia = () => {
  const [fechamento, setFechamento] = useState<FechamentoResponse | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [fechando, setFechando] = useState(false);
  const [erro, setErro] = useState("");

  const buscarFechamentoDoDia = async () => {
    setErro("");
    try {
      const dados = await verFechamentoDiario();
      setFechamento(dados);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setFechamento(null); // ainda não há fechamento hoje
      } else {
        setErro("Não foi possível carregar o fechamento de hoje.");
      }
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { buscarFechamentoDoDia(); }, []);

  const handleFechar = async () => {
    if (!fechamento) return;
    setFechando(true);
    setErro("");
    try {
      await fecharCaixa(fechamento.id);
      await buscarFechamentoDoDia();
    } catch (err: any) {
      setErro("Não foi possível fechar o caixa.");
    } finally {
      setFechando(false);
    }
  };

  const aberto = fechamento?.status === "ABERTO";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 font-[Manrope]">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#191b1a]">Fechamento do dia</h1>
      <p className="mt-1 capitalize text-[#8a8e86]">{hojeExtenso()}</p>

      {carregando ? (
        <p className="mt-8 text-sm text-[#8a8e86]">Carregando…</p>
      ) : fechamento == null ? (
        <div className="mt-8">
          <CriarFechamentoComponent onCriado={buscarFechamentoDoDia} />
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          <div className="rounded-[20px] border border-[#e7e8e3] bg-white p-6">
            <div className="flex items-center gap-2.5">
              <span className={`h-2.5 w-2.5 rounded-full ${aberto ? "bg-[#2e9e5b]" : "bg-[#8a8e86]"}`} />
              <span className="text-lg font-bold text-[#191b1a]">{aberto ? "Caixa aberto" : "Caixa fechado"}</span>
            </div>
            <p className="mt-1 pl-5 text-sm text-[#8a8e86]">
              {aberto
                ? "Revise os valores, lance os gastos e feche o caixa quando terminar."
                : "O fechamento de hoje já foi registrado. Valores em modo leitura."}
            </p>
          </div>

          <div className="rounded-[20px] border border-[#e7e8e3] bg-white p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#191b1a]">Vendas do dia</h2>
            <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
              <Valor rotulo="Total de vendas" valor={fechamento.totalVendas} />
              <Valor rotulo="Pix" valor={fechamento.totalPix} />
              <Valor rotulo="Crédito" valor={fechamento.totalCredito} />
              <Valor rotulo="Débito" valor={fechamento.totalDebito} />
            </div>
            {fechamento.observacao && (
              <div className="mt-5">
                <p className="text-sm font-medium text-[#71756e]">Observação</p>
                <p className="mt-1 text-[#191b1a]">{fechamento.observacao}</p>
              </div>
            )}
            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-[#eef0ec] pt-6 sm:grid-cols-2">
              <div className="rounded-xl bg-[#fafbf9] px-4 py-3">
                <p className="text-sm text-[#8a8e86]">Dinheiro esperado</p>
                <p className="mt-0.5 text-lg font-bold tabular-nums text-[#191b1a]">{formatBRL(fechamento.dinheiroEsperado)}</p>
              </div>
              <div className="rounded-xl bg-[#eaf3ec] px-4 py-3">
                <p className="text-sm text-[#1c6b3f]">Sobe para o cofre</p>
                <p className="mt-0.5 text-lg font-bold tabular-nums text-[#1c6b3f]">{formatBRL(fechamento.dinheiroSubido)}</p>
              </div>
            </div>
          </div>

          <GastosDoDia
            fechamentoId={fechamento.id}
            gastos={fechamento.gastos}
            totalGastos={fechamento.totalGastos}
            podeAdicionar={aberto}
            onGastoAdicionado={buscarFechamentoDoDia}
          />

          {aberto && (
            <button
              onClick={handleFechar} disabled={fechando}
              className="self-end rounded-xl bg-[#1f5b58] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3b39] disabled:opacity-60"
            >
              {fechando ? "Fechando..." : "Fechar caixa"}
            </button>
          )}
        </div>
      )}

      {erro && (
        <p className="mt-4 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{erro}</p>
      )}
    </div>
  );
};

export default FechamentoDoDia;