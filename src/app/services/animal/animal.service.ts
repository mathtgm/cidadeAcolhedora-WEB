import { Animal } from './../../model/animal/animal.model';
import { Observable } from 'rxjs';
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

  procurarAnimalPorDoadorNome(idDoador: bigint, animalNome: String): Observable<Animal[]> {

    return this.httpClient.get<Animal[]>(this.apiURL + "nome/" + idDoador + "/" + animalNome, {});

  }

}
