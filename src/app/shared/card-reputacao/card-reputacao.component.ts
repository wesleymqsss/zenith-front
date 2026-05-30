import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-reputacao',
  standalone: false,
  templateUrl: './card-reputacao.component.html',
  styleUrl: './card-reputacao.component.scss'
})
export class CardReputacaoComponent {
  @Input() dados!: {
    usuarioId: number;
    reputacao: number;
    bloqueioDias: number;
  };

  getProgressBarColor(): string {
    if (this.dados.reputacao >= 70) return '#22c55e'; 
    if (this.dados.reputacao >= 40) return '#eab308';
    return '#ef4444';
  }

  getReputacaoStatus(): string {
    if (this.dados.reputacao >= 70) return 'Excelente';
    if (this.dados.reputacao >= 40) return 'Regular';
    return 'Crítica';
  }
}
