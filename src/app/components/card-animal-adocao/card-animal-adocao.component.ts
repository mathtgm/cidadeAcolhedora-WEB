import { Animal } from './../../model/animal/animal.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-animal-adocao',
  templateUrl: './card-animal-adocao.component.html',
  styleUrls: ['./card-animal-adocao.component.css']
})
export class CardAnimalAdocaoComponent {

  constructor() {

  }

  @Input() animal!: Animal;
  apiURL: String = 'http://localhost:8080/animal/imagem/';
}
