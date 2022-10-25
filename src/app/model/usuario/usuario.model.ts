import { Cidade } from '../cidade/cidade.model';
import { Estado } from '../estado/estado.model';

export interface Usuario {

    id_usuario: bigint;
    nome: String;
    documento: String;
    telefone: String;
    genero: String;
    usuario: String;
    senha: String;
    cidade: Cidade;
    estado: Estado;

}
