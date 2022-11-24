import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { password } from 'src/app/c/_base/form-extensions/validators';
import { UpdatePasswordCredentials } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-password-form',
  templateUrl: './edit-password-form.component.html',
  styleUrls: ['./edit-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPasswordFormComponent {
  form = new FormGroup({
    current_password: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, password, Validators.minLength(8), Validators.maxLength(255)]),
    password_confirmation: new FormControl('', [Validators.required]),
  })

  get current_password() { return this.form.controls.current_password }
  get password() { return this.form.controls.password }
  get password_confirmation() { return this.form.controls.password_confirmation }

  passwordConfirmationError?:string

  showSpinner: boolean = false

  private updatePasswordSubs?: Subscription

  constructor(private _authS: AuthService, private _cd: ChangeDetectorRef) { }

  submit() {
    this.form.markAsPending()
    this.showSpinner = true

    const body = this.form.value as UpdatePasswordCredentials

    this.updatePasswordSubs = this._authS.updatePassword(body)
      .pipe(tap({ finalize: () => {
        this.showSpinner = false
        this._cd.detectChanges()
      }}))
      .subscribe({ error: error => {
        const responseErrors:{[key:string]:string[]} = error.error?.errors
        if(!responseErrors) return

        for(let error in responseErrors) {
          const passwordConfirmationMessages = [
            'The password confirmation does not match.',
            'La confirmación de contraseña no coincide.',
          ]
          if(passwordConfirmationMessages.includes(responseErrors[error][0])) {
            this.form.setErrors({passwordConfirmationError: true})
            this.passwordConfirmationError = responseErrors[error][0]
            continue
          }
          
          const control = this.form.get(error)
          control?.setErrors({serverErrorMessage: responseErrors[error][0]})
          control?.markAsTouched()
        }
      }})
  }

  ngOnDestroy(): void {
    this.updatePasswordSubs?.unsubscribe()
  }

}
