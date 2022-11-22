import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnDestroy {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  get email() { return this.form.controls.email }

  showSpinner: boolean = false

  private sendEmailSubs?: Subscription

  constructor(private _authS: AuthService, private _cd: ChangeDetectorRef) { }

  submit() {
    this.form.markAsPending()
    this.showSpinner = true

    const email = this.email.value ?? ''

    this.sendEmailSubs = this._authS.sendResetPasswordLink(email)
      .pipe(tap({ finalize: () => {
        this.showSpinner = false
        this._cd.detectChanges()
      }}))
      .subscribe({ error: error => {
        const responseErrors:{[key:string]:string[]} = error.error?.errors
        if(!responseErrors) return

        for(let error in responseErrors) {
          const control = this.form.get(error)
          control?.setErrors({serverErrorMessage: responseErrors[error][0]})
          control?.markAsTouched()
        }
      }})
  }

  ngOnDestroy(): void {
    this.sendEmailSubs?.unsubscribe()
  }
}
