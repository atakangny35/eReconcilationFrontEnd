import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_ASYNC_VALIDATORS, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { userOperationClaim } from 'src/app/models/operationClaim';
import { UserCompanyListDto } from 'src/app/models/UserCompanyListDto';
import { UserAddModel } from 'src/app/models/UsueAddModal';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  useraddForm:FormGroup
  userUpdateForm:FormGroup
  operationCrud:boolean=false;
  tokenStorege :string="token";
  useroperationClaimList: userOperationClaim[]=[];
  userCompanyDtoList: UserCompanyListDto[]=[];
  UserAddModel:UserAddModel;
  decodedToken:any;
  userid:number;
  ShowList:boolean;
  searchvalue:string="";
  companyId:any;
  status:boolean=true;
  statusAll:boolean=false;
  JwtHelper =new JwtHelperService();
  errmsg :string;
  constructor(private spinner :NgxSpinnerService, private useroperationclaimservice:UserOperationClaimService
    ,private ToastrService:ToastrService,
    private userservice: UserService
    ,private formbuilder :FormBuilder) { }
    
  ngOnInit(): void {
    this.getDecodedToken();
    this.GetUserOperationList();
    this.GetUserList(this.companyId);
    this.CreateForm();
  }

  CreateForm(){
    this.useraddForm=this.formbuilder.group({
        name:["",Validators.required],
        email:["",Validators.required],
        password:["",Validators.required],
        companyId:[this.companyId,Validators.required]
    });
  }
  add(){
    if(this.useraddForm.valid){
    this.spinner.show();
    this.UserAddModel=Object.assign({},this.useraddForm.value);
    //console.log(this.UserAddModel);
    this.userservice.Add(this.UserAddModel).subscribe(next=>{
        this.GetUserList(this.companyId);
      document.getElementById('closebuttonuser').click();
        this.ToastrService.success("User succesfuly Added!",'Success');
    },err=>{
      this.errmsg =err.error;
     let b= Object.keys(this.errmsg).filter(x=>x.includes("/Error"));
      console.log(b);
      this.ToastrService.warning(err.error);
    })
    this.CreateForm();
    
    this.spinner.hide();
  }
  
 
  
  }
  exportExcel(){
    let element=document.getElementById('excel-table');
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook= XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb,'userList.xlsx');

  }
  changeSpanClass(value:boolean){
    //console.log(value);
    return value==true ? "badge badge-sm bg-gradient-success" : "badge badge-sm bg-gradient-danger";
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
        else if(claim.operationClaimName=="User.crud"){
          this.operationCrud=true
        }
       
    });
  }
  GetUserList(companyId:number){
    
    this.spinner.show();
    
    this.userservice.GetUserList(companyId).subscribe(next=>{this.userCompanyDtoList=next.data;
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
          this.userCompanyDtoList=  this.userCompanyDtoList.filter(x=>x.userIsActive==this.status);
          
        }
       
      }
    
    },err=>{
        this.ToastrService.error('Service Can not accesible,Please try again Later','Error!'); 
        this.spinner.hide();     
    });
    
    
  }
  changecheckbox(){
    this.status=false;
    this.GetUserList(this.companyId);
 }
 ChangeStatus(currencyAccount:any){
  if(currencyAccount.isActive==true){
    currencyAccount.isActive=false;
  }
  else{
    currencyAccount.isActive=true;
  }/*
  this.currenyaccountService.update(currencyAccount).subscribe(next=>{
    if(next.success)
    {
      this.ToastrService.success('Succes!!');
    }
  },err=>{console.log(err);this.ToastrService.error(err)});*/
}
}
