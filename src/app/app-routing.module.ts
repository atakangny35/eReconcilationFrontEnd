import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './comp/home/home.component';
import { LoginComponent } from './comp/home/login/login.component';
import { RegisterComponent } from './comp/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[LoginGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
