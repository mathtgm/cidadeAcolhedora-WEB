import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-painel',
  templateUrl: './navbar-painel.component.html',
  styleUrls: ['./navbar-painel.component.css']
})
export class NavbarPainelComponent implements OnInit {

  perfilPhoto!: String;
  nome!:String;
  ultimoNome!:String;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.usuarioLogado();
    this.setFotoPerfil();
    this.setNome();
  }

  //Defini a foto de perfil do usuário aleatóriamente para cada vez o que o componente for recarregado.
  setFotoPerfil(): void {
    this.perfilPhoto = "../../../assets/perfil-photo/perfil-photo-" + Math.floor(Math.random() * 9) + ".png";
  }

  //Pega o primeiro e ultimo nome do usuário e apresenta no componente
  setNome(): void {
    let userName: String = JSON.parse(localStorage.getItem("userInfo")!).nome.trim();
    this.nome = userName.split(" ")[0];
    this.ultimoNome = userName.split(" ")[userName.split(" ").length - 1];
  }

  //Valida se tem um usuário logado, caso não redireciona para página de login
  usuarioLogado(): void {
    if(localStorage.getItem("userInfo") === null) {
      this.router.navigate(["login"])
    }
  }

  //Limpa os dados guardado localmente e redireciona para a páginal inicial
  saidaUsuario(): void {
    localStorage.removeItem("userInfo");
    this.router.navigate([""])
  }
}
