import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilterProyect'
})
export class TableFilterProyectPipe implements PipeTransform {

  transform(list: any[], value: string) {
    return value ? list.filter(item => item.name.toLowerCase().includes(value) ) : list;
  }

}