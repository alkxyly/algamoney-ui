import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private erroHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  pessoa: Pessoa =  new Pessoa();

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    if(codigoPessoa)
      this.buscarPorCodigo(codigoPessoa);

    this.title.setTitle('Novo lançamento');
  }

  cadastrar(form: NgForm){
    this.pessoaService.adicionar(this.pessoa).then(
      () =>{
        this.messageService.add({severity:'success', summary:'Cadastro', detail:'Pessoa '+this.pessoa.nome+' cadastrada'});
        form.reset();
      }
    ).catch(error => this.erroHandlerService.handle(error));
  }

  buscarPorCodigo(codigoPessoa: number){
    if(codigoPessoa){
      this.pessoaService.buscarPorCodigo(codigoPessoa)
        .then((pessoa) => {
          this.pessoa = pessoa
        })
        .catch((error) => this.erroHandlerService.handle(error));  
    }
  }

  novo(form: NgForm){
    form.reset();
    setTimeout(function(){
      this.pessoa = new Pessoa();   
    }.bind(this), 1);  // para limpar o formulario

    this.router.navigate(['/pessoas/novo']);
  }

  get editando(){
    return Boolean(this.pessoa.codigo);
  } 
}
