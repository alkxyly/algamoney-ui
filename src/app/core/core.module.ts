import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData  } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { RouterModule } from '@angular/router';



registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [ NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports:[ 
    NavbarComponent,
    ToastModule, 
    ConfirmDialogModule
  ],
  providers: [
    DatePipe,
    ConfirmationService,
    LancamentoService, 
    MessageService,
    ErrorHandlerService,
   
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],

})
export class CoreModule { }
