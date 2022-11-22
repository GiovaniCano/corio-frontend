import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { RegisterCredentials } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { alphaNumExtras, password } from '../../widgets/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnDestroy {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25), alphaNumExtras]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, password, Validators.minLength(8), Validators.maxLength(255)]),
    password_confirmation: new FormControl('', [Validators.required]),
  })

  get username() { return this.form.controls.username }
  get email() { return this.form.controls.email }
  get password() { return this.form.controls.password }
  get password_confirmation() { return this.form.controls.password_confirmation }

  passwordConfirmationError?:string

  showSpinner: boolean = false

  private registerSubs?: Subscription

  constructor(private _authS: AuthService, private _cd: ChangeDetectorRef) { }

  submit() {
    this.form.markAsPending()
    this.showSpinner = true

    const credentials = this.form.value as RegisterCredentials

    this.registerSubs = this._authS.register(credentials)
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
    this.registerSubs?.unsubscribe()
  }
}
