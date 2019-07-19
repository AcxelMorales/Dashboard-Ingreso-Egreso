import { Pipe, PipeTransform } from '@angular/core';

import { EgresoIngreso } from './EgresoIngreso.model';

@Pipe({
  name: 'ordenEI'
})
export class EgresoIngresoPipe implements PipeTransform {

  transform(items: EgresoIngreso[]): EgresoIngreso[] {
    return items.sort((a) => {
      if (a.tipo === 'Ingreso') return -1;
      else return 1; 
    });
  }

}
