import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  CurrentCompenet:string="";

  constructor(private authService : AuthService,private router :Router,private toasterService:ToastrService) { }

  ngOnInit(): void {
    
  }
  LogOut(){
    this.authService.LogOut();
    this.router.navigate(['/login'])
    this.toasterService.show('We wish to see you again','Good by')
  }

ChangeClass(url:string){
  this.CurrentCompenet= this.router.routerState.snapshot.url;
  return url ==this.CurrentCompenet ?  "nav-link text-white active bg-gradient-primary":"nav-link text-white";


}

}
