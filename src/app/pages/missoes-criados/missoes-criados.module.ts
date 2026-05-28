import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MissoesCriadosComponent } from './missoes-criados.component';
import { MissoesCriadosRoutingModule } from './missoes-criados-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
    declarations: [MissoesCriadosComponent],
    imports: [
        CommonModule,
        MissoesCriadosRoutingModule,
        SharedModule,
        CardModule,
        ButtonModule,
        AccordionModule
    ],
    exports: [MissoesCriadosComponent]
})
export class MissoesCriadosModule { }
