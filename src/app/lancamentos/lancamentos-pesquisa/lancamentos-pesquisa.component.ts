import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{
  
  totalRegistros: number = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid!: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private auth: AuthService
    ){}

  ngOnInit(): void {
    //this.pesquisar();
    this.title.setTitle('Pesquisa de Lançamentos');
  }

  pesquisar(pagina:number = 0){
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro).then(resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: any){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any){
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => { this.excluir(lancamento); } 
    });        
  }

  excluir(lancamento: any){
    this.lancamentoService.excluir(lancamento.codigo).then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.reset();
      }
      this.messageService.add({severity:'success', summary:'Exclusão do Lançamento', detail:'Lançamento excluído com sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));    
  }
  
  
}
