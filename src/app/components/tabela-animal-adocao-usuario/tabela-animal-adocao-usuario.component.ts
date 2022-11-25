import { Animal } from './../../model/animal/animal.model';
import { AnimalService } from './../../services/animal/animal.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela-animal-adocao-usuario',
  templateUrl: './tabela-animal-adocao-usuario.component.html',
  styleUrls: ['./tabela-animal-adocao-usuario.component.css']
})
export class TabelaAnimalAdocaoUsuarioComponent implements OnInit, OnChanges {

  idDoador: bigint = JSON.parse(localStorage.getItem("userInfo")!).id_usuario;
  listaAnimal: Array<Animal> = [];
  listaAnimalAuxiliar: Array<Animal> = [];

  @Output() outPutMsg = new EventEmitter<{msgStatus: boolean, msg: String}>();
  @Input() pesquisaNomeAnimal: String = '';

  constructor(private animalService: AnimalService, private router: Router) { }

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
      this.listaAnimalAuxiliar = result;
    });
  }

  //Filtra por nome dos animais que estao para adocao do usuario
  listarAnimaisAdocaoFiltro(): void {
    if(this.pesquisaNomeAnimal === '') {
      this.listaAnimal = this.listaAnimalAuxiliar;
    } else {
      this.listaAnimal = this.listaAnimalAuxiliar.filter(value => {
        return value.nome.toLowerCase().includes(this.pesquisaNomeAnimal.toString().toLowerCase());
      });
    }
  }

  removerAnimal(id_animal: bigint): void {

    this.animalService.excluirAnimalAdocao(id_animal).subscribe({
      next: (value) => {
        this.listaAnimalAuxiliar.splice(this.listaAnimalAuxiliar.findIndex(animal => {return animal.id_animal === id_animal}), 1)
        this.listaAnimal = this.listaAnimalAuxiliar;
        this.outPutMsg.emit({msgStatus: true, msg: "Animal removido com sucesso!"});
      },
      error: (error) => {
        this.outPutMsg.emit({msgStatus: false, msg: "Erro ao remover o animal, por favor entre em contato com o administrador"});
      }
    });

  }

  editarAnimal(id_animal: bigint): void {

    this.router.navigate(['usuario/painel/adocao/animal/' + id_animal]);

  }

}
