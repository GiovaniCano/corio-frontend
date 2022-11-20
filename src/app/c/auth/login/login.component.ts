import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { LoginCredentials } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required ]),
    remember: new FormControl(false)
  })

  get email() { return this.form.controls.email }
  get password() { return this.form.controls.password }
  get remember() { return this.form.controls.remember }

  authError?:string

  showSpinner: boolean = false

  private loginSubs?: Subscription

  constructor(private _authS: AuthService, private _cd: ChangeDetectorRef) { }

  submit() {
    this.form.markAsPending()
    this.showSpinner = true

    const credentials = this.form.value as LoginCredentials

    this.loginSubs = this._authS.login(credentials)
      .pipe(tap({ finalize: () => {
        this.showSpinner = false
        this._cd.detectChanges()
      }}))
      .subscribe({ error: error => {
        const responseErrors:{[key:string]:string[]} = error.error?.errors
        if(!responseErrors) return

        for(let error in responseErrors) {
          if(error === 'auth') {
            this.form.setErrors({auth: true})
            this.authError = responseErrors[error][0]
          }

          const control = this.form.get(error)
          control?.setErrors({serverErrorMessage: responseErrors[error][0]})
          control?.markAsTouched()
        }
      }})
  }

  ngOnDestroy(): void {
    this.loginSubs?.unsubscribe()
  }
}
