import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, share } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  auth$: Observable<boolean> = this._authS.auth$.pipe(share())

  constructor(private _authS: AuthService) {
    this._authS.authStatus().subscribe()
  }
}
