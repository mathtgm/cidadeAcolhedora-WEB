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
  idImagem: String[];

}
