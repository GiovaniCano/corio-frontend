import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mT } from './helpers';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

import { NotFoundComponent } from './c/_base/layout/not-found.component';
import { LoginComponent } from './c/_base/auth/login/login.component';
import { RegisterComponent } from './c/_base/auth/register/register.component';
import { ForgotPasswordComponent } from './c/_base/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './c/_base/auth/reset-password/reset-password.component';
import { EditProfileComponent } from './c/_base/user/edit-profile/edit-profile.component';

import { DaysIndexComponent } from './c/days/days-index/days-index.component';

const routes: Routes = [
  { title: mT('Inicio'), path: '', component: DaysIndexComponent, pathMatch: "full", canActivate: [AuthGuard] },

  { title: mT('Editar perfil'), path: 'user/edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },

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
