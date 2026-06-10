import { Component, Input } from '@angular/core';
import { GrupoResponse } from '../../core/interface/grupoResponse';

@Component({
  selector: 'app-lista-grupos',
  standalone: false,
  templateUrl: './lista-grupos.component.html',
  styleUrl: './lista-grupos.component.scss'
})
export class ListaGruposComponent {
  @Input() grupos: GrupoResponse[] = [];

  getSeverity(grupo: GrupoResponse): 'success' | 'info' | 'warning' | 'danger' {
    if (grupo.quantidadeMembros >= 8) {
      return 'success';
    }

    if (grupo.quantidadeMembros >= 4) {
      return 'info';
    }

    if (grupo.quantidadeMembros >= 2) {
      return 'warning';
    }

    return 'danger';
  }

}
