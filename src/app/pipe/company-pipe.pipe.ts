import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyPipe'
})
export class CompanyPipePipe implements PipeTransform {

  transform(value: any[], searcString:string) {
    if(!searcString){
     
     return value;
    }
    return value.filter(x=>{
     //const code=x.code.toLowerCase().toString().includes(searcString.toLowerCase());
    // const code= x.code.toLowerCase()==searcString.toLowerCase();
     const name= x.name.toLowerCase().includes(searcString.toLowerCase());
    //const name= x.name.toLowerCase()==searcString.toLowerCase();
     const address= x.address.toLowerCase().includes(searcString.toLowerCase());
     //const taxIdNumber= x.taxIdNumber.toLowerCase().includes(searcString.toLowerCase());
     //const taxDepartment= x.taxDepartment.toLowerCase().includes(searcString.toLowerCase());
     //const email= x.email.toLowerCase().includes(searcString.toLowerCase());
     return (name+address);
    })
   }
 

}
