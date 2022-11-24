import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent implements OnDestroy {
  form = new FormGroup({
    password: new FormControl('', [Validators.required])
  })

  get password() { return this.form.controls.password }

  private deleteAccountSubs?: Subscription

  show_confirmDeleteAccountModal:boolean = false

  showSpinner:boolean = false

  constructor(private _authS: AuthService, private _cd: ChangeDetectorRef) { }

  deleteAccount() {
    this.showSpinner = true
    this.form.markAsPending()

    const password = this.password.value ?? ''

    this.deleteAccountSubs = this._authS.deleteAccount(password).pipe(
      tap({ finalize: () => {
        this.showSpinner = false
        this._cd.detectChanges()
      }})
    ).subscribe({ error: error => {
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
    this.deleteAccountSubs?.unsubscribe()
  }

}
