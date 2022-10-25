import { Observable } from 'rxjs';
import { Solicitacao } from './../../model/solicitacao/solicitacao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  private apiURL = "http://localhost:8080/solicitacao/";

  constructor(private httpClient: HttpClient) { }

  listaUltimasSolicitacoes(id_animal: bigint): Observable<Solicitacao[]> {
    return this.httpClient.post<Solicitacao[]>(this.apiURL + "adotante/limite/" + id_animal, {});
  }

}
