import { Observable } from 'rxjs';
import { Cidade } from './../../model/cidade/cidade.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private httpClient: HttpClient) { }

  apiURL: String = 'http://localhost:8080/cidade/';

  getCidade(id_cidade: bigint): Observable<Cidade> {
    return this.httpClient.get<Cidade>(this.apiURL + id_cidade.toString(), {});
  }

  listarCidades(): Observable<Cidade[]> {

    return this.httpClient.get<Cidade[]>(this.apiURL.toString());

  }

  listarCidadesEstados(id_estado: bigint): Observable<Cidade[]> {

    return this.httpClient.get<Cidade[]>(this.apiURL + 'estado/' + id_estado);

  }
}
