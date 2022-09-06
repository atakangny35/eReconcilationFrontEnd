import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { CurrencyAccount } from 'src/app/models/currencyAccount';
import { CurrencyAccountService } from 'src/app/services/currency-account.service';

@Component({
  selector: 'app-currency-account',
  templateUrl: './currency-account.component.html',
  styleUrls: ['./currency-account.component.scss']
})
export class CurrencyAccountComponent implements OnInit {
 public currencyAcouuntList:CurrencyAccount[];
 decodedToken:any;
 companyId:any;
 tokenStorege :string="token";
 JwtHelper =new JwtHelperService();
 ShowList:boolean;
  constructor(private currenyaccountService:CurrencyAccountService,private ToastrService:ToastrService) { }

  ngOnInit(): void {
    this.getDecodedToken();
    this.getlist(this.companyId);
  }

  getlist(companyId:number){
    this.currenyaccountService.GetList(companyId).subscribe(next=>{this.currencyAcouuntList=next.data;
      if(next.data.length==0)
      { 
        this.ShowList=false;
      }
      else{
        
        this.ShowList=true;
      }
    
    },err=>{
        this.ToastrService.error(err.error,'Error!');      
    });
    
  }
  getDecodedToken(){
    let token=localStorage.getItem(this.tokenStorege);
    this.decodedToken=this.JwtHelper.decodeToken(token);
    //console.log(this.decodedToken);
    let name =Object.keys(this.decodedToken).filter(x=>x.endsWith("/anonymous"))[0];
   this.companyId=this.decodedToken[name];
    //
    //console.log(this.companyId);
  }
}
