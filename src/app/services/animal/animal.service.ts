import { AnimalImagem } from './../../model/animal/animalImagem.model';
import { Animal } from './../../model/animal/animal.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
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

    return this.httpClient.get<Animal[]>(this.apiURL + "nome/" + idDoador + "/" + animalNome);

  }

  procaraAnimalPorId(idAnimal: bigint): Observable<Animal> {

    return this.httpClient.get<Animal>(this.apiURL + "id/" + idAnimal);

  }

  cadastrarAnimalAdocao(animal: Animal): Observable<Animal> {

    return this.httpClient.post<Animal>(this.apiURL + "cadastrar/", animal);

  }

  cadastrarAnimalAdocaoImagem(animal: Animal, imagem: File): Observable<HttpEvent<AnimalImagem>> {
    let formData: FormData = new FormData();
    // Adiciona o arquivo mais a id do anmal a requisicao Http
    formData.append("animal", animal.id_animal.toString());
    formData.append("imagem", imagem);
    console.log(animal);
    let httpRequest = new HttpRequest('POST', this.apiURL + 'imagem/cadastrar/', formData);

    return this.httpClient.request<AnimalImagem>(httpRequest);

  }

}
