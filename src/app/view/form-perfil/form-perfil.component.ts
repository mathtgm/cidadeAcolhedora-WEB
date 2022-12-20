import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cidade } from 'src/app/model/cidade/cidade.model';
import { Estado } from 'src/app/model/estado/estado.model';
import { Genero } from 'src/app/model/usuario/enum/usuario.genero.enum';
import { Usuario } from 'src/app/model/usuario/usuario.model';
import { CidadeService } from 'src/app/services/cidade/cidade.service';
import { EstadoService } from 'src/app/services/estado/estado.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: ['./form-perfil.component.css']
})
export class FormPerfilComponent implements OnInit {

  msgStatus: boolean = false;
  msgAlerta: String = '';
  submitted: boolean = false;
  formPerfil: FormGroup;
  usuario: Usuario = JSON.parse(localStorage.getItem("userInfo")!);
  enumGeneroValues: String[] = Object.values(Genero);
  enumGeneroKeys: String[] = Object.keys(Genero);
  estados: Estado[];
  cidades: Cidade[];

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private router: Router, private estadoService: EstadoService, private cidadeService: CidadeService) {
    this.formPerfil = formBuilder.group({
      id_usuario: this.usuario.id_usuario,
      nome: ['', Validators.required],
      documento: ['', Validators.required],
      telefone: ['', Validators.required],
      genero: ['', Validators.required],
      cidade: this.usuario.cidade,
      estado: this.usuario.estado,
      cidadeId: [0, Validators.required],
      estadoId: [0, Validators.required]
    });
    
  }

  ngOnInit(): void {
    this.checarUsuario();
  }

  checarUsuario(): void {
    if(localStorage.getItem("userInfo") === null) {
      this.router.navigate(['/usuario/painel']);
    } else {
      this.preencherCampos();
    }
  }

  preencherCampos(): void {
    this.formPerfil.patchValue({
      nome: this.usuario.nome,
      documento: this.usuario.documento,
      telefone: this.usuario.telefone,
      genero: this.usuario.genero,
      cidadeId: this.usuario.cidade.id_cidade,
      estadoId: this.usuario.estado.id_estado
    });
    this.listarEstado();
    this.listarCidade();
  }

  listarCidade(event?: any): void {
    if(event === undefined) {
      event = this.formPerfil.get("estadoId")?.value;
    } else {
      this.formPerfil.patchValue({cidadeId: undefined})
      event = event.value
    }

    this.cidadeService.listarCidadesEstados(BigInt(event)).subscribe({
      next: result => {
        this.cidades = result;
      }
    });
    
  }

  listarEstado(): void {
    this.estadoService.listarEstados().subscribe({
      next: result => this.estados = result
    });
  }
  
  // Atualiza os parametros de cidade e estado quando o cliente envia o formulario
  atualizarPerfil(): void {
    this.submitted = true;
    
    // Checa se o estado foi alterado, se sim faz a alteracao
    if(this.formControl["estadoId"].touched || this.formControl["cidadeId"].touched) {
      this.estadoService.procurarEstado(this.formPerfil.get("estadoId")!.value).subscribe({
        next: result => {
          this.formPerfil.patchValue({estado: result});
          this.cidadeService.getCidade(this.formPerfil.get("cidadeId")!.value).subscribe({
            next: result => this.formPerfil.patchValue({cidade: result}),
            complete: () => this.enviarFormulario()
          });
        }
      });
    } else {
      this.enviarFormulario();
    }

  }

  // Valida o formulario e envia as informacoes
  enviarFormulario(): void {
    if(this.formPerfil.valid) {
      this.usuarioService.atualizarUsuario(this.formPerfil.value).subscribe({
        next: result => {
          localStorage.setItem("userInfo", JSON.stringify(result));
          this.msgAlerta = 'Perfil atualizado com sucesso';
          this.msgStatus = true;
        },
        error: errorMsg => {
          console.log(errorMsg);
          this.msgAlerta = 'Erro ao atualziar as informações, entre em contato com o administrador do sistema';
          this.msgStatus = false;
        }
      });
    }
  }

  get formControl() {

    return this.formPerfil.controls;

  }

}
