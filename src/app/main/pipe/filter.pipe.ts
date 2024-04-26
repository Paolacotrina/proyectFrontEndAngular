import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilterKeyword'
})
export class TableFilterKeywordPipe implements PipeTransform {

  transform(list: any[], value: string) {
    return value ? list.filter(item => item.proyectName.toLowerCase().includes(value) ) : list;
  }

}