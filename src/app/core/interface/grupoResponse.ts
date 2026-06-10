export interface GrupoResponse {
    id: number;
    nomeGrupo: string;
    quantidadeMembros: number;
    idMissaoVinculada: number;
    dataCriacao: string
}

export interface MembroGrupoResponse {
    id: number;
    nome: string;
    email: string;
    classe: string;
    nivel: number;
    reputacao: number;
}