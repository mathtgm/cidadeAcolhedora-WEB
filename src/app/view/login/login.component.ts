import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      usuario: '',
      senha: ''
    })
    if(localStorage.getItem("userInfo") !== null) {
      this.router.navigate(["usuario/painel"]);
    }
  }

  formLogin: FormGroup;

  validarUsuario(): void {
    let msg = document.getElementById("notificacao");
    this.usuarioService.autenticarUsuario(this.formLogin.get("usuario")!.value, this.formLogin.get("senha")!.value)
    .subscribe(result => {
      this.router.navigate(["usuario/painel"]);
      localStorage.setItem("userInfo", JSON.stringify(result))
    },
    errorMsg => {
      msg!.hidden = false;
      msg!.textContent = errorMsg.error.message;
    });
  }

}
