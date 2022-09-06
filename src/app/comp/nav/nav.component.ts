import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  decodedToken:any;
  companyName:any;
  tokenStorege :string="token";
  JwtHelper =new JwtHelperService();
  constructor() { }

  ngOnInit(): void {
    this.getDecodedToken();
  }



  getDecodedToken(){
    let token=localStorage.getItem(this.tokenStorege);
    this.decodedToken=this.JwtHelper.decodeToken(token);
    let name =Object.keys(this.decodedToken).filter(x=>x.endsWith("/country"))[0];
   this.companyName=this.decodedToken[name];
    //console.log(name);
    //console.log(this.decodedToken);
  }

}
