import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userOperationClaim } from '../models/operationClaim';
import { listDataResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  constructor(    
    @Inject('url') private url:string,
    private http:HttpClient
  
  ) { }

  GetList(userid:number,companyId:number):Observable<listDataResponseModel<userOperationClaim>>{
    return this.http.get<listDataResponseModel<userOperationClaim>>(this.url+"useroperationclaim"+"/getlistdto"+"?userid="+userid+"&companyid="+companyId);
  }
}
