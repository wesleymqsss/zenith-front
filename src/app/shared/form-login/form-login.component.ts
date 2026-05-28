import { Component } from '@angular/core';
import { LoginService } from '../../core/service/login.service';
import { Logged, Login } from '../../core/interface/userLogin';
import { SnackbarService } from '../../core/service/snackbar.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmarSenharIguais } from '../../validators/passwordValidators';
import { UsuarioService } from '../../core/service/usuario.service';

interface Iselect {
  name: string;
  code: number
}

interface IselectCodeString {
  name: string;
  code: string
}

@Component({
  selector: 'app-form-login',
  standalone: false,
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})

export class FormLoginComponent {
  tipoJogador: IselectCodeString[] | undefined;
  classes: IselectCodeString [] | undefined;
  userLogged!: Logged;
  formUser!: FormGroup;
  password: string = '';
  email: string = '';
  accept: boolean = false;
  loading: boolean = false;
  visibleEditProfile: boolean = false;

  constructor(
    private readonly _userLoginService: LoginService,
    private readonly _usuarioService: UsuarioService,
    private readonly _snackbarService: SnackbarService,
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.tipoJogador = [
      { name: 'Aventureiro', code: 'Aventureiro' },
      { name: 'Criador', code:  'Criador' },
    ];

    this.classes = [
      { name: 'Mago', code: 'Mago' },
      { name: 'Paladino', code: 'Paladino' },
      { name: 'Druida', code: 'Druida' },
      { name: 'Fighter ', code: 'Fighter' },
      { name: 'Artificer ', code: 'Artificer' },
      { name: 'Clérigo', code: 'Clérigo' },
      { name: 'Bardo', code: 'Bardo' },
      { name: 'Nenhuma das Opções', code: ' ' },
    ];


    this.formUser = this._fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        nome: [null, [Validators.required, Validators.required]],
        senha: [null, [Validators.required, Validators.required]],
        confirmPassword: ['', [Validators.required]],
        tipoUsuario: ['', [Validators.required]],
        classe: ['', [Validators.required]],
      }
      ,
      {
        validators: confirmarSenharIguais('senha', 'confirmPassword')
      }
    );
  }

  load() {
    this.loading = true;

    if (this.accept !== false) {
      this.getUserLogin();
    } else {
      console.log('sou o termo de falso', this.accept);
      this._snackbarService.showWarn('Favor, aceitar termos de uso!');
      this.loading = false
    }
  }

  getUserLogin() {
    console.log('tentado logar com email', this.email);
    this.loading = true;

    const credentials: Login = {
      email: this.email,
      senha: this.password
    }

    this._userLoginService.getUserLogin(credentials).subscribe({
      next: (responseUserLogin) => {
        this.userLogged = responseUserLogin;
        this.loading = false;
        this.redirect();
      }, error: (err) => {
        console.error('error login', err);
        this._snackbarService.showError('Usuário não encontrado. Favor, verificar dados de login!');
        this.loading = false;
      }
    });
  }

  openModal() {
    this.visibleEditProfile = true;
  }

  closeModal() {
    this.visibleEditProfile = false;
  }

  redirect() {
    this._router.navigate(['/home']);
  }

  isStep1Valid(): boolean {
    const step1Controls = ['nome', 'email', 'cpfCnpj', 'telefone'];
    return step1Controls.every(controlName => this.formUser.get(controlName)?.valid ?? false);
  }

  isStep2Valid(): boolean {
    const step2Controls = ['cep', 'estado', 'cidade', 'bairro', 'numero', 'referenciaEndereco'];
    return step2Controls.every(controlName => this.formUser.get(controlName)?.valid ?? false);
  }

  submitUser() {
    const formValue = this.formUser.value

    console.log(formValue);

    if (formValue) {
      this._usuarioService.createUser(formValue).subscribe({
        next: (data) => {
          this._snackbarService.showSuccess("Usuário criado com sucesso.");
          this.formUser.reset();
          this.closeModal();
        }, error: (err) => {
          this._snackbarService.showError("Error ao cadastrar usuário.");
        }
      })
    } else {
      console.log(formValue);
      this._snackbarService.showWarn("Favor, verificar dados do formulario.");

    }
  }
}
