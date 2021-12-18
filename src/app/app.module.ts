import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';


import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PesquisaPessoaComponent } from './pesquisa-pessoa/pesquisa-pessoa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { AppComponent } from './app.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';



@NgModule({
  declarations: [
    AppComponent,
    LancamentosPesquisaComponent,
    NavbarComponent,
    PesquisaPessoaComponent,
    LancamentoCadastroComponent,
    PessoaCadastroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    ButtonModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    TableModule,
    TabViewModule,
    TooltipModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
