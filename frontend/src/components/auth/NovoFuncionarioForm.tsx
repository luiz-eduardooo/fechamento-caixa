import { useState } from "react";
import { cadastrarUsuario } from "../../services/userService";

type Props = { onCriado: () => void };

const inputClass =
  "w-full rounded-xl border border-[#e7e8e3] bg-[#fafbf9] px-4 py-3 text-[#191b1a] outline-none transition focus:border-[#1f5b58] focus:bg-white";

const NovoFuncionarioForm = ({ onCriado }: Props) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!nome || !email || !password) { setErro("Preencha todos os campos."); return; }
    if (password.length < 6) { setErro("A senha precisa ter ao menos 6 caracteres."); return; }
    setCarregando(true); setErro(""); setSucesso("");
    try {
      await cadastrarUsuario({ nome, email, password });
      setSucesso(`${nome} cadastrada com sucesso!`);
      setNome(""); setEmail(""); setPassword("");
      onCriado();
    } catch (err: any) {
      if (err.response?.status === 409) setErro("Já existe um usuário com esse email.");
      else setErro("Não foi possível cadastrar o funcionário.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[20px] border border-[#e7e8e3] bg-white p-6 sm:p-8">
      <h2 className="text-lg font-bold text-[#191b1a]">Cadastrar funcionário</h2>
      <p className="mt-1 text-sm text-[#8a8e86]">A conta nasce como <span className="font-semibold text-[#71756e]">Vendedora</span>.</p>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-sm font-medium text-[#71756e]">Nome completo</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#71756e]">E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#71756e]">Senha provisória</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </div>
      </div>

      {erro && <p className="mt-4 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{erro}</p>}
      {sucesso && <p className="mt-4 rounded-xl bg-[#eaf3ec] px-4 py-3 text-sm font-medium text-[#1c6b3f]">{sucesso}</p>}

      <button type="submit" disabled={carregando}
        className="mt-6 cursor-pointer rounded-xl bg-[#1f5b58] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3b39] active:scale-[.98] disabled:opacity-60">
        {carregando ? "Cadastrando..." : "Cadastrar funcionário"}
      </button>
    </form>
  );
};

export default NovoFuncionarioForm;