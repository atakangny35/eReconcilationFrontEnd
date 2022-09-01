import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenModel } from 'src/app/models/tokenModel';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 textstyle="";
 tokenStorege :string="token";
 JwtHelper =new JwtHelperService();
 decodedToken:any;
  constructor() { }

  ngOnInit(): void {
    this.getDecodedToken();
  } 
changeClass(text:string){
 return "fixed-plugin ps "+text;
}

getDecodedToken(){
  let token=localStorage.getItem(this.tokenStorege);
  this.decodedToken=this.JwtHelper.decodeToken(token);
  //console.log('test2');
  //console.log(this.decodedToken);
}

}
