import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { CurrencyAccount } from 'src/app/models/currencyAccount';
import { CurrencyAccountService } from 'src/app/services/currency-account.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-currency-account',
  templateUrl: './currency-account.component.html',
  styleUrls: ['./currency-account.component.scss']
})
export class CurrencyAccountComponent implements OnInit {
  currencyAcouuntList:CurrencyAccount[]=[];
 decodedToken:any;
 companyId:any;
 tokenStorege :string="token";
 JwtHelper =new JwtHelperService();
 ShowList:boolean;
 searchvalue:string="";
  constructor(private currenyaccountService:CurrencyAccountService,private ToastrService:ToastrService) { }

  ngOnInit(): void {
    this.getDecodedToken();
    this.getlist(this.companyId);
    console.log(this.currencyAcouuntList);
  }

  getlist(companyId:number){
    this.currenyaccountService.GetList(companyId).subscribe(next=>{this.currencyAcouuntList=next.data;
        console.log(next.data);
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
  changeSpanClass(value:boolean){
    //console.log(value);
    return value==true ? "badge badge-sm bg-gradient-success" : "badge badge-sm bg-gradient-danger";
  }
  search()
  {
    return this.searchvalue;

  }
  exportExcel(){
    let element=document.getElementById('excel-table');
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook= XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb,'cariliste.xlsx');

  }
}
