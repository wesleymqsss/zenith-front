export interface RankingAventureiro {
  usuarioId: number;
  nome: string;
  classe: string;
  nivel: number;
  reputacao: number;
  missoesConcluidas: number;
  missoesTotais: number;
  taxaSucesso: number;
  ultimaAtividade: string | null;
}