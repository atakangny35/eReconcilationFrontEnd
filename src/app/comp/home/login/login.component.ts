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
         // console.log(next);
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


}
