import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { FooterComponent } from './footer.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavComponent } from './nav/nav.component';
import { ToastsComponent } from './toasts/toasts.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NotFoundComponent,
    FooterComponent,
    NavComponent,
    MobileMenuComponent,
    SideMenuComponent,
    ToastsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ], 
  exports: [
    NotFoundComponent,
    FooterComponent,
    NavComponent,
    MobileMenuComponent,
    SideMenuComponent,
    ToastsComponent
  ]
})
export class LayoutModule { }
