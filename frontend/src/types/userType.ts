

export type userCadastroRequestDTO ={
    email:string,
    password:string,
    nome:string
}

export type userLoginRequestDTO ={
    email:string,
    password:string
}


export type userCadastroResponseDTO = {
    id: string,
    role: string,
    email:string,
    nome:string
}

export type userLoginResponseDTO = {
    id:string,
    email:string,
    nome:string,
    token:string
}