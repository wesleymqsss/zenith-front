import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MissoesCriadosComponent } from './missoes-criados.component';
import { MissoesCriadosRoutingModule } from './missoes-criados-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/material/material.module';
import { TooltipModule } from 'primeng/tooltip';
import { QRCodeComponent } from 'angularx-qrcode';

@NgModule({
    declarations: [MissoesCriadosComponent],
    imports: [
        CommonModule,
        MissoesCriadosRoutingModule,
        SharedModule,
        CardModule,
        ButtonModule,
        AccordionModule,
        FormsModule, ReactiveFormsModule,
        MaterialModule,
        TooltipModule,
        QRCodeComponent
    ],
    exports: [MissoesCriadosComponent]
})
export class MissoesCriadosModule { }
