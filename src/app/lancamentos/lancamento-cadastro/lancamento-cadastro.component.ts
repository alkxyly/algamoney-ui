import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  
  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ]

  categorias = [];
  pessoas = []; 
  lancamento: Lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias(){
    this.categoriaService.listarTodas()
      .then(categorias => this.categorias = categorias.map( elemento => { return {label: elemento.nome, value: elemento.codigo}}))
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas(){
    this.pessoaService.listarTodas()
      .then(pessoas => this.pessoas = pessoas.map( pessoa => { return {label: pessoa.nome, value: pessoa.codigo}}))
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm){
    console.log(this.lancamento);
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });
        form.reset();
        this.lancamento = new Lancamento();
        
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
