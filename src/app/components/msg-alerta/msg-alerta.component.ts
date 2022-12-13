import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-msg-alerta',
  templateUrl: './msg-alerta.component.html',
  styleUrls: ['./msg-alerta.component.css']
})
export class MsgAlertaComponent {

  @Input() msgAlerta?: String;
  @Input() status: boolean = false;
}
