import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinhasMissoesComponent } from './minhas-missoes.component';

const routes: Routes = [
  {
    path: 'minhas-missoes',
    component: MinhasMissoesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinhasMissoesRoutingModule { }
