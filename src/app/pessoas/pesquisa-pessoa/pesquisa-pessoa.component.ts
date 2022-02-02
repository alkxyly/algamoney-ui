import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Pessoa } from 'src/app/core/model';
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
  pessoa: Pessoa =  new Pessoa();

  @ViewChild('tabela') grid!: Table;

  constructor(
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private title: Title){}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Pessoas');
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

  alterarStatus(pessoa: any){
    this.pessoaService.alterarStatus(pessoa.codigo, !pessoa.ativo)
      .then(() =>{
        this.grid.reset();
        this.messageService.add({severity:'success', summary:'Alteração de Status', detail:'Status alterado com sucesso!'});
      }).catch((erro) => this.errorHandler.handleError(erro));
  }
   


}
