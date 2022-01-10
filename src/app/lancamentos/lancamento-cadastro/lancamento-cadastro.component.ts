import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';

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

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService) { }

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
      .then(pessoas => this.pessoas = pessoas.map( pessoa => { return {label: pessoa.nome, value: pessoas.codigo}}))
      .catch(erro => this.errorHandler.handle(erro));
  }

}
