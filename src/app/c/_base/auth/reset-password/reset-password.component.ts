import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { ResetPasswordCredentials } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { password } from '../../form-extensions/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnDestroy, OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    token: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.minLength(8), password]),
    password_confirmation: new FormControl('', [Validators.required]),
  })

  get email() { return this.form.controls.email }
  get token() { return this.form.controls.token }
  get password() { return this.form.controls.password }
  get password_confirmation() { return this.form.controls.password_confirmation }

  serverErrorMessage?:string

  showSpinner: boolean = false

  private resetPasswordSubs?: Subscription
  private paramMapSubs?: Subscription
  private queryParamMapSubs?: Subscription

  constructor(private _route:ActivatedRoute, private _authS: AuthService, private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.paramMapSubs = this._route.paramMap.subscribe((next:ParamMap) => this.token.setValue(next.get('token')))
    this.queryParamMapSubs = this._route.queryParamMap.subscribe((next:ParamMap) => this.email.setValue(next.get('email')))
  }
  
  ngOnDestroy(): void {
    this.resetPasswordSubs?.unsubscribe()
    this.paramMapSubs?.unsubscribe()
    this.queryParamMapSubs?.unsubscribe()
  }

  submit() {
    this.form.markAsPending()
    this.showSpinner = true

    const body = this.form.value as ResetPasswordCredentials

    this.resetPasswordSubs = this._authS.resetPassword(body)
      .pipe(tap({ finalize: () => {
        this.showSpinner = false
        this._cd.detectChanges()
      }}))
      .subscribe({ error: error => {
        const responseErrors:{[key:string]:string[]} = error.error?.errors
        if(!responseErrors) return

        for(let error in responseErrors) {
          // bad token
          const badTokenMessages = [
            'This password reset token is invalid.',
            'El token de restablecimiento de contraseña es inválido.',
          ]
          if(badTokenMessages.includes(responseErrors[error][0])) {
            this.form.setErrors({tokenError: true})
            this.serverErrorMessage = responseErrors[error][0]
            continue
          }

          // password confirmtion
          const passwordConfirmationMessages = [
            'The password confirmation does not match.',
            'La confirmación de contraseña no coincide.',
          ]
          if(passwordConfirmationMessages.includes(responseErrors[error][0])) {
            this.form.setErrors({passwordConfirmationError: true})
            this.serverErrorMessage = responseErrors[error][0]
            continue
          }

          // normal
          const control = this.form.get(error)
          control?.setErrors({serverErrorMessage: responseErrors[error][0]})
          control?.markAsTouched()
        }
      }})
  }
}
