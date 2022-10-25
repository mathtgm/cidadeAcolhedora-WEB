import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversorData'
})
export class ConversorDataPipe implements PipeTransform {

  transform(value: number[]): string {

    let ano: String = value[0].toString();
    let mes: String = value[1].toString();
    let dia: String = value[2].toString();
    let hora: String = value[3].toString();
    let min: String = value[4].toString();

    return dia + '/' + mes + '/' + ano + ' ' + hora + ':' + min;
  }

}
