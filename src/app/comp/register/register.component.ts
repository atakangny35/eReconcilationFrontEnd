import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Company, registerModel, UserRegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
 
 
 
 
 
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
  }

  register(name:string,email:string,password:string,companyName:string,address:string,taxDepartment:string,taxIdNumber:string,identityNumber:string){
    console.log("test1111");
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
      console.log(next);
      this.router.navigate(['/login']);
      this.toasterService.success("You can login now!!","Hello");
      localStorage.setItem(this.tokenStaroge,next.token);
    },err=>{console.log(err);this.toasterService.error(err.error,"Error");})
  }

}
