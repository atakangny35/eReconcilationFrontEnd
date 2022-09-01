import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  decodedToken:any;
  tokenStorege :string="token";
  JwtHelper =new JwtHelperService();
  constructor() { }

  ngOnInit(): void {
    this.getDecodedToken();
  }



  getDecodedToken(){
    let token=localStorage.getItem(this.tokenStorege);
    this.decodedToken=this.JwtHelper.decodeToken(token);
    //console.log('test2');
    //console.log(this.decodedToken);
  }

}
