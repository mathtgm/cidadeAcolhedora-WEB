import { Animal } from './../../model/animal/animal.model';
import { Observable } from 'rxjs';
import { Solicitacao } from './../../model/solicitacao/solicitacao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private apiURL = "http://localhost:8080/animal/";

  constructor(private httpClient: HttpClient) { }

  procuraAnimalPorDoador(idDoador: bigint): Observable<Animal[]> {

    return this.httpClient.get<Animal[]>(this.apiURL + 'doador/' + idDoador, {});

  }

  procuraAnimalPorTutor(idTutor: bigint): Observable<Animal[]> {

    return this.httpClient.get<Animal[]>(this.apiURL + 'tutor/' + idTutor, {});

  }

}
