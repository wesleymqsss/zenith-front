export interface RankingGrupo {
  grupoId: number;
  nomeGrupo: string;
  membros: number;
  missoesConcluidas: number;
  missoesTotais: number;
  taxaSucesso: number;
  ultimaAtividade: string | null;
}