export interface MissaoResponse {
  id: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  recompensa: number;
  tipoMissao: string;
  nivelMinimo: number;
  classePreferida: string | null;
  idCriador: number;
  status: string;
  dataCriacao: string;
  idAventureiro: number;
  idGrupo: number;
}

export interface CriarMissaoPayload {
  titulo: string;
  descricao: string;
  localizacao: string;
  recompensa: number;
  tipoMissao: string;
  nivelMinimo: number;
  classePreferida: string;
}

export interface CancelarMissaoPayload {
  motivo: string;
  reputacaoPerdida: number;
  bloqueioDias: number;
}

export interface HistoricoMissao {
  idHistorico: number;
  idMissaoAceita: number;
  idMissao: number;
  tituloMissao: string;
  resultado: 'Sucesso' | 'Fracasso';
  avaliacaoRecebida: number | null;
  justificativa: string;
  dataRegistro: string;
  idCriador: number;
  nomeCriador: string;
}

export interface MissaoRecomendadaResponse {
  id: number;
  titulo: string;
  localizacao: string;
  recompensa: number;
  tipoMissao: string;
  nivelMinimo: number;
  classePreferida: string;
  idCriador: number;
  nomeCriador: string;
  score: number;
}
