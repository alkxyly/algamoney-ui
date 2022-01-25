import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';

import { SharedModule } from '../shared/shared.module';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PesquisaPessoaComponent } from './pesquisa-pessoa/pesquisa-pessoa.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasGridComponent,
    PesquisaPessoaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,

    InputTextModule,
    ButtonModule,    
    TooltipModule,
    InputMaskModule,    
    TableModule    
  ],
  exports:[]
})
export class PessoasModule { }
