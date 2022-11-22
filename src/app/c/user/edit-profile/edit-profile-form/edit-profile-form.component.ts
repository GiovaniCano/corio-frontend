import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { alphaNumExtras } from 'src/app/c/form-extensions/validators';
import { UpdateProfileCredentials } from 'src/app/models/interfaces';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileFormComponent implements OnDestroy {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25), alphaNumExtras]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)])
  })

  get username() { return this.form.controls.username }
  get email() { return this.form.controls.email }

  user$: Observable<User|null> = this._authS.user$

  // passwordConfirmationError?:string

  showSpinner: boolean = false

  private updateProfileSubs?: Subscription

  constructor(private _authS: AuthService, private _cd: ChangeDetectorRef) { }

  submit() {
    this.form.markAsPending()
    this.showSpinner = true

    const body = this.form.value as UpdateProfileCredentials

    this.updateProfileSubs = this._authS.updateProfile(body)
      .pipe(tap({ finalize: () => {
        this.showSpinner = false
        this._cd.detectChanges()
      }}))
      .subscribe({ error: error => {
        const responseErrors:{[key:string]:string[]} = error.error?.errors
        if(!responseErrors) return

        for(let error in responseErrors) {
          // const passwordConfirmationMessages = [
          //   'The password confirmation does not match.',
          //   'La confirmación de contraseña no coincide.',
          // ]
          // if(passwordConfirmationMessages.includes(responseErrors[error][0])) {
          //   this.form.setErrors({passwordConfirmationError: true})
          //   this.passwordConfirmationError = responseErrors[error][0]
          //   continue
          // }
          
          const control = this.form.get(error)
          control?.setErrors({serverErrorMessage: responseErrors[error][0]})
          control?.markAsTouched()
        }
      }})
  }

  ngOnDestroy(): void {
    this.updateProfileSubs?.unsubscribe()
  }

}
