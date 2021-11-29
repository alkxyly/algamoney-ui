import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisa-pessoa',
  templateUrl: './pesquisa-pessoa.component.html',
  styleUrls: ['./pesquisa-pessoa.component.css']
})
export class PesquisaPessoaComponent  {

  pessoas = [
    {nome: 'Maria Eduarda', cidade: 'Aracaju', estado: 'SE', status: true},
    {nome: 'Maria Eduarda', cidade: 'Santa do São Francisco', estado: 'SE', status: false},
    {nome: 'Maria Eduarda', cidade: 'Ilha das Flores', estado: 'SE', status: false},
    {nome: 'Maria Eduarda', cidade: 'Penedo', estado: 'AL', status: true},
    {nome: 'Maria Eduarda', cidade: 'Japoatã', estado: 'SE', status: false}
  ];

}
