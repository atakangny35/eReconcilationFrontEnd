import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyForList } from '../models/Company';
import { Company } from '../models/registerModel';
import { listDataResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(@Inject('url') private url:string,private http:HttpClient) { }

  GetCompanyList():Observable<listDataResponseModel<CompanyForList>>{
    return this.http.get<listDataResponseModel<CompanyForList>>(this.url+"company");
  }
}
