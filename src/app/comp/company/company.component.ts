import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {  CompanyForList } from 'src/app/models/Company';
import { userOperationClaim } from 'src/app/models/operationClaim';
import { Company } from 'src/app/models/registerModel';
import { CompanyService } from 'src/app/services/company.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  operationCrud:boolean=false;
  useroperationClaimList: userOperationClaim[]=[];
  CompanyList: CompanyForList[]=[];
  decodedToken:any;
  userid:number;
  companyId:any;
  tokenStorege :string="token";
  JwtHelper =new JwtHelperService();
  ShowList:boolean;
  searchvalue:string="";
  status:boolean=true;
  statusAll:boolean=true;
  file:string;
  constructor(private ToastrService:ToastrService,private spinner: NgxSpinnerService,private useroperationclaimservice:UserOperationClaimService,private companyService:CompanyService) { }

  ngOnInit(): void {
    this.getDecodedToken();
    this.GetUserOperationList();
    this.getlist();
  }
  exportExcel(){
    let element=document.getElementById('excel-table');
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook= XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb,'cariliste.xlsx');

  }
  changecheckbox(){
    this.status=false;
    this.getlist();
 }
  getlist(){
    
    this.spinner.show();
    
    this.companyService.GetCompanyList().subscribe(next=>{
      this.CompanyList=next.data;
        console.log(this.CompanyList);
       this.spinner.hide();
      if(next.data.length==0)
      { 
        this.ShowList=false;
      }
      else{
        
        this.ShowList=true;
        if(!this.statusAll)
        { 
          this.CompanyList=  this.CompanyList.filter(x=>x.isActive==this.status);
          
        }
       
      }
    
    },err=>{
        this.ToastrService.error('Service Can not accesible,Please try again Later','Error!'); 
        this.spinner.hide();     
    });
    
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
        else if(claim.operationClaimName=="Company.crud"){
          this.operationCrud=true
        }
       
    });
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
  changeSpanClass(value:boolean){
    //console.log(value);
    return value==true ? "badge badge-sm bg-gradient-success" : "badge badge-sm bg-gradient-danger";
  }
  GetCompany(id:number){

  }
  ChangeStatus(context:CompanyForList){

  }
  delete(id:number){

  }
}
