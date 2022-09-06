import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { registerModel } from '../models/registerModel';
import { ResponseModel, singleDataResponseModel } from '../models/responseModel';
import { Terms } from '../models/terms';
import { tokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string="";
  tokenStaroge:string="token";
  constructor(private http:HttpClient,@Inject('url') private url:string) {
    
   }
  //url:string='https://localhost:44319/api/';
login(loginmodel:LoginModel)
{
  return this.http.post<tokenModel>(this.url+'auth/login',loginmodel);
}
LogOut(){
  localStorage.removeItem(this.tokenStaroge);
}
register(registermodel:registerModel)
{
  return this.http.post(this.url+'auth',registermodel);
}
getTerms(){
  return this.http.get<singleDataResponseModel<Terms>>(this.url+'RegisterTerms');
}
isAuth(){
  /*
  if(localStorage.getItem(this.tokenStaroge)){
    return true;
  }
  return false;
  */
  return localStorage.getItem(this.tokenStaroge) ?true:false;
}
 
SendConfirmEmail(confirm:string){
  //console.log(confirm);
  //let api='https://localhost:44319/api/auth/sendConfirmMail';
  //return this.http.post(,confirm);
  return this.http.post<ResponseModel>(this.url+'auth/sendconfirmmail?emaillll='+confirm,this.tokenStaroge);
}

}
