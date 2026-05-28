import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MinhasMissoesComponent } from './pages/minhas-missoes/minhas-missoes.component';
import { ListaComunidadeComponent } from './pages/lista-comunidade/lista-comunidade.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'minhas-missoes-historico',
    component: MinhasMissoesComponent,
  },

  {
    path: 'lista-comunidade',
    component: ListaComunidadeComponent,
  },

  {
    path: 'missoes-criados',
    loadChildren: () => import('./pages/missoes-criados/missoes-criados.module').then(m => m.MissoesCriadosModule)
  },

  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
