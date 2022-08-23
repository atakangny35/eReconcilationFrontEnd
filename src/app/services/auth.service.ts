import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { registerModel } from '../models/registerModel';
import { singleDataResponseModel } from '../models/responseModel';
import { tokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string="";
  tokenStaroge:string="token";
  constructor(private http:HttpClient) { }
  url:string='https://localhost:44319/api/';
login(loginmodel:LoginModel)
{
  return this.http.post<tokenModel>(this.url+'auth/login',loginmodel);
}
register(registermodel:registerModel)
{
  return this.http.post(this.url+'auth',registermodel);
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
 
}
