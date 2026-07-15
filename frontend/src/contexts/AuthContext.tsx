import { createContext, useContext, useState } from "react";
import { keys } from "../keys/keys";
import type { userType } from "../types/userType";

const AuthContext:any = createContext(null);


export function AuthProvider({children}:any){
    const [usuario, setUsuario] = useState<userType | null>(() => {
    const usuarioSalvo = localStorage.getItem(keys.usuario);
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

    function entrar(dados:userType){
        setUsuario(dados)
        localStorage.setItem(keys.usuario, JSON.stringify(dados))
        localStorage.setItem(keys.token, dados.token)
    }

    function sair(){
        setUsuario(null)
        localStorage.removeItem(keys.token)
        localStorage.removeItem(keys.usuario)
    }

    return(
        <AuthContext.Provider value={{usuario, entrar, sair}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}