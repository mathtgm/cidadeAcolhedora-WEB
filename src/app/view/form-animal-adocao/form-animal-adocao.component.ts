import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { Animal } from 'src/app/model/animal/animal.model';
import { Solicitacao } from 'src/app/model/solicitacao/solicitacao.model';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { SolicitacaoService } from 'src/app/services/solicitacao/solicitacao.service';

@Component({
  selector: 'app-form-animal-adocao',
  templateUrl: './form-animal-adocao.component.html',
  styleUrls: ['./form-animal-adocao.component.css']
})
export class FormAnimalAdocaoComponent implements OnInit {

  animal?: Animal;
  temTutor: boolean = false;
  solicitacao?: Solicitacao;
  visualizacao: boolean = false;
  isDoador: boolean = false;
  isAdotante: boolean = false;
  msgPagina?: String;
  msgStatus: boolean = false;
  formAdocao: FormGroup;
  submited: boolean = false;

  constructor(private activedRoute: ActivatedRoute, private animalService: AnimalService, private router: Router, private formBuilder: FormBuilder, private solicitacaoService: SolicitacaoService) {
    this.formAdocao = formBuilder.group({
      descricao: ['', Validators.required],
      situacao: '',
      id_animal: this.animal,
      id_adotante: JSON.parse(localStorage.getItem("userInfo")!)
    });
  }

  ngOnInit(): void {
    if (this.router.url.match("solicitacao")) {
      this.consultarSolicitacao();
    } else {
      this.consultaAnimal();
    }
  }

  get formControl() {

    return this.formAdocao.controls;

  }

  validarFormulario(): void {
    this.submited = true;
    this.formAdocao.valid;
  }

  enviarSolicitacao(): void {
    if (this.formAdocao.valid) {
      this.solicitacaoService.cadastrarSolicitacao(this.formAdocao.value).subscribe({
        next: result => {
          if (result.id_solicitacao === null) {
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
        complete: () => window.scrollTo(0, 0)
      });
    }
  }

  alterarStatus(status: String): void {

    this.solicitacao!.situacao = status;

    this.solicitacaoService.atualizarStatus(this.solicitacao!).subscribe({
      next: result => {
        this.solicitacao = result;
        this.animal = result.id_animal;
        this.msgPagina = 'Situação da solicitação alterada';
        this.msgStatus = true;
      }
    });
    
  }

  // Checa se o usuario é o Doador/está logado, caso acontecer uma das opções redireciona de página. 
  checarVisualizacao(): void {

    this.temTutor = this.animal?.idTutor !== undefined;

    let usuario = JSON.parse(localStorage.getItem("userInfo")!);

    if (usuario !== null) {

      if(this.router.url.match("solicitacao")) {

        this.visualizacao = true;

        // Checa se o usuario logado é o doardo do animal
        this.isAdotante = usuario.id_usuario === this.solicitacao?.id_adotante.id_usuario;
        
        // Checa se o usuario é o fez a solicitação de adoção
        this.isDoador = usuario.id_usuario === this.animal?.idDoador.id_usuario;
        
        if(!(this.isAdotante || this.isDoador)) {
          alert("Você não pode acessar essa página.")
          this.router.navigate(['/animal/adocao']);
        }

      } else {

        let temTutor = this.animal?.idTutor !== null;

        if(this.isDoador || temTutor) {
          alert("Você não pode acessar essa página.")
          this.router.navigate(['/animal/adocao']);
        }

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
              this.formAdocao.patchValue({ id_animal: result });
              this.checarVisualizacao();
            },
            error: () => {
              this.router.navigate(['/animal/adocao']);
            }
          });
        }
      }
    });
  }

  consultarSolicitacao(): void {
    this.activedRoute.paramMap.subscribe({
      next: parametros => {
        if (parametros.get("id") === null) {
          this.router.navigate(['/animal/adocao']);
        } else {
          this.solicitacaoService.consultaSolicitacaoPorId(BigInt(parametros.get("id")!)).subscribe({
            next: result => {
              this.solicitacao = result;
              this.animal = result.id_animal;
              this.formAdocao.patchValue({id_animal: result.id_animal});
              this.checarVisualizacao();
            }
          });
        }
      }
    });

  }

}
