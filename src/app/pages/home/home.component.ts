import { Component } from '@angular/core';
import { LoginService } from '../../core/service/login.service';
import { Logged } from '../../core/interface/userLogin';
import { MissaoResponse } from '../../core/interface/missoes';
import { MissoesService } from '../../core/service/missoes.service';
import { SnackbarService } from '../../core/service/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface IselectCodeString {
  name: string;
  code: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  formMissao!: FormGroup;
  idMissao: number = 0;
  usuarioLogado!: Logged;
  missoes: MissaoResponse[] = [];
  visible: boolean = false;
  responsiveOptions: any[] | undefined;
  visibleModalCreateMissao: boolean = false;
  classes: IselectCodeString[] | undefined;
  tipoMissao: IselectCodeString[] | undefined;
  editMode: boolean = false;
  nomeBotao: string = '';
  constructor(
    private readonly _loginService: LoginService,
    private readonly _missoesService: MissoesService,
    private readonly _snackbarService: SnackbarService,
    private readonly _fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this._loginService.currentUser$.subscribe((user) => {
      if (user) {
        this.usuarioLogado = user;
      }
    });

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

    this.tipoMissao = [
      { name: 'Extermínio', code: 'Extermínio' },
      { name: 'Exploração', code: 'Exploração' },
      { name: 'Proteção', code: 'Proteção' },
      { name: 'Resgate ', code: 'Resgate' },
      { name: 'Invasão ', code: 'Invasão' },
      { name: 'Investigativo', code: 'Investigativo' },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.getMissoes();

    this.formMissao = this._fb.group({
      id: [null],
      titulo: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      localizacao: [null, [Validators.required]],
      recompensa: ['', [Validators.required]],
      tipoMissao: ['', [Validators.required]],
      nivelMinimo: ['', [Validators.required]],
      classePreferida: ['', [Validators.required]],
      dataCriacao: [''],
      idCriador: [null],
      status: [''],
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Disponível':
        return 'success';
      case 'Limite Excedido':
        return 'warn';
      case 'Cancelada':
        return 'danger';
      default:
        return '';
    }
  }

  getMissoes() {
    this._missoesService
      .getMissoes()
      .subscribe((responseMissoes) => (this.missoes = responseMissoes));
  }

  aceitarMissao(id: number) {
    this._missoesService.aceitarMissao(id).subscribe({
      next: (responseMessage) => {
        this._snackbarService.showInfo(
          `Missão aceita!!! Boa sorte Jogador ${this.usuarioLogado.nome}.`,
        );
        this.visible = false;
      },
      error: (httpError: HttpErrorResponse) => {
        if (httpError.error && httpError.error.message) {
          this._snackbarService.showWarn(httpError.error.message);
          this.visible = false;
        } else {
          this._snackbarService.showWarn(
            'Ocorreu um erro ao aceitar a missão.',
          );
          console.error('Erro completo:', httpError);
        }
      },
    });
  }

  dialogConfirm(id: number) {
    this.idMissao = id;
    this.visible = true;
  }

  criarMissao() {
    if (this.formMissao.get('id')?.value !== null) {
      this.atualizarMissao(this.formMissao.getRawValue());
      return;
    }

    if (this.usuarioLogado.tipoUsuario !== 'Criador') {
      this._snackbarService.showInfo(
        'Somente o usuário do tipo "Criador" pode criar novas missões.',
      );
      return;
    }

    const formValue = this.formMissao.getRawValue();

    const { id, status, dataCriacao, idCriador, ...requestBody } = formValue;

    this._missoesService.criarMissao(requestBody).subscribe({
      next: (Response) => {
        if (this.usuarioLogado.tipoUsuario !== 'Criador') {
          this._snackbarService.showInfo(
            'Somente o usuário do tipo "Criador" pode criar novas missões.',
          );
          return;
        }

        this._snackbarService.showSuccess(
          `Missão ${Response.titulo}, criada com sucesso!`,
        );
        this.visibleModalCreateMissao = false;
        this.getMissoes();
        this.formMissao.reset();
      },
      error: (httpError: HttpErrorResponse) => {
        if (httpError.error && httpError.error.message) {
          this._snackbarService.showWarn(httpError.error.message);
          this.visible = false;
        } else {
          this._snackbarService.showWarn('Ocorreu um erro ao criar a missão.');
          console.error('Erro completo:', httpError);
        }
      },
    });
  }

  atualizarMissao(requestBody: MissaoResponse) {
    this._missoesService
      .atualizarMissao(requestBody.id, requestBody)
      .subscribe({
        next: (respose) => {
          this._snackbarService.showSuccess('Missão atualizada com sucesso!');
          this.getMissoes();
          this.formMissao.reset();
          this.visibleModalCreateMissao = false;
        },
        error: () => {},
      });
  }

  dialogCreateMissao(id?: number) {
    this.formMissao.reset();

    if (id) {
      this._missoesService.getMissaoId(id).subscribe({
        next: (response) => {
          this.formMissao.patchValue({
            id: response.id,
            titulo: response.titulo,
            descricao: response.descricao,
            localizacao: response.localizacao,
            recompensa: response.recompensa,
            tipoMissao: response.tipoMissao,
            nivelMinimo: response.nivelMinimo,
            dataCriacao: response.dataCriacao,
            idCriador: response.idCriador,
            status: response.status,
          });

          console.log(this.formMissao.getRawValue());
          this.editMode = true;
        },
        error: () => {},
      });
    }

    this.visibleModalCreateMissao = true;
    console.log('teste');
  }

  deletarMissaoId(idMissao: number) {
    this._missoesService.deletarMissao(idMissao).subscribe({
      next: (response) => {
        this._snackbarService.showSuccess(response);
        this.getMissoes();
      },
      error: (err: HttpErrorResponse) => {
        this._snackbarService.showSuccess(err.message);
      },
    });
  }
}
