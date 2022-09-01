import { Component, OnInit } from '@angular/core';
import { NgControl, NgForm, NgModel } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Company, registerModel, UserRegisterModel } from 'src/app/models/registerModel';
import { Terms } from 'src/app/models/terms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
 
 
  namecheck:string;
  emailcheck:string;
  passwordcheck:string;

  Termscheck:boolean=false;
  terms:Terms;
  registerModel:registerModel={
    userRegisterModel: undefined,
    company: undefined
  };
  company:Company={
    id: 0,
    name: '',
    address: '',
    taxDepartment: '',
    taxIdNumber: '',
    identityNumber: '',
    addedTime: undefined,
    IsActive: false
  };
  userRegisterModel:UserRegisterModel={
    name: '',
    email: '',
    password: ''
  }
  constructor(private authService:AuthService,private toasterService:ToastrService, private router:Router) { }
  tokenStaroge:string="token";
  ngOnInit(): void {
    this.GetTerms();
    console.log(this.terms);
  }

  register(name:string,email:string,password:string,companyName:string,address:string,taxDepartment:string,taxIdNumber:string,identityNumber:string){
    //console.log(this.Termscheck);
    if(this.Termscheck)
    {
    this.registerModel.company=this.company;
    this.registerModel.userRegisterModel=this.userRegisterModel;
    this.registerModel.company.IsActive=false;
    let date=new Date();
    this.registerModel.company.addedTime=date;
    this.registerModel.company.address=address;
    this.registerModel.company.taxDepartment=taxDepartment;
    this.registerModel.company.taxIdNumber=taxIdNumber;
    this.registerModel.company.identityNumber=identityNumber;
    this.registerModel.company.name=companyName;
    this.registerModel.userRegisterModel.email=email;
    this.registerModel.userRegisterModel.name=name;
    this.registerModel.userRegisterModel.password=password
    //console.log(this.registerModel);
    this.authService.register(this.registerModel).subscribe((next:any)=>{
     // console.log(next);
      this.router.navigate(['/login']);
      this.toasterService.success("You can login now!!","Hello");
      localStorage.setItem(this.tokenStaroge,next.token);
    },err=>{console.log(err);this.toasterService.error(err.error,"Error");})}
    else
    {
      this.toasterService.warning('You should agreed,Terms and conditions','warning');
    }
  }
  GetTerms()
  {
    this.authService.getTerms().subscribe((next)=>{this.terms=next.data},err=>this.toasterService.error(err.error));
  }
  checkcontrol(model:any)
  {//input içintype bulamadım o yüzden any kullanmak durumunda kaldım
    console.log(model)
    model.checked=true;
    this.Termscheck=true;
  }
  getclasslist(value:string){
    return value==null ? 'input-group input-group-outline mb-3 is-invalid':'input-group input-group-outline mb-3 is-valid';
  }
  
}
