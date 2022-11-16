import { AnimalService } from './../../services/animal/animal.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-animal',
  templateUrl: './form-animal.component.html',
  styleUrls: ['./form-animal.component.css'],
})
export class FormAnimalComponent implements OnInit {

  formAnimal: FormGroup;
  listaImagem: File[] = [];
  idAnimal: bigint | null = null;

  constructor(private formBuilder: FormBuilder, private animalService: AnimalService, private activatedRoute: ActivatedRoute) {
    this.formAnimal = this.formBuilder.group({
      id_animal: 0,
      nome: '',
      tipo: '',
      cor: '',
      idCidade: JSON.parse(localStorage.getItem('userInfo')!).cidade,
      idEstado: JSON.parse(localStorage.getItem('userInfo')!).estado,
      idTutor: JSON.parse(localStorage.getItem('userInfo')!),
      imagem: [],
      sexo: '',
      idade: 0,
      nivelCarinho: 1,
      nivelSociavel: 1,
      nivelBrincalhao: 1,
      descricao: ''
    });
  }

  ngOnInit(): void {
    this.lvlBrincadeira();
    this.lvlCarinho();
    this.lvlSociavel();
    this.preencherCampos();
  }

  preencherCampos(): void {
    this.activatedRoute.paramMap.subscribe(parametros => {
      if(parametros.get("id") != null) {
        this.idAnimal = BigInt(parametros.get("id")!);
          this.animalService.procaraAnimalPorId(this.idAnimal).subscribe(result => {
            this.formAnimal.patchValue({
              id_animal: BigInt(this.idAnimal!),
              nome: result.nome,
              tipo: result.tipo,
              cor: result.cor,
              idCidade: JSON.parse(localStorage.getItem('userInfo')!).cidade,
              idEstado: JSON.parse(localStorage.getItem('userInfo')!).estado,
              idTutor: JSON.parse(localStorage.getItem('userInfo')!),
              imagem: result.imagem,
              sexo: result.sexo,
              idade: result.idade,
              nivelCarinho: result.nivelCarinho,
              nivelSociavel: result.nivelSociavel,
              nivelBrincalhao: result.nivelBrincalhao,
              descricao: result.descricao
            });
          });
      }
    });
  }

  //Método para exibir a msg quando o campo de nível de carinho for alterado
  lvlCarinho(): void {
    let msg = <HTMLElement>document.querySelector("#carinhoMsg");
    let inputValue = this.formAnimal.controls['nivelCarinho'].value;
    if(inputValue <= 2){
      msg.className = 'alert alert-primary mt-2';
      msg.innerText = 'Nível de carinho de 1 á 2, o animalzinho não apresenta carinho com os donos/pessoas';
    } else if(inputValue <= 4) {
      msg.className = 'alert alert-info mt-2';
      msg.innerText = 'Nível de carinho de 3 á 4, o animalzinho apresenta algumas vezes carinho com os donos/pessoas';
    } else {
      msg.className = 'alert alert-success mt-2';
      msg.innerText = 'Nível de carinho de 5, o animalzinho apresenta um carinho com os donos/pessoas';
    }
  }

  //Método para exibir a msg quando o campo de nível de sociavel for alterado
  lvlSociavel(): void {
    let msg = <HTMLElement>document.querySelector("#sociavelMsg");
    let inputValue = this.formAnimal.controls['nivelSociavel'].value;
    if(inputValue <= 2){
      msg.className = 'alert alert-primary mt-2';
      msg.innerText = 'Nível sociável de 1 á 2, o animalzinho não gosta de socializar';
    } else if(inputValue <= 4) {
      msg.className = 'alert alert-info mt-2';
      msg.innerText = 'Nível sociável de 3 á 4, o animalzinho gosta de socializar algumas vezes';
    } else {
      msg.className = 'alert alert-success mt-2';
      msg.innerText = 'Nível sociável de 5,  o animalzinho é muito sociável com todos';
    }
  }

  //Método para exibir a msg quando o campo de nível de brincalhão for alterado
  lvlBrincadeira(): void {
    let msg = <HTMLElement>document.querySelector("#brincalhaoMsg");
    let inputValue = this.formAnimal.controls['nivelBrincalhao'].value;
    if(inputValue <= 2){
      msg.className = 'alert alert-primary mt-2';
      msg.innerText = 'Nível brincalhão de 1 á 2, o animalzinho não gosta de brincar';
    } else if(inputValue <= 4) {
      msg.className = 'alert alert-info mt-2';
      msg.innerText = 'Nível brincalhão de 3 á 4, o animalzinho gosta de brincar algumas vezes';
    } else {
      msg.className = 'alert alert-success mt-2';
      msg.innerText = 'Nível brincalhão de 5, o animalzinho gosta de brincar toda horas ou com todos';
    }
  }

  envioFormAnimal(): void {

    this.animalService.cadastrarAnimalAdocao(this.formAnimal.value).subscribe(result => {
      if(this.listaImagem.length > 0) {
        for(let imagem of this.listaImagem)
        this.animalService.cadastrarAnimalAdocaoImagem(result, imagem);
      }
    });

  }

  setImagem(event: any): void {
    let listaArquivo = []
    for(let file of event.target.files) {
      listaArquivo.push(file);
    }

    this.listaImagem = listaArquivo;

  }

}
