import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { Animal } from 'src/app/model/animal/animal.model';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { SolicitacaoService } from 'src/app/services/solicitacao/solicitacao.service';

@Component({
  selector: 'app-form-animal-adocao',
  templateUrl: './form-animal-adocao.component.html',
  styleUrls: ['./form-animal-adocao.component.css']
})
export class FormAnimalAdocaoComponent implements OnInit {

  animal?: Animal;
  msgPagina?: String;
  msgStatus: boolean = false;
  formAdocao: FormGroup;
  submited: boolean = false;

  constructor(private activedRoute: ActivatedRoute, private animalService: AnimalService, private router: Router, private formBuilder: FormBuilder, private solicitacaoService: SolicitacaoService) {
    this.formAdocao = formBuilder.group({
      descricao: ['', Validators.required],
      id_animal: '',
      id_adotante: JSON.parse(localStorage.getItem("userInfo")!)
    });
  }

  ngOnInit(): void {
    this.checarVisualizacao();
    this.consultaAnimal();
  }

  get formControl() {

    return this.formAdocao.controls;

  }

  validarFormulario(): void {
    this.submited = true;
    this.formAdocao.valid;
  }

  enviarSolicitacao(): void {
    if(this.formAdocao.valid) {
      this.solicitacaoService.cadastrarSolicitacao(this.formAdocao.value).subscribe({
        next: result => {
          if(result.id_solicitacao === null) {
            this.msgPagina = 'Você já enviou uma solicitação para adoção do animalzinho!';
            this.msgStatus = false;
          } else {
            this.msgPagina = 'Solicitação enviada com sucesso!';
            this.msgStatus = true;
          }
        },
        error: error => {
          this.msgPagina = 'Erro ao enviar a solicitação, por favor entrar em contato com o Administrador do sistema';
          this.msgStatus = false;
          console.log(error);
        }, 
        complete: () => window.scrollTo(0,0)
      });
    }
  }

  // Checa se o usuario é o Doador/está logado, caso acontecer uma das opções redireciona de página. 
  checarVisualizacao(): void {

    let usuario = JSON.parse(localStorage.getItem("userInfo")!);
    let mesmoUsuario;

    if (usuario !== null) {
      // Checa se o Doador do animal é o mesmo que está tentando abrir um solicitação
      mesmoUsuario = usuario.id_usuario == this.animal?.idDoador.id_usuario;
      if(mesmoUsuario) {
        this.router.navigate(['/animal/adocao']);
      }
    } else {
      this.router.navigate(['/animal/adocao']);
    }

  }


  consultaAnimal(): void {
    this.activedRoute.paramMap.subscribe({
      next: parametros => {
        if (parametros.get("id") === null) {
          console.log(parametros.get("id"));
          this.router.navigate(['/animal/adocao']);
        } else {
          this.animalService.procaraAnimalPorId(BigInt(parametros.get("id")!)).subscribe({
            next: result => {
              this.animal = result;
              this.formAdocao.patchValue({id_animal: result});
            },
            error: () => {
              this.router.navigate(['/animal/adocao']);
            }
          });
        }
      }
    });
  }

}
