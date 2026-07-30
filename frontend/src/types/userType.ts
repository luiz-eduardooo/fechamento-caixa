

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
    token:string,
    role:string
}

export type UserRole = "ADMIN" | "VENDEDORA";

export type UserResponse = {
  id: string;
  role: UserRole;
  email: string;
  nome: string;
};

export type CadastroRequest = {
  email: string;
  password: string;
  nome: string;
};