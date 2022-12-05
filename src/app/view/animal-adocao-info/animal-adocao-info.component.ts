import { CommonModule } from '@angular/common';
import { Animal } from './../../model/animal/animal.model';
import { AnimalService } from './../../services/animal/animal.service';
import { Component, enableProdMode, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal-adocao-info',
  templateUrl: './animal-adocao-info.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./animal-adocao-info.component.css']
})
export class AnimalAdocaoInfoComponent implements OnInit {

  animal: Animal;

  constructor(private animalService: AnimalService) {
    this.animalService.procaraAnimalPorId(BigInt(46)).subscribe({
      next: result => {
        this.animal = result;
      }
    });
  }

  ngOnInit() {
    
  }

}
