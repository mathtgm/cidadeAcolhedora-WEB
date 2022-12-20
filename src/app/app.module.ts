import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './view/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './view/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { PainelComponent } from './view/painel/painel.component';
import { NavbarPainelComponent } from './components/navbar-painel/navbar-painel.component';
import { TabelaAnimalAdocaoComponent } from './components/tabela-animal-adocao/tabela-animal-adocao.component';
import { ConversorDataPipe } from './components/pipe/conversordata/conversor-data.pipe';
import { AnimaisAdocaoComponent } from './view/animais-adocao/animais-adocao.component';
import { TabelaAnimalAdocaoUsuarioComponent } from './components/tabela-animal-adocao-usuario/tabela-animal-adocao-usuario.component';
import { FormAnimalComponent } from './view/form-animal/form-animal.component';
import { CardAnimalAdocaoComponent } from './components/card-animal-adocao/card-animal-adocao.component';
import { ListaAnimalAdocaoComponent } from './view/lista-animal-adocao/lista-animal-adocao.component';
import { AnimalAdocaoInfoComponent } from './view/animal-adocao-info/animal-adocao-info.component';
import { FormAnimalAdocaoComponent } from './view/form-animal-adocao/form-animal-adocao.component';
import { MsgAlertaComponent } from './components/msg-alerta/msg-alerta.component';
import { FormPerfilComponent } from './view/form-perfil/form-perfil.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    PainelComponent,
    NavbarPainelComponent,
    TabelaAnimalAdocaoComponent,
    ConversorDataPipe,
    AnimaisAdocaoComponent,
    TabelaAnimalAdocaoUsuarioComponent,
    FormAnimalComponent,
    CardAnimalAdocaoComponent,
    ListaAnimalAdocaoComponent,
    AnimalAdocaoInfoComponent,
    FormAnimalAdocaoComponent,
    MsgAlertaComponent,
    FormPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
