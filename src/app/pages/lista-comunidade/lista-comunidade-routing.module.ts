import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComunidadeComponent } from './lista-comunidade.component';


const routes: Routes = [
  {
    path: 'lista-comunidade',
    component: ListaComunidadeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaComunidadeRoutingModule { }
