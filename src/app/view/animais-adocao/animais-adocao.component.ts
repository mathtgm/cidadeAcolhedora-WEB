import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animais-adocao',
  templateUrl: './animais-adocao.component.html',
  styleUrls: ['./animais-adocao.component.css']
})
export class AnimaisAdocaoComponent implements OnInit {

  nomeAnimal!: String;

  constructor() { }

  ngOnInit(): void {
  }

  pesquisarNomeAnimal(): void {
    this.nomeAnimal = (<HTMLInputElement>document.getElementById('filtro')).value;
  }


}
