import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlAComponent } from './form-control-a/form-control-a.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlSelectAComponent } from './form-control-select-a/form-control-select-a.component';



@NgModule({
  declarations: [
    FormControlAComponent,
    FormControlSelectAComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormControlAComponent,
    FormControlSelectAComponent,
  ]
})
export class FormExtensionsModule { }
