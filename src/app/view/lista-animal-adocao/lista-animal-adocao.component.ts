import { FormBuilder, FormGroup } from '@angular/forms';
import { EstadoService } from './../../services/estado/estado.service';
import { CidadeService } from './../../services/cidade/cidade.service';
import { Cidade } from './../../model/cidade/cidade.model';
import { Estado } from './../../model/estado/estado.model';
import { Animal } from './../../model/animal/animal.model';
import { AnimalService } from './../../services/animal/animal.service';
import { Component, OnInit } from '@angular/core';
import { Cor } from '../../model/animal/enum/animal.cor.enum';
import { Tipo } from '../../model/animal/enum/animal.tipo.enum';

@Component({
  selector: 'app-lista-animal-adocao',
  templateUrl: './lista-animal-adocao.component.html',
  styleUrls: ['./lista-animal-adocao.component.css']
})
export class ListaAnimalAdocaoComponent implements OnInit{

  formFiltro: FormGroup;
  listaAnimais: Animal[] = [];
  listaAnimaisAux: Animal[] = [];
  enumTipo: String[] = Object.values(Tipo);
  enumCor: String[] = Object.values(Cor);
  listaCidades: Cidade[] = [];
  listaEstados: Estado[] = [];

  constructor(private animalService: AnimalService, private cidadeService: CidadeService, private estadoService: EstadoService, private formBuilder: FormBuilder) {
    this.formFiltro = this.formBuilder.group({
      cor: 0,
      tipo: 0,
      cidade: 0,
      estado: 0,
      lvlCarinho: 0,
      lvlSociavel: 0,
      lvlBrincadeira: 0
    });
  }

  ngOnInit() {

    this.estadoService.listarEstados().subscribe({
      next: result => {
        this.listaEstados = result;
      }
    });

    this.animalService.listaAnimaisAdocao().subscribe({
      next: result => {
        this.listaAnimais = result;
        this.listaAnimaisAux = result;
      }
    });

  }

  filtrarInformacoes(): void {
    this.listaAnimais = this.listaAnimaisAux.filter(value => {

      let filtroCor: boolean = this.filtragemAnimal(value.cor, this.formFiltro.get("cor")?.value);
      let filtroTipo: boolean = this.filtragemAnimal(value.tipo, this.formFiltro.get("tipo")?.value);
      let filtroCidade: boolean = this.filtragemAnimal(value.idCidade.id_cidade, this.formFiltro.get("cidade")?.value);
      let filtroEstado: boolean = this.filtragemAnimal(value.idEstado.id_estado, this.formFiltro.get("estado")?.value);
      let filtrolvlCarinho: boolean = this.filtragemAnimal(value.nivelCarinho, this.formFiltro.get("lvlCarinho")?.value);
      let filtrolvlBrincadeira: boolean = this.filtragemAnimal(value.nivelBrincalhao, this.formFiltro.get("lvlBrincadeira")?.value);
      let filtrolvlSociavel: boolean = this.filtragemAnimal(value.nivelSociavel, this.formFiltro.get("lvlSociavel")?.value);

      return filtroCor && filtroCidade && filtroTipo && filtroEstado && filtrolvlBrincadeira && filtrolvlSociavel && filtrolvlCarinho;

    });
  }

  filtragemAnimal(animalValue: String | Number | bigint, value: String | Number): boolean {

    if(animalValue == value) {
      return true;
    } else if(value == 0) {
      return true;
    } else {
      return false;
    }

  }

  listarCidades(event: any): void {
    this.cidadeService.listarCidadesEstados(BigInt(event.target.value)).subscribe({next: result => this.listaCidades = result});
  }

}
