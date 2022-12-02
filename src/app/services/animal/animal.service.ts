import { AnimalImagem } from './../../model/animal/animalImagem.model';
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

    return this.httpClient.get<Animal[]>(this.apiURL + "nome/" + idDoador + "/" + animalNome);

  }

  procaraAnimalPorId(idAnimal: bigint): Observable<Animal> {

    return this.httpClient.get<Animal>(this.apiURL + "id/" + idAnimal);

  }

  cadastrarAnimalAdocao(animal: Animal): Observable<Animal> {

    return this.httpClient.post<Animal>(this.apiURL + "cadastrar/", animal);

  }

  excluirAnimalAdocao(id_animal: bigint): Observable<Animal> {

    return this.httpClient.delete<Animal>(this.apiURL + "remover/" + id_animal);

  }

  atualizarAnimalAdocao(animal: Animal): Observable<Animal> {

    return this.httpClient.put<Animal>(this.apiURL + "atualizar/", animal)

  }

  cadastrarAnimalAdocaoImagem(animal: Animal, imagem: File): Observable<any> {
    let formData: FormData = new FormData();
    // Adiciona o arquivo mais a id do animal a requisicao Http
    formData.append("animal", animal.id_animal.toString());
    formData.append("imagem", imagem);

    return this.httpClient.post(this.apiURL + 'imagem/cadastrar/', formData);

  }

  procurarAnimalAdocaoImagem(nome_imagem: String): Observable<any> {

    return this.httpClient.get(this.apiURL + 'imagem/' + nome_imagem);

  }

  removerAnimalImagem(imagem: AnimalImagem): Observable<Object> {

    return this.httpClient.delete(this.apiURL + 'imagem/remover/', {body: imagem});

  }

  listaAnimaisAdocao(): Observable<Animal[]> {

    return this.httpClient.get<Animal[]>(this.apiURL.concat("todos"));

  }

}
