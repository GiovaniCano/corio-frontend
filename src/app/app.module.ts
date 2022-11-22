import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';
import { SessionExpiredInterceptor } from './interceptors/session-expired.interceptor';

import { AuthModule } from './c/auth/auth.module';
import { UserModule } from './c/user/user.module';
import { LayoutModule } from './c/layout/layout.module';


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

    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SessionExpiredInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
