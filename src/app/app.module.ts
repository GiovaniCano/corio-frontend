import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormExtensionsModule } from './c/_base/form-extensions/form-extensions.module';

import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';
import { SessionExpiredInterceptor } from './interceptors/session-expired.interceptor';

import { AuthModule } from './c/_base/auth/auth.module';
import { UserModule } from './c/_base/user/user.module';
import { LayoutModule } from './c/_base/layout/layout.module';

import { DayShowComponent } from './c/days/day-show/day-show.component';
import { DaysIndexComponent } from './c/days/days-index/days-index.component';
import { DaySectionShowComponent } from './c/days/day-section-show/day-section-show.component';
import { DishShowComponent } from './c/dishes/dish-show/dish-show.component';
import { ItemableShowComponent } from './c/items/itemable-show/itemable-show.component';
import { DishesIndexComponent } from './c/dishes/dishes-index/dishes-index.component';
import { ItemsIndexComponent } from './c/items/items-index/items-index.component';
import { ItemShowComponent } from './c/items/item-show/item-show.component';
import { ListsIndexComponent } from './c/lists/lists-index/lists-index.component';
import { ListItemableComponent } from './c/lists/list-itemable/list-itemable.component';
import { ListShowComponent } from './c/lists/list-show/list-show.component';

import { ItemFormModalComponent } from './c/items/item-form-modal/item-form-modal.component';
import { DishFormComponent } from './c/dishes/dish-form/dish-form.component';
import { ItemsIndexModalComponent } from './c/items/items-index-modal/items-index-modal.component';
import { ItemableFormComponent } from './c/items/itemable-form/itemable-form.component';


@NgModule({
  declarations: [
    AppComponent,

    DaysIndexComponent,
    DayShowComponent,
    DaySectionShowComponent,
    DishShowComponent,
    ItemableShowComponent,
    DishesIndexComponent,
    ItemsIndexComponent,
    ItemShowComponent,
    ListsIndexComponent,
    ListItemableComponent,
    ListShowComponent,

    ItemFormModalComponent,
      DishFormComponent,
      ItemsIndexModalComponent,
      ItemableFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormExtensionsModule,

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
