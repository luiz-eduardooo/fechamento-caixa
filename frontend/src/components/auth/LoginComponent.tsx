import { useState } from "react"
import { loginUsuario } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [error, setError] = useState("");

    const { entrar }: any = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setCarregando(true);
        setError("");
        try {
            const dados = await loginUsuario({ email, password });
            entrar(dados);
            navigate("/");
        } catch (error: any) {
            if (error.response?.status === 401) {
                setError("Email ou senha incorretos");
            } else {
                setError("Erro ao conectar. Tente novamente.");
            }
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f4f5f2] px-6 font-[Manrope]">
            <div className="flex w-full max-w-4xl overflow-hidden rounded-[22px] border border-[#e7e8e3] bg-white shadow-[0_30px_70px_-40px_rgba(20,26,25,0.4)]">

                {/* painel esquerdo — petróleo (some no mobile) */}
                <div className="hidden w-[42%] flex-col justify-between bg-[#1f5b58] p-10 md:flex">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/15">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="4" y="5" width="16" height="15" rx="2" />
                                <circle cx="12" cy="12" r="3.4" />
                                <line x1="12" y1="15.4" x2="12" y2="18" />
                            </svg>
                        </div>
                        <span className="text-lg font-extrabold tracking-tight text-white">ReveleCaixa</span>
                    </div>
                    <div>
                        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white">
                            Controle de caixa e cofre
                        </h2>
                        <p className="mt-3 text-[15px] leading-relaxed text-white/75">
                            Fechamentos, conferência de cofre e gestão da equipe — tudo em um só lugar.
                        </p>
                    </div>
                </div>

                {/* painel direito — formulário */}
                <div className="flex flex-1 flex-col justify-center p-8 sm:p-11">
                    <h1 className="text-xl font-extrabold tracking-tight text-[#191b1a]">Entrar</h1>
                    <p className="mt-1.5 text-sm text-[#71756e]">Acesse com sua conta da loja.</p>

                    <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-[#71756e]">E-mail</label>
                            <input
                                id="email" type="email" placeholder="voce@loja.com"
                                value={email} onChange={(el) => setEmail(el.target.value)}
                                className="w-full rounded-xl border border-[#e7e8e3] bg-[#fafbf9] px-4 py-3 text-[#191b1a] outline-none transition focus:border-[#1f5b58] focus:bg-white"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-sm font-medium text-[#71756e]">Senha</label>
                            <input
                                id="password" type="password" placeholder="••••••••"
                                value={password} onChange={(el) => setPassword(el.target.value)}
                                className="w-full rounded-xl border border-[#e7e8e3] bg-[#fafbf9] px-4 py-3 text-[#191b1a] outline-none transition focus:border-[#1f5b58] focus:bg-white"
                            />
                        </div>

                        <button
                            type="submit" disabled={carregando}
                            className="mt-3 w-full rounded-xl bg-[#1f5b58] py-3.5 font-semibold text-white transition hover:bg-[#0f3b39] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {carregando ? "Entrando..." : "Entrar"}
                        </button>

                        {error && (
                            <p className="rounded-xl bg-[#f9ece7] px-4 py-3 text-sm font-medium text-[#b4432f]">{error}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;