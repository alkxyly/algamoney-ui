import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pesquisa-pessoa',
  templateUrl: './pesquisa-pessoa.component.html',
  styleUrls: ['./pesquisa-pessoa.component.css']
})
export class PesquisaPessoaComponent implements OnInit {
  
  totalRegistros: number = 0;
  pessoas = [];
  filtro = new PessoaFiltro();
  @ViewChild('tabela') grid!: Table;

  constructor(
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler){}

  ngOnInit(): void {
    //this.pesquisar();
  }

  pesquisar(pagina: number = 0){
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      })
      .catch((error) => this.errorHandler.handleError(error));
  }

  aoMudarPagina(event: any){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina); 
  }


  confirmarExclusao(pessoa: any){
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => { this.excluir(pessoa); }
    });
  }


  excluir(pessoa: any){
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
       this.grid.reset();
       this.messageService.add({severity:'success', summary:'Exclusão da Pessoa', detail:'Pessoa excluída com sucesso!'});
      })
      .catch((error) => this.errorHandler.handleError(error));
  }

}
