import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animais-adocao',
  templateUrl: './animais-adocao.component.html',
  styleUrls: ['./animais-adocao.component.css']
})
export class AnimaisAdocaoComponent implements OnInit {

  nomeAnimal!: String;
  msg: String = '';
  msgStatus: boolean = false;

  ngOnInit(): void {
  }

  pesquisarNomeAnimal(): void {
    this.nomeAnimal = (<HTMLInputElement>document.getElementById('filtro')).value;
  }

  showMsg(mensagem: {msgStatus: boolean, msg: String}): void {

    this.msg = mensagem.msg;
    this.msgStatus = mensagem.msgStatus;

  }
}
