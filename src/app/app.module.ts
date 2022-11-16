import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

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
    FormAnimalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
