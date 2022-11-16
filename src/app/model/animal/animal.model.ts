import { AnimalImagem } from './animalImagem.model';
import { Usuario } from './../usuario/usuario.model';
import { Estado } from './../estado/estado.model';
import { Cidade } from './../cidade/cidade.model';
export interface Animal {

  id_animal: bigint;
  nome: String;
  tipo: String;
  cor: String;
  idCidade: Cidade;
  idEstado: Estado;
  idTutor: Usuario;
  idDoador: Usuario;
  uploadImagem: File[];
  imagem: AnimalImagem[];
  sexo: String;
  idade: number;
  nivelCarinho: number;
  nivelSociavel: number;
  nivelBrincalhao: number;
  descricao: String;
}
