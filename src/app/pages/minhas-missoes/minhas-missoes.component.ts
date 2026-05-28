import { Component } from '@angular/core';
import { LoginService } from '../../core/service/login.service';
import { Logged } from '../../core/interface/userLogin';
import { MissoesService } from '../../core/service/missoes.service';

@Component({
  selector: 'app-minhas-missoes',
  standalone: false,
  templateUrl: './minhas-missoes.component.html',
  styleUrl: './minhas-missoes.component.scss',
})
export class MinhasMissoesComponent {
  usuarioLogado!: Logged;
  layout: 'list' | 'grid' = 'grid';
  options = ['list', 'grid'];
  minhasMissoesResponse: any[] = [];

  constructor(
    private readonly _loginService: LoginService,
    private readonly _missoesService: MissoesService,
  ) {}

  ngOnInit() {
    this._loginService.currentUser$.subscribe((user) => {
      if (user) {
        this.usuarioLogado = user;
      }
    });

    this.getHistoricoMissoes();
  }

  getSeverity(item: any) {
    switch (item.resultado) {
      case 'Sucesso':
        return 'success';

      case 'Fracasso':
        return 'danger';

      default:
        return 'info';
    }
  }

  getHistoricoMissoes() {
    this._missoesService
      .historicoMissoesCompleto(this.usuarioLogado.usuarioId)
      .subscribe((Response) => (this.minhasMissoesResponse = Response));
  }
}
