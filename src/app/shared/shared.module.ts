import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../core/material/material.module";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../pipes/pipes.module";
import { DirectivesModule } from "../directive/directives.module";
import { FormLoginComponent } from './form-login/form-login.component';
import { FormLoginLeftComponent } from './form-login-left/form-login-left.component';
import { HeaderComponent } from './header/header.component';
import { CardDashboardComponent } from "./card-dashboard/card-dashboard.component";
import { Grafico2Component } from "./grafico-2/grafico-2.component";
import { Grafico1Component } from "./grafico-1/grafico-1.component";
import { DataNotFoundComponent } from './data-not-found/data-not-found.component';
import { TagModule } from "primeng/tag";
import { DataViewModule } from "primeng/dataview";
import { CardReputacaoComponent } from './card-reputacao/card-reputacao.component';
import { CarrosselMinhasAvaliacoesComponent } from './carrossel-minhas-avaliacoes/carrossel-minhas-avaliacoes.component';
import { ListaEventureiroComponent } from './lista-eventureiro/lista-eventureiro.component';
import { ListaGruposComponent } from './lista-grupos/lista-grupos.component';
import { RanksComponent } from './ranks/ranks.component';

@NgModule({
    declarations: [
        FormLoginComponent,
        FormLoginLeftComponent,
        HeaderComponent,
        CardDashboardComponent,
        Grafico2Component,
        Grafico1Component,
        DataNotFoundComponent,
        CardReputacaoComponent,
        CarrosselMinhasAvaliacoesComponent,
        ListaEventureiroComponent,
        ListaGruposComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        PipesModule,
        DirectivesModule,
        ReactiveFormsModule,
        TagModule,
        DataViewModule,
        RanksComponent
    ],
    exports: [
        FormsModule,
        FormLoginComponent,
        FormLoginLeftComponent,
        HeaderComponent,
        CardDashboardComponent,
        Grafico2Component,
        Grafico1Component,
        DataNotFoundComponent,
        CardReputacaoComponent,
        TagModule,
        DataViewModule,
        CarrosselMinhasAvaliacoesComponent,
        ListaEventureiroComponent,
        ListaGruposComponent,
        RanksComponent
    ]
})
export class SharedModule { }
