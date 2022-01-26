import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit(): void {
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if(codigoLancamento) 
      this.buscarPorCodigo(codigoLancamento);
    
    this.carregarCategorias();
    this.carregarPessoas();

    this.title.setTitle('Novo lançamento');
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
    if(this.editando)
      this.atualizarLancamento(form);
    else 
      this.adicionarLancamento(form);
  }

  atualizarLancamento(form: NgForm){
    this.lancamentoService.atualizar(this.lancamento).then(lancamento => {
      this.lancamento = lancamento;
      this.messageService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso!' });
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarLancamento(form: NgForm){
    this.lancamentoService.adicionar(this.lancamento)
      .then((lancamentoAdicionado) => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });
        form.reset();
        this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo ]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  buscarPorCodigo(codigoLancamento: number){
    if(codigoLancamento){
      this.lancamentoService.buscarPorCodigo(codigoLancamento)
        .then(lancamento => {
          this.lancamento = lancamento
          this.atualizarTituloEdicao();
      }) 
      .catch(erro => this.errorHandler.handle(erro));      
    }
  }

  get editando(){
    return Boolean(this.lancamento.codigo);
  }


  novo(form: NgForm){
    form.reset();
    setTimeout(function(){
      this.lancamento = new Lancamento();   
    }.bind(this), 1);  // para limpar o formulario

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }
}
