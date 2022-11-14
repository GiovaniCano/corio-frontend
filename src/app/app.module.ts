import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { HeaderGuestComponent } from './layout/header-guest.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideMenuComponent,
    HeaderGuestComponent
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
