import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../core/interface/usuario';
import { UsuarioService } from '../../core/service/usuario.service';
import { LoginService } from '../../core/service/login.service';
import { GrupoRequest } from '../../core/interface/grupoRequest';
import { GrupoService } from '../../core/service/grupo.service';
import { SnackbarService } from '../../core/service/snackbar.service';

@Component({
    selector: 'app-grupos',
    standalone: false,
    templateUrl: './grupos.component.html',
    styleUrl: './grupos.component.scss',
})
export class GruposComponent implements OnInit {
    grupoForm!: FormGroup;
    dataSourceAventureiro: Usuario[] = [];
    constructor(
        private readonly _loginService: LoginService,
        private readonly _usuarioService: UsuarioService,
        private readonly _grupoService: GrupoService,
        private readonly _formBuilder: FormBuilder,
        private readonly _snackbarService: SnackbarService,
    ) { }

    ngOnInit(): void {
        this.grupoForm = this._formBuilder.group<GrupoRequest>({
            nomeGrupo: ['', Validators.required],
        } as any);
        this.carregarAventureiros()
    }

    criarGrupo(): void {
        this.grupoForm.markAllAsTouched();
        if(this.grupoForm.invalid) {
            this._snackbarService.showWarn('Por favor, preencha o nome do grupo.');
            return;
        }

        this._grupoService.criarGrupo(this.grupoForm.value).subscribe({
            next: (response) => {
              this._snackbarService.showSuccess('Grupo criado com sucesso!!!');
            },
            error: (error) => {
                this._snackbarService.showError(`Erro ao criar grupo: ${error.message}`);
            }
        });
    }

    carregarAventureiros(): void {
        this._usuarioService.getUsers().subscribe((response: any) => {
            const users = Array.isArray(response) ? response : response.items;

            this.dataSourceAventureiro = users.filter((user: Usuario) =>
                user.tipoUsuario === 'Aventureiro' || user.tipoUsuario === 'Aventureiro'
            );
        });
    }


}