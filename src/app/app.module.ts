import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LancamentosModule } from "./lancamentos/lancamentos.module";
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AuthService } from './seguranca/auth.service';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
          
    CoreModule,
    LancamentosModule,
    PessoasModule,
    SegurancaModule,
    
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent, AuthService]
})


export class AppModule { }
