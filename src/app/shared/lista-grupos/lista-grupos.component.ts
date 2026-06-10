import { Component, Input, OnInit } from '@angular/core';
import { GrupoResponse, MembroGrupoResponse } from '../../core/interface/grupoResponse';
import { GrupoService } from '../../core/service/grupo.service';
import { SnackbarService } from '../../core/service/snackbar.service';
import { UsuarioService } from '../../core/service/usuario.service';
import { LoginService } from '../../core/service/login.service';
import { Logged } from '../../core/interface/userLogin';
import { UserDetails } from '../../core/interface/usuario';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-grupos',
  standalone: false,
  templateUrl: './lista-grupos.component.html',
  styleUrl: './lista-grupos.component.scss'
})
export class ListaGruposComponent implements OnInit {
  @Input() grupos: GrupoResponse[] = [];
  usuarioLogado!: Logged;
  detalhesUsuario: any;
  visibleDialogMembros: boolean = false;
  grupoSelecionado!: GrupoResponse;
  membrosGrupo: MembroGrupoResponse[] = [];
  mediaReputacao: number = 0;

  constructor(
    private readonly _grupoService: GrupoService,
    private readonly _snackbarService: SnackbarService,
    private readonly _usuarioService: UsuarioService,
    private readonly _loginService: LoginService,
  ) {

  }

  ngOnInit(): void {
    this._loginService.currentUser$.subscribe((user) => {
      if (user) {
        this.usuarioLogado = user;
        this.getUserId(this.usuarioLogado.usuarioId);
      }
    });
  }

  getUserId(usuarioId: number) {
    this._usuarioService.getUserDetails(usuarioId.toString()).subscribe({
      next: (response) => {
        this.detalhesUsuario = response[0];
      },
      error: (error) => {
        console.error('Erro ao buscar detalhes do usuário :', error);
      }
    });
  }

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

  convidarParaGrupo(idGrupo: number): void {
    console.log('Convidando para grupo:', idGrupo, this.detalhesUsuario);
    this._grupoService.convidarParaGrupo(idGrupo, { idUsuario: this.detalhesUsuario.id, email: this.detalhesUsuario.email }).subscribe({
      next: () => {
        this._snackbarService.showSuccess('Usuário adicionado ao grupo com sucesso!');
      },
      error: (error: HttpErrorResponse) => {
        this._snackbarService.showError(`Erro ao convidar para grupo: ${error.error?.message || error.message}`);
      }
    });
  }

  visualizarMembrosGrupo(idGrupo: number): void {
    this._grupoService.visualizarMembrosGrupo(idGrupo).subscribe({
      next: (response) => {
        this.membrosGrupo = response;
        this.mediaReputacao = this.calcularMediaReputacao(response.map(membro => membro.reputacao));
      },
      error: (error) => {
        console.error('Erro ao visualizar membros do grupo :', error);
      }
    });
  }

  openDialog(grupo: GrupoResponse): void {
    this.grupoSelecionado = grupo;
    this.visualizarMembrosGrupo(grupo.id);

    setTimeout(() => {
      this.visibleDialogMembros = true;
    }, 200);
  }

  closeModalMembros() {
    this.visibleDialogMembros = false;
    this.membrosGrupo = [];
    this.grupoSelecionado = {} as GrupoResponse;
  }

  calcularMediaReputacao(reputacoes: number[]): number {
    if (reputacoes.length === 0) {
      return 0;
    }

    const somaReputacoes = reputacoes.reduce((total, reputacao) => total + reputacao, 0);
    return somaReputacoes / reputacoes.length;
  }

  getClassTheme(classe: string) {
    const c = (classe || '').trim();
    switch (c) {
      case 'Mago':
        return { color: '#9333ea', icon: 'pi pi-sparkles', label: 'Mago' };
      case 'Paladino':
        return { color: '#eab308', icon: 'pi pi-shield', label: 'Paladino' };
      case 'Druida':
        return { color: '#22c55e', icon: 'pi pi-ethereum', label: 'Druida' };
      case 'Fighter':
        return { color: '#ef4444', icon: 'pi pi-bolt', label: 'Guerreiro' };
      case 'Artificer':
        return { color: '#3b82f6', icon: 'pi pi-cog', label: 'Artífice' };
      case 'Clérigo':
        return { color: '#06b6d4', icon: 'pi pi-plus-circle', label: 'Clérigo' };
      case 'Bardo':
        return { color: '#ec4899', icon: 'pi pi-volume-up', label: 'Bardo' };
      default:
        return { color: '#64748b', icon: 'pi pi-user', label: 'Aventureiro' };
    }
  }
}
