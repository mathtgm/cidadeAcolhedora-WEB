import { Estado } from './../../model/estado/estado.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor (private httpClient: HttpClient) {}

  apiURL: String = 'http://localhost:8080/estado/';

  listarEstados(): Observable<Estado[]> {

    return this.httpClient.get<Estado[]>(this.apiURL.toString());

  }

  procurarEstado(idEstado: bigint): Observable<Estado> {

    return this.httpClient.get<Estado>(this.apiURL.concat(idEstado.toString()));

  }

}
