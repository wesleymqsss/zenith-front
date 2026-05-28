import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../core/interface/usuario';
import { LoginService } from '../../core/service/login.service';
import { Logged } from '../../core/interface/userLogin';
import { UsuarioService } from '../../core/service/usuario.service';

@Component({
  selector: 'app-lista-comunidade',
  standalone: false, 
  templateUrl: './lista-comunidade.component.html',
  styleUrl: './lista-comunidade.component.scss'
})

export class ListaComunidadeComponent implements OnInit {
  dataSource: Usuario[] = [];
  userLogin!: Logged; 
  constructor(
    private readonly _loginService: LoginService,
    private readonly _usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this._loginService.currentUser$.subscribe(user => {
      if (user) {
        this.userLogin = user;
      }
    });
    this.carregarUsuarios();
  }

 carregarUsuarios(): void {
  this._usuarioService.getUsers().subscribe((response) => {
    this.dataSource = response.items;
    console.log(this.dataSource); 
  });
}

  converterPerfil(tipoUsuario: string): string {
    if (tipoUsuario === 'Aventureiro') return 'Aventureiro';
    if (tipoUsuario === 'Criador') return 'Criador';
    if (tipoUsuario === 'Cliente') return 'Cliente';
    return 'N/A';
  }
}