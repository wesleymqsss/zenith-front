import { Component } from '@angular/core';
import { LoginService } from '../../core/service/login.service';
import { MissoesService } from '../../core/service/missoes.service';
import { Logged } from '../../core/interface/userLogin';
import { MissaoResponse } from '../../core/interface/missoes';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../core/service/snackbar.service';

@Component({
  selector: 'app-missoes-criados',
  standalone: false,
  templateUrl: './missoes-criados.component.html',
  styleUrl: './missoes-criados.component.scss'
})
export class MissoesCriadosComponent {
  usuarioLogado!: Logged;
  layout: 'list' | 'grid' = 'grid';
  options = ['list', 'grid'];
  minhasMissoesResponse: MissaoResponse[] = [];
  missoesFiltradas: MissaoResponse[] = [];
  statusDisponiveis: string[] = ['Disponível', 'Em andamento', 'Concluída', 'Cancelada'];

  constructor(
    private readonly _loginService: LoginService,
    private readonly _missoesService: MissoesService,
    private readonly _snackbarService: SnackbarService,

  ) { }

  ngOnInit() {
    this._loginService.currentUser$.subscribe((user) => {
      if (user) {
        this.usuarioLogado = user;
      }
    });

    this.getMissoesPorUsuario();
  }

  getMissoesPorUsuario() {
    console.log('ID do usuário logado:', this.usuarioLogado.tipoUsuario);
    const tipoUsuario = this.usuarioLogado.tipoUsuario.toLocaleLowerCase() === 'criador' ? 'criador' : 'aventureiro';
    this._missoesService
      .getMissoesPorUsuario(this.usuarioLogado.usuarioId, tipoUsuario)
      .subscribe((response) => {
        this.minhasMissoesResponse = response;
        this.missoesFiltradas = response;
        console.log('Missões por usuário:', response);
      });
  }

  filtrarPorStatus(status: string) {
    this.missoesFiltradas = this.minhasMissoesResponse.filter(missao => missao.status === status);
  }

  limparFiltro() {
    this.missoesFiltradas = this.minhasMissoesResponse;
  }

  getSeverityByStatus(status: string): string {
    switch (status) {
      case 'Disponível':
        return 'info';
      case 'Em andamento':
        return 'warning';
      case 'Concluída':
        return 'success';
      case 'Cancelada':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  getSeverity(missao: MissaoResponse): string {
    return this.getSeverityByStatus(missao.status);
  }

  concluirMissao(id: number) {
    this._missoesService.concluirMissao(id).subscribe({
      next: () => {
        const missao = this.minhasMissoesResponse.find(m => m.id === id);
        if (missao) {
          missao.status = 'Concluída';
        }
        this._snackbarService.showSuccess('Missão concluída com sucesso!');
      },
      error: (err) => this._snackbarService.showSuccess('Erro ao concluir missão.')
    });
  }

  cancelarMissao(id: number) {
    this._missoesService.cancelarMissao(id).subscribe({
      next: () => {
        const missao = this.minhasMissoesResponse.find(m => m.id === id);
        if (missao) {
          missao.status = 'Cancelada';
        }
        this._snackbarService.showSuccess('Missão cancelada com sucesso!');
      },
      error: (err) => this._snackbarService.showError('Erro ao cancelar missão.')
    });
  }

  deletarMissao(idMissao: number) {
    this._missoesService.deletarMissao(idMissao).subscribe({
      next: (response) => {
        this._snackbarService.showSuccess('Missão deletada com sucesso!');
        this.getMissoesPorUsuario();
      },
      error: (err: HttpErrorResponse) => {
        this._snackbarService.showError(err.message);
      },
    });
  }
}
