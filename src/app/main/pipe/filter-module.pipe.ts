import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilterModule'
})
export class TableFilterModulePipe implements PipeTransform {

  transform(list: any[], value: number) {
    return value ? list.filter(item => item.module[0].id == value ) : list;
  }

}