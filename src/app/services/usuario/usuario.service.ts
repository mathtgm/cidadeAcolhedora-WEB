import { Usuario } from './../../model/usuario/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiURL = "http://localhost:8080/usuario/";

  constructor(private httpClient: HttpClient) { }

  autenticarUsuario(user: String, pswd: String): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.apiURL, { usuario: user, senha: pswd});
  }

  atualizarUsuario(usuario: Usuario): Observable<Usuario> {

    return this.httpClient.put<Usuario>(this.apiURL + 'atualizar/', usuario);

  }

  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {

    return this.httpClient.put<Usuario>(this.apiURL + 'cadastrar/', usuario);

  }

}
