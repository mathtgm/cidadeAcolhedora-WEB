import { Animal } from "../animal/animal.model";
import { Usuario } from "../usuario/usuario.model";

export interface Solicitacao {

  id_solicitacao: bigint;
  id_animal: Animal;
  id_adotante: Usuario;
  descricao: String;
  situacao: String;
  data_solicitacao: number[];

}
