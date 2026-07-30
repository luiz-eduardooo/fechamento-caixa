import { useState, type ReactNode } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type Item = { to: string; label: string; icon: ReactNode };

const ic = "h-[18px] w-[18px]";
const icones = {
  dashboard: <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  fechamento: <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 15l2 2 4-4"/></svg>,
  historico: <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  boletos: <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3h14v18l-2-1.5L15 21l-2-1.5L11 21l-2-1.5L7 21 5 19.5z"/><path d="M9 8h6M9 12h6"/></svg>,
  cofre: <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="12" r="3.2"/><path d="M12 15.2V18"/></svg>,
  equipe: <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.5a3.2 3.2 0 0 1 0 7M18 20c0-2.4-1-4.5-2.6-5.7"/></svg>,
};

const AppLayout = () => {
  const { usuario, sair }: any = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const isAdmin = usuario?.role === "ADMIN";
  const nome: string = usuario?.nome ?? "Usuário";
  const iniciais = nome.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();

  const geral: Item[] = [
    { to: "/dashboard", label: "Dashboard", icon: icones.dashboard },
    { to: "/fechamento", label: "Fechamento do dia", icon: icones.fechamento },
    { to: "/historico", label: "Histórico", icon: icones.historico },
  ];
  const controle: Item[] = [
    { to: "/boletos", label: "Boletos", icon: icones.boletos },
    { to: "/cofre", label: "Cofre / Conferência", icon: icones.cofre },
  ];
  const equipe: Item[] = [
    { to: "/funcionarios", label: "Funcionários", icon: icones.equipe },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition cursor-pointer active:scale-[.98] ${
      isActive ? "bg-[#1f5b58] text-white" : "text-[#71756e] hover:bg-[#f0f1ed]"
    }`;

  const Secao = ({ titulo, itens }: { titulo: string; itens: Item[] }) => (
    <div>
      <p className="px-3 pb-1.5 pt-4 text-[10.5px] font-bold uppercase tracking-wider text-[#a0a49b]">{titulo}</p>
      <div className="flex flex-col gap-1">
        {itens.map((i) => (
          <NavLink key={i.to} to={i.to} className={linkClass} onClick={() => setMenuAberto(false)}>
            {i.icon}<span>{i.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );

  const conteudoSidebar = (
    <aside className="flex h-full w-[260px] flex-col border-r border-[#e7e8e3] bg-white p-4">
      <div className="flex items-center gap-3 px-2 py-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#1f5b58]">
          <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2"/><circle cx="12" cy="12" r="3.4"/><line x1="12" y1="15.4" x2="12" y2="18"/></svg>
        </div>
        <div>
          <p className="text-sm font-extrabold text-[#191b1a]">ReveleCaixa</p>
          <p className="text-[11px] tracking-wide text-[#8a8e86]">CONTROLE DE CAIXA</p>
        </div>
      </div>

      <nav className="mt-2 flex-1 overflow-y-auto">
        <Secao titulo="Geral" itens={geral} />
        {isAdmin && <Secao titulo="Controle de caixa" itens={controle} />}
        {isAdmin && <Secao titulo="Equipe" itens={equipe} />}
      </nav>

      <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#e7e8e3] p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1f5b58] text-sm font-bold text-white">{iniciais}</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#191b1a]">{nome}</p>
          <p className="text-xs text-[#8a8e86]">{isAdmin ? "Gerente" : "Vendedora"}</p>
        </div>
        <button
          onClick={() => { sair(); navigate("/login"); }}
          title="Sair"
          className="cursor-pointer rounded-lg p-1.5 text-[#8a8e86] transition hover:bg-[#f9ece7] hover:text-[#b4432f]"
        >
          <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[#f4f5f2] font-[Manrope]">
      <div className="hidden md:block">{conteudoSidebar}</div>

      {menuAberto && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMenuAberto(false)} />
          <div className="absolute left-0 top-0 h-full shadow-xl">{conteudoSidebar}</div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-[#e7e8e3] bg-white px-4 py-3 md:hidden">
          <button onClick={() => setMenuAberto(true)} className="cursor-pointer rounded-lg p-1.5 text-[#191b1a] transition hover:bg-[#f0f1ed]">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <span className="text-sm font-extrabold text-[#191b1a]">ReveleCaixa</span>
        </div>
        <main className="min-w-0 flex-1"><Outlet /></main>
      </div>
    </div>
  );
};

export default AppLayout;