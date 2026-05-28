import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Drawer } from 'primeng/drawer';
import { FormGroup } from '@angular/forms';
import { UserDetails } from '../../core/interface/usuario';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() userId: string = '';
  items: MenuItem[] | undefined;
  userDetails!: UserDetails;
  newUserLogin!: any;

  visible: boolean = false;
  visibleEditPassword: boolean = false;
  visibleEditProfile: boolean = false;
  visibleTableHistorico: boolean = false;
  formUpdatePassword!: FormGroup;
  formUpdateUser!: FormGroup;
  @ViewChild('drawerRef') drawerRef!: Drawer;

  constructor() {}

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home/' + this.userId],
      },
      {
        label: 'Ver comunidade',
        icon: 'pi pi pi-users',
        routerLink: ['/lista-comunidade'],
      },
      {
        label: 'Histórico de Missões',
        icon: 'pi pi pi-users',
        routerLink: ['/minhas-missoes-historico'],
      },
      {
        label: 'Missões',
        icon: 'pi pi-plus',
        routerLink: ['/missoes-criados'],
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        routerLink: ['/'],
      },
      // {
      //   label: 'Perfil',
      //   icon: 'pi pi-search',
      //   items: [
      //     {
      //       label: 'Atualizar perfil',
      //       icon: 'pi pi-server',
      //       command: () => this.showDialog()
      //     },
      //     {
      //       label: 'Alterar senha',
      //       icon: 'pi pi-user-edit',
      //       command: () => this.showDialog()
      //     },

      //   ]
      // },
    ];
  }

  ngOnChanges(changes: SimpleChanges) {}

  showDialog() {}
}
