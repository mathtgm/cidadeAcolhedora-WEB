import { Animal } from './../../model/animal/animal.model';
import { AnimalService } from './../../services/animal/animal.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-animal-adocao-info',
  templateUrl: './animal-adocao-info.component.html',
  styleUrls: ['./animal-adocao-info.component.css']
})
export class AnimalAdocaoInfoComponent implements OnInit {

  animal?: Animal;
  apiURL: String = 'http://localhost:8080/animal/imagem/';

  constructor(private animalService: AnimalService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.paramMap.subscribe({
      next: parametro => {
        animalService.procaraAnimalPorId(BigInt(parametro.get("id")!)).subscribe({
          next: result => {
            this.animal = result;
          },
          error: () => {
            router.navigate(['/animal/adocao'])
          }
        });
      }
    });
  }

  ngOnInit() {
    
  }

}
