import { Component, Input, input, OnInit } from '@angular/core';
import { AvaliacoesResponse } from '../../core/interface/avaliacoesResponse';

@Component({
  selector: 'app-carrossel-minhas-avaliacoes',
  standalone: false,
  templateUrl: './carrossel-minhas-avaliacoes.component.html',
  styleUrl: './carrossel-minhas-avaliacoes.component.scss'
})
export class CarrosselMinhasAvaliacoesComponent implements OnInit {
  responsiveOptions: any[] | undefined;
  @Input() avaliacoes: AvaliacoesResponse[] = [];

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getIntegerRating(nota: any): number {
    console.log('Nota:', Math.floor(Number(nota)));
    return Math.floor(Number(nota));
  }
}
