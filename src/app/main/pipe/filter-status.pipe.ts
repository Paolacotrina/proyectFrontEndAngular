import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilterStatus'
})
export class TableFilterStagePipe implements PipeTransform {

  transform(list: any[], value: number) {
    return value ? list.filter(item => item.state[0].id == value ) : list;
  }

}