import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mT } from './helpers';

import { LoginComponent } from './c/auth/login/login.component';
import { NotFoundComponent } from './c/layout/not-found.component';

import { DaysIndexComponent } from './c/user/days-index/days-index.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  { title: mT('Home'), path: '', component: DaysIndexComponent, pathMatch: "full", canActivate: [AuthGuard] },

  { title: mT('Login'), path: 'login', component: LoginComponent, canActivate: [GuestGuard] },

  { title: mT('Page not found'), path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
