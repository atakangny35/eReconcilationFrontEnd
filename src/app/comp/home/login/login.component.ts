import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  tokenStaroge:string="token";
  isvalid:boolean=false;
  hasLoginProcess=true;
  email:string;
  confirmemail:string="sdasdas";
  password:string;
loginForm:UntypedFormGroup;
  constructor(private authService: AuthService,private router:Router,private formBuilder:UntypedFormBuilder,private toasterService:ToastrService) { }

  ngOnInit(): void {
    this.CreateLoginForm();

  }
CreateLoginForm(){
  this.loginForm=this.formBuilder.group(
    {
      email:["",(Validators.required,Validators.email)],
      password:["",Validators.required]
    }


  )
}
login()
{
    if(this.loginForm.valid)
    {
      this.hasLoginProcess=false;
      let loginModel =Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe((next)=>{
          console.log(next);
          console.log('token test');
         if(this.authService.redirectUrl){
            this.router.navigate([this.authService.redirectUrl]);
            this.toasterService.success("Welcome Back","Hello");
         }
         else{
          this.router.navigate([""]);
          
         }
         localStorage.setItem(this.tokenStaroge,next.token);
      },err=>{
        console.log(err);
        this.hasLoginProcess=true;
        this.toasterService.error(err.error,"Error");
      })
    }
    else{
      this.toasterService.error("Fill the required Place!","Error");
    }
    
}
controlvalid(){
  console.log('test');
  this.isvalid=this.loginForm.valid ?true:false;
}
SendConfirmEmail(){
  if(this.confirmemail!=null)
  { //console.log(this.confirmemail+'test1')
      this.authService.SendConfirmEmail(this.confirmemail).subscribe((next)=>{this.toasterService.success('Mail has been sended','Success')},err=>{this.toasterService.error(err.error)});
  }
  else{
    this.toasterService.warning('Email is required','Warning')
  }
}
getclasslist(value:string){
    return value==null ? 'input-group input-group-outline mb-3 is-invalid':'input-group input-group-outline mb-3 is-valid';
  }

}
