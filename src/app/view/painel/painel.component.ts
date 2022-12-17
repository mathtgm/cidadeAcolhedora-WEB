import { AnimalService } from './../../services/animal/animal.service';
import { SolicitacaoService } from './../../services/solicitacao/solicitacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  qtdSolicitacao: number = 0;
  qtdAnimaisAdotados: number = 0;
  qtdAnimaisAdocao: number = 0;

  constructor(private solicitacaoService: SolicitacaoService, private animalService: AnimalService) { }

  ngOnInit(): void {
    this.quantidadeDeSolicitacoes();
    this.quantidadeDeAnimaisAdotados();
    this.quantidadeDeAnimaisAdocao();
  }

  quantidadeDeSolicitacoes(): void {
    this.solicitacaoService.listaSolicitacoesAdotante(JSON.parse(localStorage.getItem("userInfo")!).id_usuario).subscribe({
      next: result => this.qtdSolicitacao = result.length
    });
  }

  quantidadeDeAnimaisAdotados(): void {
    this.animalService.procuraAnimalPorTutor(JSON.parse(localStorage.getItem("userInfo")!).id_usuario).subscribe({
      next: result => this.qtdAnimaisAdotados = result.length
    });
  }

  quantidadeDeAnimaisAdocao(): void {
    this.animalService.procuraAnimalPorDoador(JSON.parse(localStorage.getItem("userInfo")!).id_usuario).subscribe({
      next: result => this.qtdAnimaisAdocao = result.filter(animal => animal.idTutor !== undefined).length
    });
  }

}
