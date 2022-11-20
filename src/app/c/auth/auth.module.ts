import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HeaderGuestComponent } from './header-guest.component';
import { FooterGuestComponent } from './footer-guest.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderGuestComponent,
    FooterGuestComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    WidgetsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
