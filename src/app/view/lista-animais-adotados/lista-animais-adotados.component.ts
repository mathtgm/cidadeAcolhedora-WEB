import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animal } from 'src/app/model/animal/animal.model';
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-lista-animais-adotados',
  templateUrl: './lista-animais-adotados.component.html',
  styleUrls: ['./lista-animais-adotados.component.css']
})
export class ListaAnimaisAdotadosComponent implements OnInit {

  animais: Animal[] = [];

  constructor(private animalService: AnimalService, private router: Router) {}

  ngOnInit(): void {
    this.listarAnimais();
  }

  listarAnimais(): void {
    this.animalService.procuraAnimalPorTutor(JSON.parse(localStorage.getItem("userInfo")!).id_usuario).subscribe({
      next: result => this.animais = result
    });
  }
}
