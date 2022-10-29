import { AnimaisAdocaoComponent } from './view/animais-adocao/animais-adocao.component';
import { PainelComponent } from './view/painel/painel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
