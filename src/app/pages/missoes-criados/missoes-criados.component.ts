import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MissaoResponse } from '../../core/interface/missoes';
import { Logged } from '../../core/interface/userLogin';
import { LoginService } from '../../core/service/login.service';
import { MissoesService } from '../../core/service/missoes.service';
import { SnackbarService } from '../../core/service/snackbar.service';
import { ReputacaoResponse } from '../../core/interface/usuario';

@Component({
  selector: 'app-missoes-criados',
  standalone: false,
  templateUrl: './missoes-criados.component.html',
  styleUrl: './missoes-criados.component.scss'
})
export class MissoesCriadosComponent {
  formCancelarMissao!: FormGroup;
  usuarioLogado!: Logged;
  layout: 'list' | 'grid' = 'grid';
  options = ['list', 'grid'];
  minhasMissoesResponse: MissaoResponse[] = [];
  missoesFiltradas: MissaoResponse[] = [];
  statusDisponiveis: string[] = ['Disponível', 'Em andamento', 'Concluída', 'Cancelada'];
  visibleModalCreateMissao: boolean = false;
  idMissao!: number;
  reputacaoData: ReputacaoResponse = {
    usuarioId: 0,
    reputacao: 0,
    bloqueioDias: 0,
  };

  constructor(
    private readonly _loginService: LoginService,
    private readonly _missoesService: MissoesService,
    private readonly _snackbarService: SnackbarService,
    private readonly _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this._loginService.currentUser$.subscribe((user) => {
      if (user) {
        this.usuarioLogado = user;
        this.getReputacao(user.usuarioId);
      }
    });

    this.getMissoesPorUsuario();

    this.formCancelarMissao = this._fb.group({
      motivo: [""],
      reputacaoPerdida: [null],
      bloqueioDias: [null],
    });
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

  getReputacao(id: number) {
    this._loginService.getReputacao(id).subscribe({
      next: (data) => {
        this.reputacaoData = data;
      },
      error: (err) => {
        console.error('Erro ao buscar reputação:', err);
      },
    });
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
        this._snackbarService.showSuccess('Missão concluída com sucesso!');
        this.getReputacao(this.usuarioLogado.usuarioId);
        this.getMissoesPorUsuario();
      },
      error: (err) => this._snackbarService.showError('Erro ao concluir missão.')
    });
  }

  cancelarMissao() {
    const payload = {
      motivo: this.formCancelarMissao.value.motivo,
      reputacaoPerdida: this.formCancelarMissao.value.reputacaoPerdida,
      bloqueioDias: this.formCancelarMissao.value.bloqueioDias,
    };

    this._missoesService.cancelarMissao(this.idMissao, payload).subscribe({
      next: () => {
        this._snackbarService.showSuccess('Missão cancelada com sucesso!');
        this.getMissoesPorUsuario();
        this.visibleModalCreateMissao = false;
        this.formCancelarMissao.reset();
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

  abrirDialogCancelarMissao(ID: number) {
    this.visibleModalCreateMissao = true;
    this.idMissao = ID;
    this.formCancelarMissao.patchValue({
      motivo: "",
      reputacaoPerdida: Math.floor(Math.random() * 10) + 1,
      bloqueioDias: Math.floor(Math.random() * 5) + 1,
    });
  }
}
