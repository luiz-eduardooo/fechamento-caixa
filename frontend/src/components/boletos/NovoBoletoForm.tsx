import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { criarBoleto } from "../../services/boletoService";

type Props = {
  fornecedoresSugeridos: string[];
  onCriado: () => void;
};

const inputClass =
  "w-full rounded-xl border border-[#e7e8e3] bg-[#fafbf9] px-4 py-3 text-[#191b1a] outline-none transition focus:border-[#1f5b58] focus:bg-white";

const NovoBoletoForm = ({ fornecedoresSugeridos, onCriado }: Props) => {
  const [nomeFornecedor, setNomeFornecedor] = useState("");
  const [valor, setValor] = useState<number | undefined>(undefined);
  const [codigoDeBarras, setCodigoDeBarras] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [dataChegada, setDataChegada] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!nomeFornecedor || !valor || !codigoDeBarras || !dataVencimento || !dataChegada) {
      setErro("Preencha todos os campos.");
      return;
    }
    setCarregando(true);
    setErro("");
    try {
      await criarBoleto({ nomeFornecedor, valor, codigoDeBarras, dataVencimento, dataChegada });
      setNomeFornecedor(""); setValor(undefined); setCodigoDeBarras("");
      setDataVencimento(""); setDataChegada("");
      onCriado();
    } catch {
      setErro("Não foi possível cadastrar o boleto.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[20px] border border-[#e7e8e3] bg-white p-6 sm:p-8">
      <h2 className="text-lg font-bold text-[#191b1a]">Novo boleto</h2>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#71756e]">Fornecedor</label>
          <input
            list="fornecedores" value={nomeFornecedor}
            onChange={(e) => setNomeFornecedor(e.target.value)}
            placeholder="Digite ou escolha" className={inputClass}
          />
          <datalist id="fornecedores">
            {fornecedoresSugeridos.map((f) => <option key={f} value={f} />)}
          </datalist>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#71756e]">Valor</label>
          <NumericFormat
            value={valor} onValueChange={(v) => setValor(v.floatValue)}
            thousandSeparator="." decimalSeparator="," decimalScale={2}
            fixedDecimalScale prefix="R$ " allowNegative={false} className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-sm font-medium text-[#71756e]">Código de barras</label>
          <input value={codigoDeBarras} onChange={(e) => setCodigoDeBarras(e.target.value)} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#71756e]">Vencimento</label>
          <input type="date" value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#71756e]">Chegada</label>
          <input type="date" value={dataChegada} onChange={(e) => setDataChegada(e.target.value)} className={inputClass} />
        </div>
      </div>
      {erro && <p className="mt-4 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{erro}</p>}
      <button type="submit" disabled={carregando}
        className="mt-6 cursor-pointer rounded-xl bg-[#1f5b58] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3b39] active:scale-[.98] disabled:opacity-60">
        {carregando ? "Salvando..." : "Cadastrar boleto"}
      </button>
    </form>
  );
};

export default NovoBoletoForm;