import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../core/material/material.module';
import { ListaComunidadeRoutingModule } from './lista-comunidade-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaComunidadeComponent } from './lista-comunidade.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ListaComunidadeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule, 
    SharedModule,
    ListaComunidadeRoutingModule,
    PipesModule ,
    FormsModule, 
    ReactiveFormsModule,

    TableModule,
    ButtonModule 
  ],
  exports: [
    ListaComunidadeComponent
  ]
})
export class ListaComunidadeModule { }