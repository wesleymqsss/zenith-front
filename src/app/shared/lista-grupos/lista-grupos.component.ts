import { Component, Input, OnInit } from '@angular/core';
import { GrupoResponse } from '../../core/interface/grupoResponse';
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
}
