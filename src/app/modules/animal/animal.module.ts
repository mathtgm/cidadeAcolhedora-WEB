import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimaisAdocaoComponent } from 'src/app/view/animais-adocao/animais-adocao.component';
import { TabelaAnimalAdocaoComponent } from 'src/app/components/tabela-animal-adocao/tabela-animal-adocao.component';
import { TabelaAnimalAdocaoUsuarioComponent } from 'src/app/components/tabela-animal-adocao-usuario/tabela-animal-adocao-usuario.component';
import { FormAnimalAdocaoComponent } from 'src/app/view/form-animal-adocao/form-animal-adocao.component';
import { AnimalAdocaoInfoComponent } from 'src/app/view/animal-adocao-info/animal-adocao-info.component';
import { ListaAnimaisAdotadosComponent } from 'src/app/view/lista-animais-adotados/lista-animais-adotados.component';
import { ListaAnimalAdocaoComponent } from 'src/app/view/lista-animal-adocao/lista-animal-adocao.component';
import { FormAnimalComponent } from 'src/app/view/form-animal/form-animal.component';
import { CardAnimalAdocaoComponent } from 'src/app/components/card-animal-adocao/card-animal-adocao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentModule } from '../shared-component/shared-component.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AnimaisAdocaoComponent,
    TabelaAnimalAdocaoComponent,
    TabelaAnimalAdocaoUsuarioComponent,
    FormAnimalAdocaoComponent,
    AnimalAdocaoInfoComponent,
    ListaAnimaisAdotadosComponent,
    ListaAnimalAdocaoComponent,
    FormAnimalComponent,
    CardAnimalAdocaoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModule,
    RouterModule
  ],
  exports: [
    AnimaisAdocaoComponent,
    TabelaAnimalAdocaoComponent,
    TabelaAnimalAdocaoUsuarioComponent,
    FormAnimalAdocaoComponent,
    AnimalAdocaoInfoComponent,
    ListaAnimaisAdotadosComponent,
    ListaAnimalAdocaoComponent,
    FormAnimalComponent,
    CardAnimalAdocaoComponent
  ],
})
export class AnimalModule { }
