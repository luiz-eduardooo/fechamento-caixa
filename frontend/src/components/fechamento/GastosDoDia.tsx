import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { adicionarGasto } from "../../services/gastoService";
import type { GastoResponse, TipoGasto } from "../../types/gastoType";
import { removerGasto } from "../../services/fechamentoService";

type Props = {
    fechamentoId: number;
    gastos: GastoResponse[];
    totalGastos: number;
    podeAdicionar: boolean;        // true quando o caixa está ABERTO
    onGastoAdicionado: () => void; // pai re-busca o fechamento
};

const TIPOS: { valor: TipoGasto; label: string }[] = [
    { valor: "LIMPEZA", label: "Limpeza" },
    { valor: "MOTOBOY", label: "Motoboy" },
    { valor: "COMIDA", label: "Comida" },
    { valor: "FARMACIA", label: "Farmácia" },
    { valor: "PAPELARIA", label: "Papelaria" },
    { valor: "GRAFICA", label: "Gráfica" },
];

const labelDoTipo = (t: TipoGasto) => TIPOS.find((x) => x.valor === t)?.label ?? t;
const formatBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const inputClass =
    "w-full rounded-xl border border-[#e7e8e3] bg-[#fafbf9] px-4 py-3 text-[#191b1a] outline-none transition focus:border-[#1f5b58] focus:bg-white";

const GastosDoDia = ({ fechamentoId, gastos, totalGastos, podeAdicionar, onGastoAdicionado }: Props) => {
    const [tipoGasto, setTipoGasto] = useState<TipoGasto | "">("");
    const [valorGasto, setValorGasto] = useState<number | undefined>(undefined);
    const [carregando, setCarregando] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!tipoGasto || !valorGasto) {
            setError("Escolha o tipo e informe o valor.");
            return;
        }
        setCarregando(true);
        setError("");
        try {
            await adicionarGasto(fechamentoId, { tipoGasto, valorGasto });
            setTipoGasto("");
            setValorGasto(undefined);
            onGastoAdicionado(); // re-busca o fechamento → lista e derivados corretos, da fonte da verdade
        } catch (err: any) {
            setError("Não foi possível adicionar o gasto. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    };

    const handleRemover = async (gastoId: number) => {
        setError("");
        try {
            await removerGasto(fechamentoId, gastoId);
            onGastoAdicionado(); // mesmo refetch — traz lista e derivados atualizados
        } catch (err: any) {
            setError("Não foi possível remover o gasto.");
        }
    };

    return (
        <div className="rounded-[20px] border border-[#e7e8e3] bg-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-[#191b1a]">Gastos do dia</h2>
                    <p className="mt-1 text-sm text-[#8a8e86]">
                        Todo gasto sai da <span className="font-semibold text-[#71756e]">gaveta em dinheiro</span> e reduz o que sobe para o cofre.
                    </p>
                </div>
                <div className="whitespace-nowrap text-right">
                    <span className="text-sm text-[#8a8e86]">Total </span>
                    <span className="font-bold tabular-nums text-[#b4432f]">
                        {totalGastos > 0 ? `- ${formatBRL(totalGastos)}` : formatBRL(0)}
                    </span>
                </div>
            </div>

            {podeAdicionar && (
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div className="flex flex-1 flex-col gap-1.5">
                        <label className="text-sm font-medium text-[#71756e]">Tipo</label>
                        <select value={tipoGasto} onChange={(e) => setTipoGasto(e.target.value as TipoGasto)} className={inputClass}>
                            <option value="">Selecione…</option>
                            {TIPOS.map((t) => (
                                <option key={t.valor} value={t.valor}>{t.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-1 flex-col gap-1.5">
                        <label className="text-sm font-medium text-[#71756e]">Valor</label>
                        <NumericFormat
                            value={valorGasto}
                            onValueChange={(values) => setValorGasto(values.floatValue)}
                            thousandSeparator="." decimalSeparator="," decimalScale={2}
                            fixedDecimalScale prefix="R$ " allowNegative={false} className={inputClass}
                        />
                    </div>

                    <button
                        type="submit" disabled={carregando}
                        className="rounded-xl bg-[#1f5b58] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3b39] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {carregando ? "Adicionando..." : "Adicionar gasto"}
                    </button>
                </form>
            )}

            {error && (
                <p className="mt-3 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{error}</p>
            )}

            <div className="mt-6">
                {gastos.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-[#e7e8e3] px-4 py-6 text-center text-sm text-[#a0a49b]">
                        Nenhum gasto lançado hoje.
                    </p>
                ) : (
                    <ul className="flex flex-col divide-y divide-[#eef0ec]">
                        {gastos.map((g) => (
                            <li key={g.id} className="flex items-center justify-between py-3">
                                <span className="text-sm font-medium text-[#191b1a]">{labelDoTipo(g.tipoGasto)}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold tabular-nums text-[#191b1a]">{formatBRL(g.valorGasto)}</span>
                                    {podeAdicionar && (
                                        <button onClick={() => handleRemover(g.id)}
                                            className="text-sm font-medium text-[#b4432f] transition hover:underline">
                                            remover
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default GastosDoDia;