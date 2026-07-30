import { useEffect, useState } from "react";
import { listarUsuarios } from "../../services/userService";
import type { UserResponse } from "../../types/userType";

const FuncionariosPage = () => {
  const [usuarios, setUsuarios] = useState<UserResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregar = async () => {
    setErro("");
    try { setUsuarios(await listarUsuarios()); }
    catch { setErro("Não foi possível carregar a equipe."); }
    finally { setCarregando(false); }
  };
  useEffect(() => { carregar(); }, []);

  const iniciais = (nome: string) =>
    nome.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 font-[Manrope]">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#191b1a]">Funcionários</h1>
      <p className="mt-1 text-[#8a8e86]">Equipe cadastrada no sistema.</p>

      {erro && <p className="mt-6 rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{erro}</p>}

      {carregando ? (
        <p className="mt-8 text-sm text-[#8a8e86]">Carregando…</p>
      ) : usuarios.length === 0 ? (
        <p className="mt-6 rounded-[20px] border border-dashed border-[#e7e8e3] bg-white px-4 py-10 text-center text-sm text-[#a0a49b]">
          Nenhum funcionário cadastrado.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {usuarios.map((u) => (
            <div key={u.id} className="flex items-center gap-3 rounded-[18px] border border-[#e7e8e3] bg-white p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1f5b58] text-sm font-bold text-white">{iniciais(u.nome)}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[#191b1a]">{u.nome}</p>
                <p className="truncate text-sm text-[#8a8e86]">{u.email}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${u.role === "ADMIN" ? "bg-[#eaf3ec] text-[#1c6b3f]" : "bg-[#f0f1ed] text-[#71756e]"}`}>
                {u.role === "ADMIN" ? "Gerente" : "Vendedora"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FuncionariosPage;