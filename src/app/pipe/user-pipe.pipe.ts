import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPipe'
})
export class UserPipePipe implements PipeTransform {

  transform(value: any[], searcString:string) {
    if(!searcString){
     
     return value;
    }
    return value.filter(x=>{
     const name= x.name.toLowerCase().includes(searcString.toLowerCase());
     const email= x.email.toLowerCase().includes(searcString.toLowerCase());
     return (name+email);
    })
   }

}
