import { Component, OnInit } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pesquisa-pessoa',
  templateUrl: './pesquisa-pessoa.component.html',
  styleUrls: ['./pesquisa-pessoa.component.css']
})
export class PesquisaPessoaComponent implements OnInit {
  
  totalRegistros: number;
  pessoas = [];
  filtro = new PessoaFiltro();

  constructor(private pessoaService: PessoaService){}

  ngOnInit(): void {
    //this.pesquisar();
  }

  pesquisar(pagina: number = 0){
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  aoMudarPagina(event: any){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina); 
  }

}
