import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("userInfo") !== null) {
      this.router.navigate(["usuario/painel"]);
    }
  }

  user!: String
  pswd!: String

  validarUsuario(): void {
    let msg = document.getElementById("notificacao");
    this.usuarioService.autenticarUsuario(this.user, this.pswd)
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
