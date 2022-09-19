import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { userOperationClaim } from 'src/app/models/operationClaim';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  operationCrud:boolean=false;
  tokenStorege :string="token";
  useroperationClaimList: userOperationClaim[]=[];
  decodedToken:any;
  userid:number;
  ShowList:boolean;
  searchvalue:string="";
  companyId:any;
  status:boolean=true;
  statusAll:boolean=false;
  JwtHelper =new JwtHelperService();
  constructor(private spinner :NgxSpinnerService, private useroperationclaimservice:UserOperationClaimService,private ToastrService:ToastrService) { }

  ngOnInit(): void {
    this.getDecodedToken();
    this.GetUserOperationList();
    //this.getlist(this.companyId);
  }
  exportExcel(){
    let element=document.getElementById('excel-table');
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook= XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb,'cariliste.xlsx');

  }

  getDecodedToken(){
    let token=localStorage.getItem(this.tokenStorege);
    this.decodedToken=this.JwtHelper.decodeToken(token);
    this.userid=this.decodedToken.nameid;
    //console.log(this.decodedToken.nameid);
    let name =Object.keys(this.decodedToken).filter(x=>x.endsWith("/anonymous"))[0];
   this.companyId=this.decodedToken[name];


 
    //console.log(this.companyId);
  }
  GetUserOperationList(){
     
    this.spinner.show();
    this.useroperationclaimservice.GetList(this.userid,this.companyId).subscribe(next=>{
        this.useroperationClaimList=next.data;
        this.SetPageAuthorize();
       this.spinner.hide();    
    
    },err=>{
        this.ToastrService.error('Service Can not accesible,Please try again Later','Error!'); 
        this.spinner.hide();     
    });
  }
  SetPageAuthorize(){
    this.useroperationClaimList.forEach(claim => {
        if(claim.operationClaimName=='Admin'){

          this.operationCrud=true;
        }
        else if(claim.operationClaimName=="CurrencyAccount.crud"){
          this.operationCrud=true
        }
        else{
          this.operationCrud=false;
        }
    });
  }
  getlist(userid:number){
    
    //this.spinner.show();
    /*
    this.useroperationclaimservice.GetList(companyId).subscribe(next=>{this.currencyAcouuntList=next.data;
       // console.log(next.data);
       this.spinner.hide();
      if(next.data.length==0)
      { 
        this.ShowList=false;
      }
      else{
        
        this.ShowList=true;
        if(!this.statusAll)
        { 
          this.currencyAcouuntList=  this.currencyAcouuntList.filter(x=>x.isActive==this.status);
          
        }
       
      }
    
    },err=>{
        this.ToastrService.error('Service Can not accesible,Please try again Later','Error!'); 
        this.spinner.hide();     
    });
    */
    
  }
  changecheckbox(){
    this.status=false;
    this.getlist(this.userid);
 }
}
