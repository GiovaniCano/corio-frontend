import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mT } from './helpers';

import { LoginComponent } from './c/auth/login/login.component';
import { NotFoundComponent } from './c/layout/not-found.component';

import { DaysIndexComponent } from './c/user/days-index/days-index.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { RegisterComponent } from './c/auth/register/register.component';
import { ForgotPasswordComponent } from './c/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './c/auth/reset-password/reset-password.component';

const routes: Routes = [
  { title: mT('Inicio'), path: '', component: DaysIndexComponent, pathMatch: "full", canActivate: [AuthGuard] },

  { title: mT('Iniciar sesión'), path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { title: mT('Crear cuenta'), path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { title: mT('Olvidé mi contraseña'), path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [GuestGuard] },
  { title: mT('Restablecer contraseña'), path: 'reset-password/:token', component: ResetPasswordComponent, canActivate: [GuestGuard] },

  { title: mT('Página no encontrada'), path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
