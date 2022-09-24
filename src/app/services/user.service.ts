import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listDataResponseModel, ResponseModel } from '../models/responseModel';
import { UserCompanyListDto } from '../models/UserCompanyListDto';
import { UserAddModel } from '../models/UsueAddModal';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor( @Inject('url') private url:string,
  private http:HttpClient) { }

  GetUserList(companyId:number):Observable<listDataResponseModel<UserCompanyListDto>>{
    return this.http.get<listDataResponseModel<UserCompanyListDto>>(this.url+"user/"+"?companyId="+companyId);
  }
  Add(user:UserAddModel):Observable<ResponseModel>{
      return this.http.post<ResponseModel>(this.url+"auth/RegisterAccount",user);
  }
}
