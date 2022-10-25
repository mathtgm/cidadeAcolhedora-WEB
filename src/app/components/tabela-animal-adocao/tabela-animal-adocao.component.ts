import { Solicitacao } from './../../model/solicitacao/solicitacao.model';
import { SolicitacaoService } from './../../services/solicitacao/solicitacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabela-animal-adocao',
  templateUrl: './tabela-animal-adocao.component.html',
  styleUrls: ['./tabela-animal-adocao.component.css']
})
export class TabelaAnimalAdocaoComponent implements OnInit {

  limite: boolean = true;
  listaAdotante: boolean = true;
  idAdotante: bigint = JSON.parse(localStorage.getItem("userInfo")!).id_usuario;
  idAnimal: bigint = 0n;
  listSolicitacao: Solicitacao[] = [];

  constructor(private solicitacaoService: SolicitacaoService) {
    if(this.limite) {
      if(this.listaAdotante) {
        this.listaLimiteSolicitacaoAdotante();
      }
    }
  }

  ngOnInit(): void {
  }

  listaLimiteSolicitacaoAdotante() {
    this.solicitacaoService.listaUltimasSolicitacoes(this.idAdotante).subscribe((result) => {
      this.listSolicitacao = result;
    })
  }

}
