import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaysIndexComponent } from './days-index/days-index.component';
import { LayoutModule } from '../_base/layout/layout.module';



@NgModule({
  declarations: [
    DaysIndexComponent
  ],
  imports: [
    CommonModule,
    LayoutModule
  ]
})
export class DaysModule { }
