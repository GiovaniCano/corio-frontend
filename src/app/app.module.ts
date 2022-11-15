import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './c/auth/login/login.component';
import { SideMenuComponent } from './c/layout/side-menu/side-menu.component';
import { HeaderGuestComponent } from './c/layout/header-guest.component';
import { NotFoundComponent } from './c/layout/not-found.component';
import { DaysIndexComponent } from './c/user/days-index/days-index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideMenuComponent,
    HeaderGuestComponent,
    NotFoundComponent,
    DaysIndexComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
