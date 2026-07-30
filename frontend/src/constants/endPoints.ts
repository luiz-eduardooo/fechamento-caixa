export const ENDPOINTS = {
    auth: {
        login: "/auth/login",
        cadastro: "/auth/cadastro"
    },
    boleto: {
        base: "/boleto",
        criar: "/boleto",
        verPorId: (id: number) => `/boleto/${id}`,
        pagarDinheiro: (id: number) => `/boleto/${id}/pagar/dinheiro`,
        pagarBanco: (id: number) => `/boleto/${id}/pagar/banco`,
        deletar: (id: number) => `/boleto/${id}`,
    },
    cofre: {
        base: "/cofre",
        criar: "/cofre",
        verPorId: (id: number) => `/cofre/${id}`,
    },
    fechamento: {
        criar: "/fechamento",
        gasto: (id: any) => `/fechamento/${id}/gasto`,
        listar: "/fechamento",
        verUm: (id: any) => `/fechamento/${id}`,
        hoje: "/fechamento/hoje",
        fechar: (id: number) => `/fechamento/${id}/fechar`,
        reabrir: (id: number) => `/fechamento/${id}/abrir`,
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