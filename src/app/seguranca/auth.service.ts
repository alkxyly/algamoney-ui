import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient, 
    private jwtHelper: JwtHelperService
  ){
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        console.log(response);
        this.armazenarToken(response['access_token'])
      })
      .catch(response => {
        if(response.status === 400){
          const responseJson = response.json();
          if(responseJson.error === 'invalid_grant'){
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(response);
      });
  }

  temPermissao(permissao: string): boolean{
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles: string[]): boolean{
    for(const role of roles){
      if(this.temPermissao(role))
        return true;
    }
    return false;
  }

  public armazenarToken(token: string){
    this.jwtPayload= this.jwtHelper.decodeToken(token);
    console.log(this.jwtPayload);
    localStorage.setItem('token', token);
  }

  obterNovoAccessToken(): Promise<void>{
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, {headers , withCredentials: true})
      .toPromise()
      .then(response => {
        this.armazenarToken(response['access_token'])
      }).catch(response =>{
        console.log('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');  
    return !token || this.jwtHelper.isTokenExpired(token);
  }


  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  private carregarToken(){
    const token = localStorage.getItem('token');
    if(token){
      this.armazenarToken(token)
    }
  }
}
