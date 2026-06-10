export interface UserDetails {
    id: number;
    email: string;
    tipoPerfil: number | null;
    nome: string | null;
    cpfCnpj: string | null;
    cep: string | null;
    telefone: string | null;
    cidade: string | null;
    tipoDoacao: string | null;
    bairro: string | null;
    numero: number | null;
    referenciaEndereco: string | null;
    estado: string | null;
    sobreNos: string | null;
    idGrupo: number
}


export interface Usuario {
  id: number;
  nome: string;
  email: string;
  classe: string;
  nivel: number;
  tipoUsuario: string;
  reputacao: number;
  dataCadastro: string; 
}

export interface ReputacaoResponse {
  usuarioId: number;
  reputacao: number;
  bloqueioDias: number;
}