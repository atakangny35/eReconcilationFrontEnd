import { Component, OnInit } from '@angular/core';
import { CurrencyAccount } from 'src/app/models/currencyAccount';
import { CurrencyAccountService } from 'src/app/services/currency-account.service';

@Component({
  selector: 'app-currency-account',
  templateUrl: './currency-account.component.html',
  styleUrls: ['./currency-account.component.scss']
})
export class CurrencyAccountComponent implements OnInit {
 public currencyAcouuntList:CurrencyAccount[];
  constructor(private currenyaccountService:CurrencyAccountService) { }

  ngOnInit(): void {
    this.getlist(9);
  }

  getlist(companyId:number){
    this.currenyaccountService.GetList(companyId).subscribe(next=>{this.currencyAcouuntList=next.data;console.log(next)});
    
  }
}
