import { NgModule } from '@angular/core';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavbarPainelComponent } from 'src/app/components/navbar-painel/navbar-painel.component';
import { MsgAlertaComponent } from 'src/app/components/msg-alerta/msg-alerta.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ConversorDataPipe } from 'src/app/components/pipe/conversordata/conversor-data.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NavbarPainelComponent,
    MsgAlertaComponent,
    ConversorDataPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    NavbarPainelComponent,
    MsgAlertaComponent,
    ConversorDataPipe
  ]
})
export class SharedComponentModule { }
