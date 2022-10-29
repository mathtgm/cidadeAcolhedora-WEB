import { Animal } from './../../model/animal/animal.model';
import { AnimalService } from './../../services/animal/animal.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tabela-animal-adocao-usuario',
  templateUrl: './tabela-animal-adocao-usuario.component.html',
  styleUrls: ['./tabela-animal-adocao-usuario.component.css']
})
export class TabelaAnimalAdocaoUsuarioComponent implements OnInit, OnChanges {

  idDoador: bigint = JSON.parse(localStorage.getItem("userInfo")!).id_usuario;
  listaAnimal: Animal[] = [];
  @Input() pesquisaNomeAnimal: String = '';

  constructor(private animalService: AnimalService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes["pesquisaNomeAnimal"].isFirstChange()) {
      this.listarAnimaisAdocaoFiltro();
    }
  }

  ngOnInit(): void {
    this.listarAnimaisAdocao();
  }

  //Lista todos os animais que estao para adocao do usuario
  listarAnimaisAdocao(): void {
    this.animalService.procuraAnimalPorDoador(this.idDoador).subscribe(result => {
      this.listaAnimal = result;
    });
  }

  //Filtra por nome dos animais que estao para adocao do usuario
  listarAnimaisAdocaoFiltro(): void{
    alert(this.idDoador);
    alert(this.pesquisaNomeAnimal);
    if(this.pesquisaNomeAnimal === '') {
      this.listarAnimaisAdocao();
    } else {
      this.animalService.procurarAnimalPorDoadorNome(this.idDoador, this.pesquisaNomeAnimal).subscribe(result => {
        this.listaAnimal = result;
      });
    }
  }

}
