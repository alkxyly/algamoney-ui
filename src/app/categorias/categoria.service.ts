import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService) { }

  listarTodas(): Promise<any>{
    return this.http.get(this.categoriasUrl)
      .toPromise()
      .then((resposta : any) => resposta.content);
  } 
  
}
