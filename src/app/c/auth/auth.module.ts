import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HeaderGuestComponent } from './header-guest.component';
import { FooterGuestComponent } from './footer-guest.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderGuestComponent,
    FooterGuestComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthModule { }
