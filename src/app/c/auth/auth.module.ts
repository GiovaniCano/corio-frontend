import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HeaderGuestComponent } from './header-guest.component';
import { FormExtensionsModule } from '../form-extensions/form-extensions.module';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LayoutModule } from '../layout/layout.module';



@NgModule({
  declarations: [
    HeaderGuestComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormExtensionsModule,
    RouterModule
  ]
})
export class AuthModule { }
