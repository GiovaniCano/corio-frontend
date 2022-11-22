import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './c/auth/auth.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './c/layout/not-found.component';
import { SideMenuComponent } from './c/layout/side-menu/side-menu.component';
import { MobileMenuComponent } from './c/layout/mobile-menu/mobile-menu.component';
import { NavComponent } from './c/layout/nav/nav.component';
import { DaysIndexComponent } from './c/user/days-index/days-index.component';
import { ToastsComponent } from './c/layout/toasts/toasts.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    NotFoundComponent,
    DaysIndexComponent,
    NavComponent,
    MobileMenuComponent,
    ToastsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    AuthModule,

    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
