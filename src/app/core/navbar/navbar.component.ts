import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;
  usuarioLogado: string = '';
  constructor(
    private authService: AuthService,
    private logoutService: LogoutService,
    private router: Router,
    private errorHandler: ErrorHandler) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.jwtPayload?.nome;
  }

  temPermissao(permissao: string): boolean{
    return this.authService.temPermissao(permissao);
  }

  logout(){
    this.logoutService.logout()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(erro => this.errorHandler.handleError(erro));
  }
}
