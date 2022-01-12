import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    private erroHandlerService: ErrorHandlerService) { }

  pessoa: Pessoa =  new Pessoa();

  ngOnInit(): void {
  }

  cadastrar(form: NgForm){
    this.pessoaService.adicionar(this.pessoa).then(
      () =>{
        this.messageService.add({severity:'success', summary:'Cadastro', detail:'Pessoa '+this.pessoa.nome+' cadastrada'});
        form.reset();
      }
    ).catch(error => this.erroHandlerService.handle(error));
  }
}
