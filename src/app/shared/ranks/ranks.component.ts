import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RankingService } from '../../core/service/ranking.service';
import { RankingGrupo } from '../../core/interface/rankingGrupo';
import { RankingAventureiro } from '../../core/interface/rankingAventureiro';
import { SnackbarService } from '../../core/service/snackbar.service';

@Component({
  selector: 'app-ranks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.scss']
})
export class RanksComponent implements OnInit {
  rankings: RankingGrupo[] = [];
  loading: boolean = true;
  rankingAventureiros: RankingAventureiro[] = [];
  loadingAventureiros: boolean = true;

  constructor(
    private readonly _rankingService: RankingService,
    private readonly _snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.carregarRankings();
    this.carregarRankingAventureiros();
  }

  carregarRankings(): void {
    this.loading = true;
    this._rankingService.getRankingGrupos(3).subscribe({
      next: (dados) => {
        this.rankings = dados;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        console.error('Erro ao carregar rankings:', err.error?.message || err.message);
        const errorMsg = err.error?.message || err.message;
        this._snackbarService.showError(`Erro ao carregar rankings das guildas. ${errorMsg ? 'Detalhes: ' + errorMsg : ''}`);
      }
    });
  }

  carregarRankingAventureiros(): void {
    this.loadingAventureiros = true;
    this._rankingService.getRankingAventureiros(3).subscribe({
      next: (dados) => {
        this.rankingAventureiros = dados.slice(0, 3);
        this.loadingAventureiros = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loadingAventureiros = false;
        console.error('Erro ao carregar rankings de aventureiros:', err.error?.message || err.message);
        const errorMsg = err.error?.message || err.message;
        this._snackbarService.showError(`Erro ao carregar rankings dos aventureiros. ${errorMsg ? 'Detalhes: ' + errorMsg : ''}`);
      }
    });
  }
}
