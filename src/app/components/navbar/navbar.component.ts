import { Router } from '@angular/router';
import { Usuario } from './../../model/usuario/usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("userInfo") != null) {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo")!);
    }
  }

  userInfo?: Usuario;

  logOut(): void {
    localStorage.removeItem("userInfo");
    window.location.reload();
  }

}
