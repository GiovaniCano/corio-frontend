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

import { DayShowComponent } from './c/days/day-show/day-show.component';
import { DaysIndexComponent } from './c/days/days-index/days-index.component';
import { DaySectionShowComponent } from './c/days/day-section-show/day-section-show.component';
import { DishShowComponent } from './c/dishes/dish-show/dish-show.component';
import { ItemShowComponent } from './c/items/item-show/item-show.component';
import { DishesIndexComponent } from './c/dishes/dishes-index/dishes-index.component';


@NgModule({
  declarations: [
    AppComponent,

    DaysIndexComponent,
    DayShowComponent,
    DaySectionShowComponent,
    DishShowComponent,
    ItemShowComponent,
    DishesIndexComponent,
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
