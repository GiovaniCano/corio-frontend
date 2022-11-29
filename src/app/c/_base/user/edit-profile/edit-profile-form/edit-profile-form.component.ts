import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { alphaNumExtras } from 'src/app/c/_base/form-extensions/validators';
import { Avatar, UpdateProfileCredentials } from 'src/app/models/_types';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileFormComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25), alphaNumExtras]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    avatar_id: new FormControl(0)
  })

  get username() { return this.form.controls.username }
  get email() { return this.form.controls.email }
  get avatar_id() { return this.form.controls.avatar_id }

  avatars!: Avatar[]
  currentAvatar?:Avatar
  selectedAvatar?:Avatar

  showSpinner: boolean = false
  showAvatarsModal: boolean = false

  private updateProfileSubs?: Subscription
  private userSubs?: Subscription
  private avatarsSubs?: Subscription

  constructor(private _authS: AuthService, private _userS: UserService, private _cd: ChangeDetectorRef) { }

  setAvatarId(avatar:Avatar) {
    this.selectedAvatar = avatar
    this.avatar_id.setValue(avatar.id)
  }

  ngOnInit(): void {
    /* user */
    this.userSubs = this._authS.user$.pipe(
      tap(user => {
        this.selectedAvatar = user?.avatar
        this.currentAvatar = user?.avatar
        this.form.patchValue({
          email: user?.email,
          username: user?.username,
          avatar_id: user?.avatar.id
        })
      })
    ).subscribe()

    /* avatars */
    this.avatarsSubs = this._userS.avatars().subscribe(avatars => this.avatars = avatars)
  }

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
          const control = this.form.get(error)
          control?.setErrors({serverErrorMessage: responseErrors[error][0]})
          control?.markAsTouched()
        }
      }})
  }

  ngOnDestroy(): void {
    this.updateProfileSubs?.unsubscribe()
    this.userSubs?.unsubscribe()
    this.avatarsSubs?.unsubscribe()
  }
}
