import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cidade } from 'src/app/model/cidade/cidade.model';
import { Estado } from 'src/app/model/estado/estado.model';
import { Genero } from 'src/app/model/usuario/enum/usuario.genero.enum';
import { CidadeService } from 'src/app/services/cidade/cidade.service';
import { EstadoService } from 'src/app/services/estado/estado.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-usuario-cadastro',
  templateUrl: './form-usuario-cadastro.component.html',
  styleUrls: ['./form-usuario-cadastro.component.css']
})
export class FormUsuarioCadastroComponent implements OnInit{
  
  formUsuario: FormGroup;
  submitted: boolean = false;
  cidades: Cidade[];
  estados: Estado[];
  generoKeys = Object.keys(Genero);
  generoValues = Object.values(Genero);

  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private usuarioService: UsuarioService
    ) {
      this.formUsuario = formBuilder.group({
        nome: ['', Validators.required],
        documento: ['', Validators.required],
        telefone: ['', Validators.required],
        genero: ['', Validators.required],
        usuario: ['', Validators.required],
        senha: ['', [Validators.minLength(6), Validators.maxLength(16)]],
        cidadeId: ['', Validators.required],
        estadoId: ['', Validators.required],
        cidade: '',
        estado: ''
      });
    }

  ngOnInit(): void {
    this.usuarioLogado();
    this.listarEstados();
    console.log(this.formControl)
  }

  get formControl() {

    return this.formUsuario.controls;

  }

  usuarioLogado(): void {
    if(environment.userInfo) {
      this.router.navigate(['/usuario/painel']);
    }
  }

  listarEstados(): void {
    this.estadoService.listarEstados().subscribe({
      next: result => this.estados = result
    });
  }

  listaCidades(): void {
    this.cidadeService.listarCidadesEstados(BigInt(this.formUsuario.get("estadoId")!.value)).subscribe({
      next: result => this.cidades = result
    });
  }

  definirEstadoCidadeForm(): void {

    this.estadoService.procurarEstado(BigInt(this.formUsuario.get("estadoId")!.value)).subscribe({
      next: result => {
        this.formUsuario.patchValue({estado: result});
        this.cidadeService.getCidade(BigInt(this.formUsuario.get("cidadeId")!.value)).subscribe({
          next: result => this.formUsuario.patchValue({cidade: result})
        });
        }
    });

  }

  enviarFormulario(): void {
    this.submitted = true;
    if(this.formUsuario.valid) {
      this.usuarioService.cadastrarUsuario(this.formUsuario.value).subscribe({
        next: result => {
          localStorage.setItem("userInfo", JSON.stringify(result));
          this.router.navigate(["/"])
        }
      });
    }
  }

}
