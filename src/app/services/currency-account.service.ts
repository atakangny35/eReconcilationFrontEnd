import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyAccount } from '../models/currencyAccount';
import { listDataResponseModel, ResponseModel, singleDataResponseModel } from '../models/responseModel';
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
GetById(Id:number):Observable<singleDataResponseModel<CurrencyAccount>>{
  return this.http.get<singleDataResponseModel<CurrencyAccount>>(this.url+"currencyaccount"+"/getbyid"+"?id="+Id);
}

delete(id:number):Observable<ResponseModel>
{
  return this.http.delete<ResponseModel>(this.url+"currencyaccount"+"/delete?id="+id);
}

update(currencyAccount:CurrencyAccount):Observable<ResponseModel>
{
  return this.http.put<ResponseModel>(this.url+"currencyaccount"+"/update",currencyAccount);
}
Add(currencyAccount:CurrencyAccount):Observable<ResponseModel>
{
  return this.http.post<ResponseModel>(this.url+"currencyaccount"+"/add",currencyAccount);
}
AddFromExcel(file:any,companyId:number):Observable<ResponseModel>
{
  const formData=new FormData;
  formData.append("file",file,file.name)
  console.log(this.url+"currencyaccount"+"/addFromExcel"+"?companyid="+companyId);
  return this.http.post<ResponseModel>(this.url+"currencyaccount"+"/addFromExcel"+"?companyid="+companyId,formData);
}
}



