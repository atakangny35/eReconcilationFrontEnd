import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './comp/company/company.component';
import { CurrencyAccountComponent } from './comp/currency-account/currency-account.component';
import { HomeComponent } from './comp/home/home.component';
import { LoginComponent } from './comp/home/login/login.component';
import { RegisterComponent } from './comp/register/register.component';
import { UserComponent } from './comp/user/user.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[LoginGuard]},
  {path:'home',component:HomeComponent,canActivate:[LoginGuard]},
  {path:'currency-account',component:CurrencyAccountComponent,canActivate:[LoginGuard]},
  {path:'user',component:UserComponent,canActivate:[LoginGuard]},
  {path:'company',component:CompanyComponent,canActivate:[LoginGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'**',component:RegisterComponent}//en altta olmalı notFound için
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
