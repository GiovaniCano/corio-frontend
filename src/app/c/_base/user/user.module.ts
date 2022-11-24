import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditProfileFormComponent } from './edit-profile/edit-profile-form/edit-profile-form.component';
import { EditPasswordFormComponent } from './edit-profile/edit-password-form/edit-password-form.component';
import { FormExtensionsModule } from '../form-extensions/form-extensions.module';
import { LayoutModule } from '../layout/layout.module';



@NgModule({
  declarations: [
    EditProfileComponent,
    EditProfileFormComponent,
    EditPasswordFormComponent
  ],
  imports: [
    CommonModule,
    FormExtensionsModule,
    LayoutModule
  ]
})
export class UserModule { }
