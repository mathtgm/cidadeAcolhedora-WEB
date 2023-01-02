import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { SharedComponentModule } from './modules/shared-component/shared-component.module';
import { AnimalModule } from './modules/animal/animal.module';
import { FormPerfilComponent } from './view/form-perfil/form-perfil.component';
import { FormUsuarioCadastroComponent } from './view/form-usuario-cadastro/form-usuario-cadastro.component';
import { PainelComponent } from './view/painel/painel.component';
import { LoginComponent } from './view/login/login.component';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PainelComponent,
    FormUsuarioCadastroComponent,
    FormPerfilComponent
  ],
  imports: [
    BrowserModule,
    SharedComponentModule,
    AnimalModule,
    FormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
