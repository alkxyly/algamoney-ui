import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Lancamento } from '../core/model';

export class LancamentoFiltro{
  descricao: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';


  constructor(
    private http: HttpClient,
    private datePipe: DatePipe) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams();
   
   params =  params.set('page', filtro.pagina.toString());
   params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if(filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }
  
    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

  return this.http.get(`${this.lancamentosUrl}?resumo`,
        { headers, params })
      .toPromise()
      .then((response: any) => {
        const lancamentos = response.content;
        const resultado ={
          lancamentos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  } 

  adicionar(lancamento: Lancamento): Promise<Lancamento>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
        
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers })
      .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    console.log('atualizar lancamento', lancamento, this.lancamentosUrl+'/'+lancamento.codigo);
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`,lancamento, { headers })
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then( (response: any) => {
         this.converterStringsParaDatas([response]) ;
         return response;
      });
  }

  private converterStringsParaDatas(lancamentos: any[]){
    for (const lancamento of lancamentos) {

      let offset = new Date().getTimezoneOffset() * 60000;
      
      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento).getTime() + offset);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }
}
