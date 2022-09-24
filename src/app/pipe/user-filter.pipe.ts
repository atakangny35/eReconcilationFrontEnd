import { Pipe, PipeTransform } from '@angular/core';
import { UserCompanyListDto } from '../models/UserCompanyListDto';

@Pipe({
  name: 'userFilterPipe'
})
export class UserFilterPipe implements PipeTransform {

  transform(value: UserCompanyListDto[], filterText:string):UserCompanyListDto[] {
      return filterText?value.filter(p=>p.userIsActive.toString().toLowerCase().indexOf(filterText)!==-1):value;
   }


}
