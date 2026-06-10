import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GruposRoutingModule } from './grupos-routing.module';
import { GruposComponent } from './grupos.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../core/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GruposComponent],
  imports: [CommonModule, GruposRoutingModule, SharedModule, MaterialModule, ReactiveFormsModule],
  exports: [GruposComponent],
})
export class GruposModule {}