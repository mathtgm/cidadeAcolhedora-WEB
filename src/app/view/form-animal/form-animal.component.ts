import { Animal } from './../../model/animal/animal.model';
import { AnimalImagem } from './../../model/animal/animalImagem.model';
import { AnimalService } from './../../services/animal/animal.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-animal',
  templateUrl: './form-animal.component.html',
  styleUrls: ['./form-animal.component.css'],
})
export class FormAnimalComponent implements OnInit {

  formAnimal: FormGroup;
  msgStatus: boolean = true;
  submited: boolean = false;
  msg: String = ''
  urlImage: String = 'http://localhost:8080/animal/imagem/';
  listaImagemUpload: File[] = [];
  listaImagemAnimal: AnimalImagem[] = [];
  idAnimal: bigint | null = null;

  constructor(private formBuilder: FormBuilder, private animalService: AnimalService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.formAnimal = this.formBuilder.group({
      id_animal: 0,
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      cor: ['', Validators.required],
      idCidade: JSON.parse(localStorage.getItem('userInfo')!).cidade,
      idEstado: JSON.parse(localStorage.getItem('userInfo')!).estado,
      idDoador: JSON.parse(localStorage.getItem('userInfo')!),
      imagem: [],
      sexo: ['', Validators.required],
      idade: ['', Validators.required],
      nivelCarinho: [1, [Validators.min(1), Validators.max(5)]],
      nivelSociavel: [1, [Validators.min(1), Validators.max(5)]],
      nivelBrincalhao: [1, [Validators.min(1), Validators.max(5)]],
      descricao: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(parametros => {
      if (parametros.get("id") !== null) {
        this.idAnimal = BigInt(parametros.get("id")!);
        this.preencherCampos();
      }
    });
    this.atualizarCamposLvl();
  }

  get formControl() {

    return this.formAnimal.controls;

  }

  // Preencher todos os campos caso haver uma id no endereço da página
  preencherCampos(): void {
    this.animalService.procaraAnimalPorId(this.idAnimal!).subscribe(result => {
      this.formAnimal.patchValue({
        id_animal: this.idAnimal!.toString(),
        nome: result.nome,
        tipo: result.tipo,
        cor: result.cor,
        idCidade: JSON.parse(localStorage.getItem('userInfo')!).cidade,
        idEstado: JSON.parse(localStorage.getItem('userInfo')!).estado,
        idDoador: JSON.parse(localStorage.getItem('userInfo')!),
        imagem: result.imagem,
        sexo: result.sexo,
        idade: result.idade,
        nivelCarinho: result.nivelCarinho,
        nivelSociavel: result.nivelSociavel,
        nivelBrincalhao: result.nivelBrincalhao,
        descricao: result.descricao
      });
      this.listaImagemAnimal = result.imagem;
      this.atualizarCamposLvl();
    }, error => {
      this.msg = "Ocorreu um erro ao procurar os dados do animal, por favor entre em contato com o administrador!";
      this.msgStatus = false
    });

    this.atualizarCamposLvl();

  }

  // Atualiza as menssagens do campo de nível.
  atualizarCamposLvl(): void {
    this.lvlBrincadeira();
    this.lvlCarinho();
    this.lvlSociavel();
  }

  excluirImagem(imagem: AnimalImagem): void {
    this.listaImagemAnimal = this.listaImagemAnimal.filter(value => { return value.id_imagem !== imagem.id_imagem });
    this.formAnimal.patchValue({ imagem: this.listaImagemAnimal });
    this.animalService.removerAnimalImagem(imagem).subscribe(result => console.log(result));
  }

  //Método para exibir a msg quando o campo de nível de carinho for alterado
  lvlCarinho(): void {
    let msg = <HTMLElement>document.querySelector("#carinhoMsg");
    let inputValue = this.formAnimal.controls['nivelCarinho'].value;
    if (inputValue <= 2) {
      msg.className = 'alert alert-primary mt-2';
      msg.innerText = 'Nível de carinho de 1 á 2, o animalzinho não apresenta carinho com os donos/pessoas';
    } else if (inputValue <= 4) {
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
    if (inputValue <= 2) {
      msg.className = 'alert alert-primary mt-2';
      msg.innerText = 'Nível sociável de 1 á 2, o animalzinho não gosta de socializar';
    } else if (inputValue <= 4) {
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
    if (inputValue <= 2) {
      msg.className = 'alert alert-primary mt-2';
      msg.innerText = 'Nível brincalhão de 1 á 2, o animalzinho não gosta de brincar';
    } else if (inputValue <= 4) {
      msg.className = 'alert alert-info mt-2';
      msg.innerText = 'Nível brincalhão de 3 á 4, o animalzinho gosta de brincar algumas vezes';
    } else {
      msg.className = 'alert alert-success mt-2';
      msg.innerText = 'Nível brincalhão de 5, o animalzinho gosta de brincar toda horas ou com todos';
    }
  }

  envioFormAnimal(): void {
    this.submited = true;
    if (this.formAnimal.valid) {
      if (this.idAnimal !== null) {
        this.animalService.atualizarAnimalAdocao(this.formAnimal.value).subscribe(
          {
            next: (result) => {
              this.envioFormAnimalImagem(result);
              this.msgStatus = true;
              this.msg = "Dados do animal atualizado com sucesso!";
              this.preencherCampos();
            },
            error: (error) => {
              this.msg.concat("Erro ao atualizar o dados do animal, por favor contate o administrador!\n");
              this.msgStatus = false;
            }
          });
      } else {
        this.animalService.cadastrarAnimalAdocao(this.formAnimal.value).subscribe({
          next: (result) => {
            this.envioFormAnimalImagem(result);
            this.msgStatus = true;
            this.msg = "Animal cadastrado com sucesso!"
            this.idAnimal = result.id_animal;
            this.listaImagemUpload = [];
            this.preencherCampos();
          },
          error: (error) => {
            this.msg.concat("Erro ao atualizar o dados do animal, por favor contate o administrador!\n")
            this.msgStatus = false
          }
        });
      }
    }
  }

  envioFormAnimalImagem(animal: Animal): void {
    if (this.listaImagemUpload.length > 0) {
      for (let imagem of this.listaImagemUpload)
        this.animalService.cadastrarAnimalAdocaoImagem(animal, imagem).subscribe({
          next: (result) => {
            this.listaImagemAnimal.push(result);
          },
          error: (error) => {
            this.msg.concat("Erro ao enviar a imagem para o banco de dados\n")
          this.msgStatus = false;
          }
        });
    }
  }

  setImagem(event: any): void {
    let listaArquivo = [];
    for (let file of event.target.files) {
      listaArquivo.push(file);
    }

    this.listaImagemUpload = listaArquivo;

  }

}
