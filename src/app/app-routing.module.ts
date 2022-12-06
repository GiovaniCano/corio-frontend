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
import { DishesIndexComponent } from './c/dishes/dishes-index/dishes-index.component';
import { ItemsIndexComponent } from './c/items/items-index/items-index.component';
import { ListsIndexComponent } from './c/lists/lists-index/lists-index.component';

import { DishFormComponent } from './c/dishes/dish-form/dish-form.component';
import { DishOwnerResolver } from './c/dishes/dish-form/dish-owner.resolver';
import { DayFormComponent } from './c/days/day-form/day-form.component';
import { DayOwnerResolver } from './c/days/day-form/day-owner.resolver';

const routes: Routes = [
  { title: mT('Editar día'), path: 'day/edit/:id', component: DayFormComponent, canActivate: [AuthGuard], resolve: { day: DayOwnerResolver } },
  { title: mT('Crear día'), path: 'day/create', component: DayFormComponent, canActivate: [AuthGuard] },

  { title: mT('Editar platillo'), path: 'dish/edit/:id', component: DishFormComponent, canActivate: [AuthGuard], resolve: { dish: DishOwnerResolver } },
  { title: mT('Crear platillo'), path: 'dish/create', component: DishFormComponent, canActivate: [AuthGuard] },

  { title: mT('Listas'), path: 'lists', component: ListsIndexComponent, canActivate: [AuthGuard] },
  { title: mT('Items'), path: 'items', component: ItemsIndexComponent, canActivate: [AuthGuard] },
  { title: mT('Platillos'), path: 'dishes', component: DishesIndexComponent, canActivate: [AuthGuard] },
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
