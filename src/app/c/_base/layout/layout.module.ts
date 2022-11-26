import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { FooterComponent } from './footer.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavComponent } from './nav/nav.component';
import { ToastsComponent } from './toasts/toasts.component';
import { RouterModule } from '@angular/router';
import { ModalBaseComponent } from './modal-base/modal-base.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { HeaderActionsComponent } from './header-actions/header-actions.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ButtonSvgComponent } from './button-svg.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    FooterComponent,
    NavComponent,
    MobileMenuComponent,
    SideMenuComponent,
    ToastsComponent,
    ModalBaseComponent,
    HeaderMobileComponent,
    HeaderActionsComponent,
    LoadingSpinnerComponent,
    ButtonSvgComponent,
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
    ToastsComponent,
    ModalBaseComponent,
    HeaderMobileComponent,
    HeaderActionsComponent,
    LoadingSpinnerComponent,
    ButtonSvgComponent,
  ]
})
export class LayoutModule { }
