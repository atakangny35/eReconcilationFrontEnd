import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyAccount } from '../models/currencyAccount';
import { listDataResponseModel } from '../models/responseModel';
/*
const httpOptions ={
  headers:new HttpHeaders({
    'Authorization':"Bearer "+localStorage.getItem('token')
  })
}
*/
@Injectable({
  providedIn: 'root'
})
export class CurrencyAccountService {
 
  constructor(private http: HttpClient,@Inject('url') private url:string) { }
 // 

GetList(companyId:number):Observable<listDataResponseModel<CurrencyAccount>>{
  return this.http.get<listDataResponseModel<CurrencyAccount>>(this.url+"currencyaccount"+"/getList"+"?companyid="+companyId);
}





}



