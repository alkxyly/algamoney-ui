import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + '/pessoas';
  }

  listarTodas(): Promise<any>{
    return this.http.get(this.url)
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

    return this.http.get(`${this.url}`, { params })
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
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  } 

  alterarStatus(codigo: number, ativo:boolean): Promise<void>{
    return this.http.put(`${this.url}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa>{
    return this.http.post<Pessoa>(this.url, pessoa)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa>{
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.get<Pessoa>(`${this.url}/${
      codigo}`, { headers: headers })
      .toPromise();
  }
}
