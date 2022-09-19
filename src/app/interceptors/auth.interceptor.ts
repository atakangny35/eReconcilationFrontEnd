import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  decodedToken:any;
  tokenStorege :string="token";
  JwtHelper =new JwtHelperService();
  constructor(private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token =localStorage.getItem('token');

    if(token!=null)
    {
      if(this.JwtHelper.isTokenExpired(token)  )
      { 
        this.router.navigate([""]);
      }
    }

    let newRequest: HttpRequest<any>;
    /*
    newRequest=request.clone({
      headers:new HttpHeaders({
    'Authorization':"Bearer "+localStorage.getItem('token')
  })
    });
*/
 
    newRequest=request.clone({
    headers: request.headers.set('Authorization','Bearer '+token)
  });
   
    return next.handle(newRequest);
  }
}
