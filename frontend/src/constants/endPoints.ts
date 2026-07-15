export const ENDPOINTS = {
    auth:{
        login: "/auth/login",
        cadastro: "/auth/cadastro"
    },
    boleto:{
        criar: "/boleto",
        pagarDinheiro: (id:any)=>{ `/boleto/${id}/pagar/dinheiro`},
        pagarBanco: (id:any)=>{ `/boleto/${id}/pagar/banco`},
        listar: "/boleto",
        verUmBoleto: (id:any)=>{`/boleto/${id}`},
        deletar: (id:any)=>{`/boleto/${id}`}
    },
    cofre:{
        criar: "/cofre",
        listar: "/cofre",
        verUma: (id:any)=>{`/cofre/${id}`}
    },
    fechamento:{
        criar:"/fechamento",
        fechar: (id:any)=>{`/fechamento/${id}/fechar`},
        criarGasto: (id:any)=>{`/fechamento/${id}/gasto`},
        listar: "/fechamento",
        verUm: (id:any)=>{`/fechamento/${id}`},
        verDiario:"/fechamento/hoje",
        deletarGasto: (idFechamento:any, idGasto:any)=>{`/fechamento/${idFechamento}/gasto/${idGasto}`},
        abrirCaixa: (id:any)=>{`/fechamento/${id}/abrir`}
    },
    user:{
        listar: "/usuario",
        verPerfil: (id:any)=>{`/usuario/perfil/${id}`},
        verUsuario: (id:any)=>{`/usuario/${id}`}
    }

}