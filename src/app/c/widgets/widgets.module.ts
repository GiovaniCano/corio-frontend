import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlAComponent } from './form-control-a/form-control-a.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormControlAComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormControlAComponent
  ]
})
export class WidgetsModule { }
