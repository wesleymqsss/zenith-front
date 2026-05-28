import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../core/material/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';
import { MinhasMissoesComponent } from './minhas-missoes.component';
import { MinhasMissoesRoutingModule } from './minhas-missoes-routing.module';

@NgModule({
  declarations: [
    MinhasMissoesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    MinhasMissoesRoutingModule,
    PipesModule 
  ],
  exports: [
    MinhasMissoesComponent
  ]
})

export class MinhasMissoesModule { }
