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

  listaSolicitacoesAdotante(id_adotante: bigint): Observable<Solicitacao[]> {
    return this.httpClient.get<Solicitacao[]>(this.apiURL + "adotante/" + id_adotante, {});
  }

  consultaSolicitacaoPorId(id_solicitacao: BigInt): Observable<Solicitacao> {
    return this.httpClient.get<Solicitacao>(this.apiURL.concat(id_solicitacao.toString()));
  }

  cadastrarSolicitacao(solicitacao: Solicitacao): Observable<Solicitacao> {
    return this.httpClient.post<Solicitacao>(this.apiURL + 'cadastrar', solicitacao);
  }

}
