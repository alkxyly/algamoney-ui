import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisa-pessoa',
  templateUrl: './pesquisa-pessoa.component.html',
  styleUrls: ['./pesquisa-pessoa.component.css']
})
export class PesquisaPessoaComponent  {

  pessoas = [
    {nome: 'Maria Eduarda', cidade: 'Aracaju', estado: 'SE', status: true},
    {nome: 'Carlos', cidade: 'Santa do São Francisco', estado: 'SE', status: false},
    {nome: 'Alex', cidade: 'Ilha das Flores', estado: 'SE', status: false},
    {nome: 'Alberto', cidade: 'Penedo', estado: 'AL', status: true},
    {nome: 'José da Silva Santos', cidade: 'Japoatã', estado: 'SE', status: false}
  ];

}
