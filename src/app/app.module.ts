import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';
import { SessionExpiredInterceptor } from './interceptors/session-expired.interceptor';

import { AuthModule } from './c/_base/auth/auth.module';
import { UserModule } from './c/_base/user/user.module';
import { LayoutModule } from './c/_base/layout/layout.module';
import { DaysModule } from './c/days/days.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    LayoutModule,
    AuthModule,
    UserModule,
    DaysModule,

    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SessionExpiredInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
