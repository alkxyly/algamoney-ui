import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

import { SharedModule } from '../shared/shared.module';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { LancamentosRountingModule } from './lancamentos-routing.module';
import { LancamentoService } from './lancamento.service';


@NgModule({
  declarations: [ 
    LancamentosPesquisaComponent,
    LancamentoCadastroComponent,
    LancamentosGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,   
    
    HttpClientModule,    
    TableModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,    
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    
    SharedModule,    
    LancamentosRountingModule
  ],
  exports:[],
  providers: [LancamentoService],
})
export class LancamentosModule { }
