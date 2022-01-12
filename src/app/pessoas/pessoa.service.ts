import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';

export class PessoaFiltro{
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  headers = new HttpHeaders()
  .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

  url = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any>{

    return this.http.get(this.url, { headers: this.headers })
      .toPromise()
      .then((response: any) => response.content);
  }

  pesquisar(filtro: PessoaFiltro): Promise<any>{
    let params = new HttpParams();
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.url}`, { params , headers: this.headers })
        .toPromise()
        .then((response: any) => {
          const pessoas = response.content;
          const resultado ={
            pessoas,
            total: response.totalElements
          };

          return resultado;
        });
  }

  excluir(codigo: number): Promise<void>{
    return this.http.delete(`${this.url}/${codigo}`, { headers: this.headers })
      .toPromise()
      .then(() => null);
  } 

  alterarStatus(codigo: number, ativo:boolean): Promise<void>{
    const headers = new HttpHeaders()
     .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
     .append('Content-Type', 'application/json');

    return this.http.put(`${this.url}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa>{

    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(this.url, pessoa, { headers })
      .toPromise();
  }
}
