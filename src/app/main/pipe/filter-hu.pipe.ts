import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilterHu'
})
export class TableFilterHuPipe implements PipeTransform {

  transform(list: any[], value: string) {
    return value ? list.filter(item => item.description.toLowerCase().includes(value) ) : list;
  }

}