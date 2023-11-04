import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageSignInComponent } from './pages/page-sign-in/page-sign-in.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

@NgModule({
  declarations: [
    PageLoginComponent,
    PageSignInComponent,
    LoginComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
