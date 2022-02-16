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
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../seguranca/auth.service';



registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [ NavbarComponent, PaginaNaoEncontradaComponent],
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
    AuthService,
    Title,
   
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],

})
export class CoreModule { }
