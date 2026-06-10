import { Component, Input } from '@angular/core';
import { Usuario } from '../../core/interface/usuario';
import { GrupoService } from '../../core/service/grupo.service';
import { SnackbarService } from '../../core/service/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../../core/service/usuario.service';
import { LoginService } from '../../core/service/login.service';

@Component({
  selector: 'app-lista-eventureiro',
  standalone: false,
  templateUrl: './lista-eventureiro.component.html',
  styleUrl: './lista-eventureiro.component.scss'
})
export class ListaEventureiroComponent {
  @Input() dataSource: Usuario[] = [];
  groupIdUserLogged!: number;

  constructor(
    private readonly _grupoService: GrupoService,
    private readonly _snackbarService: SnackbarService,
    private readonly _usuarioService: UsuarioService,
    private readonly _loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this._loginService.currentUser$.subscribe((user) => {
      if (user) {
        this.getUserId(user.usuarioId);
      }
    });
  }

  getUserId(usuarioId: number) {
    this._usuarioService.getUserDetails(usuarioId.toString()).subscribe({
      next: (response) => {
        if(response[0].idGrupo){
          this.groupIdUserLogged = response[0].idGrupo;
        }
      },
      error: (error) => {
        console.error('Erro ao buscar detalhes do usuário :', error);
      }
    });
  }

  getSeverity(tipo: string) {
    switch (tipo) {
      case 'Aventureiro':
        return 'success';
      case 'Criador':
        return 'info';
      case 'Cliente':
        return 'warning';
      default:
        return 'secondary';
    }
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

  convidarParaGrupo(idUser: number, emailUser: string, groupId: number): void {
    if(groupId){
      this._snackbarService.showWarn('O usuário que você deseja convidar já faz parte de um grupo, portanto não pode ser convidado para outro!');
      return;
    }

    if(this.groupIdUserLogged){
      this._grupoService.convidarParaGrupo(this.groupIdUserLogged, { idUsuario: idUser, email: emailUser }).subscribe({
        next: () => {
          this._snackbarService.showSuccess('Usuário adicionado ao grupo com sucesso!');
        },
        error: (error: HttpErrorResponse) => {
          this._snackbarService.showError(`Erro ao convidar para grupo: ${error.error?.message || error.message}`);
        }
      });
    }else{
      this._snackbarService.showWarn('Faça parte de um grupo para convidar outros aventureiros!');
    }
  }
}
