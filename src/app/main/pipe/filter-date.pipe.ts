import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilterDate'
})
export class TableFilterDatePipe implements PipeTransform {

  transform(list: any[], value: string) {
    
    return value ? list.filter(item => this.transformDate(item.date) == value ) : list;
  }

  transformDate(fechaOriginal: string){
    const fecha: Date = new Date(fechaOriginal);

        // Obtener las partes de la fecha que necesitas
        const año: number = fecha.getFullYear();
        const mes: number = fecha.getMonth() + 1; // Los meses van de 0 a 11, por lo que necesitas sumar 1
        const dia: number = fecha.getDate();

        // Formatear la fecha en el formato deseado (YYYY-MM-DD)
        const fechaFormateada: string = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
        return fechaFormateada;
  }


}