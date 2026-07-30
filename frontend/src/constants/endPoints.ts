export const ENDPOINTS = {
    auth: {
        login: "/auth/login",
        cadastro: "/auth/cadastro"
    },
    boleto: {
        criar: "/boleto",
        pagarDinheiro: (id: any) => `/boleto/${id}/pagar/dinheiro`,
        pagarBanco: (id: any) => `/boleto/${id}/pagar/banco`,
        listar: "/boleto",
        verUmBoleto: (id: any) => `/boleto/${id}`,
        deletar: (id: any) => `/boleto/${id}`
    },
    cofre: {
        criar: "/cofre",
        listar: "/cofre",
        verUma: (id: any) => `/cofre/${id}`
    },
    fechamento: {
        criar: "/fechamento",
        gasto: (id: any) => `/fechamento/${id}/gasto`,
        listar: "/fechamento",
        verUm: (id: any) => `/fechamento/${id}`,
        hoje: "/fechamento/hoje",
        fechar: (id: number) => `/fechamento/${id}/fechar`,
        abrirCaixa: (id: any) => `/fechamento/${id}/abrir`,
        editar: (id: number) => `/fechamento/${id}`,
        removerGasto: (fechamentoId: number, gastoId: number) => `/fechamento/${fechamentoId}/gasto/${gastoId}`,
        base: "/fechamento",
        verPorId: (id: number) => `/fechamento/${id}`,
    },
    user: {
        listar: "/usuario",
        verPerfil: (id: any) => `/usuario/perfil/${id}`,
        verUsuario: (id: any) => `/usuario/${id}`
    }

}