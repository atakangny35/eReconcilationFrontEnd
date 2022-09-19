import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './comp/home/home.component';
import { LoginComponent } from './comp/home/login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './comp/register/register.component';
import { NavComponent } from './comp/nav/nav.component';
import { AsideComponent } from './comp/aside/aside.component';
import { CurrencyAccountComponent } from './comp/currency-account/currency-account.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CurrencyAccountPipe } from './pipe/currency-account.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserComponent } from './comp/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    AsideComponent,
    CurrencyAccountComponent,
    CurrencyAccountPipe,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      progressBar:true,
      closeButton:true
    }), // ToastrModule added
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide:'url',useValue:'https://localhost:44319/api/'},
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
