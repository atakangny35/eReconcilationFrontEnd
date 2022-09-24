import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CurrencyAccount } from 'src/app/models/currencyAccount';
import { userOperationClaim } from 'src/app/models/operationClaim';
import { CurrencyAccountService } from 'src/app/services/currency-account.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-currency-account',
  templateUrl: './currency-account.component.html',
  styleUrls: ['./currency-account.component.scss']
})
export class CurrencyAccountComponent implements OnInit {
  currencyAcouuntList:CurrencyAccount[]=[];
  useroperationClaimList: userOperationClaim[]=[];
  currencyAcouuntListAddModel:CurrencyAccount={
    code: '',
    name: '',
    address: '',
    taxDepartment: '',
    taxIdNumber: '',
    identityNumber: '',
    email: '',
    authorized: '',
    companyid: 0,
    Id: null,
    addedTime: undefined,
    isActive: null
  };

 operationCrud:boolean=false;
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
  constructor(private currenyaccountService:CurrencyAccountService,private ToastrService:ToastrService,private spinner: NgxSpinnerService,
              private useroperationclaimservice:UserOperationClaimService,private datePipe:DatePipe
    ) { }

  ngOnInit(): void {
    this.getDecodedToken();
    this.GetUserOperationList();
    this.getlist(this.companyId);
    
    //console.log(this.currencyAcouuntList);
  }

  getlist(companyId:number){
    
    this.spinner.show();
    this.currenyaccountService.GetList(companyId).subscribe(next=>{this.currencyAcouuntList=next.data;
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

  clear(){
    document.getElementsByClassName('modalForm')[0].ariaPlaceholder=null;

  }
  
  GetCurrencyAccount(id:number){
    this.spinner.show();
    this.currenyaccountService.GetById(id).subscribe(next=>{
      this.currencyAcouuntListAddModel=next.data;
    },err=>{
        this.ToastrService.error(err.error);
    })
    this.spinner.hide();
  }

  delete(id :number)
  {   
    this.spinner.show();
    this.currenyaccountService.delete(id).subscribe(next=>{
      
      if(next.success){
        this.getlist(this.companyId);
        this.spinner.hide();
      }
      this.spinner.hide();
    },err=>{
      this.ToastrService.error(err.error)
      this.spinner.hide();
    })
  }
  Add(Name:string,Address:string,Email :string,Authorized :string,Code:string,TaxDepartment:string,TaxIdNumber:string,form:any){
      console.log(form.controls);
    if(form.valid)
      {
        this.currencyAcouuntListAddModel.companyid=this.companyId;
        this.currencyAcouuntListAddModel.authorized=Authorized;
        this.currencyAcouuntListAddModel.name=Name;
        this.currencyAcouuntListAddModel.address=Address;
        this.currencyAcouuntListAddModel.email=Email;
        this.currencyAcouuntListAddModel.code=Code;
        this.currencyAcouuntListAddModel.taxDepartment=TaxDepartment;
        this.currencyAcouuntListAddModel.taxIdNumber=TaxIdNumber;
        this.currenyaccountService.Add(this.currencyAcouuntListAddModel).subscribe(next=>{
          console.log(next);
          if(next.success)
          {
          this.getlist(this.companyId);
          this.spinner.hide();
          this.ToastrService.success(next.message)
          }
        this.spinner.hide();}
          ,err=>
          {
            this.ToastrService.error(err.error)
            this.spinner.hide();

          })
      }
      else{
       
            this.ToastrService.warning('Please fill the required fields');
      
       }

  }
  Update(Name:string,Address:string,Email:string,Authorized:string,Code:string,TaxDepartment:string,TaxIdNumber:string){
    this.spinner.show();
    this.currencyAcouuntListAddModel.companyid=this.companyId;
    this.currencyAcouuntListAddModel.authorized=Authorized;
    this.currencyAcouuntListAddModel.name=Name;
    this.currencyAcouuntListAddModel.address=Address;
    this.currencyAcouuntListAddModel.email=Email;
    this.currencyAcouuntListAddModel.code=Code;
    this.currencyAcouuntListAddModel.taxDepartment=TaxDepartment;
    this.currencyAcouuntListAddModel.taxIdNumber=TaxIdNumber;

    this.currenyaccountService.update(this.currencyAcouuntListAddModel).subscribe(next=>{
        this.ToastrService.success(next.message);
        document.getElementById('submitbutton').click();
    },err=>{
      this.ToastrService.error(err.error);
    });
    this.getlist(this.companyId);
    
    this.spinner.hide();
  }

  ChangeStatus(currencyAccount:CurrencyAccount){
    if(currencyAccount.isActive==true){
      currencyAccount.isActive=false;
    }
    else{
      currencyAccount.isActive=true;
    }
    this.currenyaccountService.update(currencyAccount).subscribe(next=>{
      if(next.success)
      {
        this.ToastrService.success('Succes!!');
      }
    },err=>{console.log(err);this.ToastrService.error(err)});
  }
  changecheckbox(){
     this.status=false;
     this.getlist(this.companyId);
  }
  onChange(event:any){
    this.file=event.target.files[0];
  }
  addFromExcel(){
    if(this.file!=null || this.file=="")
    {
      this.spinner.show();
      this.currenyaccountService.AddFromExcel(this.file,this.companyId).subscribe(next=>{

          this.ToastrService.success(next.message);
        this.spinner.hide();
        document.getElementById('closebutton').click();
      },err=>{
        this.spinner.hide();
        this.ToastrService.error(err.error);
      })
    }
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
        
    });
    console.log(this.operationCrud);
  }


}
