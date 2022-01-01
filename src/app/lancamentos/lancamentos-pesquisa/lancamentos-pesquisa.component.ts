import { Component, OnInit } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{
  
  totalRegistros: number = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  constructor(private lancamentoService: LancamentoService){}

  ngOnInit(): void {
    //this.pesquisar();
  }

  pesquisar(pagina:number = 0){
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro).then(resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    });
  }

  aoMudarPagina(event: any){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
  
}
