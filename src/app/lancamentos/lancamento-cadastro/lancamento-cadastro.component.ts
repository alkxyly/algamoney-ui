import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if(codigoLancamento) 
      this.buscarPorCodigo(codigoLancamento);
    
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
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });
        form.reset();
        this.lancamento = new Lancamento();
        
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  buscarPorCodigo(codigoLancamento: number){
    if(codigoLancamento){
      this.lancamentoService.buscarPorCodigo(codigoLancamento)
        .then(lancamento => this.lancamento = lancamento)
        .catch(erro => this.errorHandler.handle(erro));      
    }
  }

  get editando(){
    return Boolean(this.lancamento.codigo);
  }

}
