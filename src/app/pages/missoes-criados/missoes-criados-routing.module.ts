import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissoesCriadosComponent } from './missoes-criados.component';

const routes: Routes = [{ path: '', component: MissoesCriadosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissoesCriadosRoutingModule { }
