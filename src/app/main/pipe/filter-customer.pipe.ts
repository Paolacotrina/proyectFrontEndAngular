import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilterCustomer'
})
export class TableFilterCustomerPipe implements PipeTransform {

  transform(list: any[], value: string) {
    return value ? list.filter(item => item.customer[0].email == value ) : list;
  }

} 