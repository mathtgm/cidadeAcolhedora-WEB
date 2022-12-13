import { AnimalAdocaoInfoComponent } from './view/animal-adocao-info/animal-adocao-info.component';
import { ListaAnimalAdocaoComponent } from './view/lista-animal-adocao/lista-animal-adocao.component';
import { FormAnimalComponent } from './view/form-animal/form-animal.component';
import { AnimaisAdocaoComponent } from './view/animais-adocao/animais-adocao.component';
import { PainelComponent } from './view/painel/painel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { FormAnimalAdocaoComponent } from './view/form-animal-adocao/form-animal-adocao.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuario/painel',
    component: PainelComponent
  },
  {
    path: 'usuario/painel/adocao',
    component: AnimaisAdocaoComponent
  },
  {
    path: 'usuario/painel/adocao/animal/:id',
    component: FormAnimalComponent
  },
  {
    path: 'usuario/painel/adocao/cadastro/animal',
    component: FormAnimalComponent
  },
  {
    path: 'animal/adocao',
    component: ListaAnimalAdocaoComponent,
  },
  {
    path: 'animal/adocao/:id',
    component: AnimalAdocaoInfoComponent
  },
  {
    path: 'animal/adocao/formulario/:id',
    component: FormAnimalAdocaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
