import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnDestroy, OnInit {
  title = environment.APP_NAME

  user$: Observable<User | null> = this._authS.user$

  private logoutSubs?: Subscription

  constructor(private _authS: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.logoutSubs = this._authS.logout().subscribe()
  }

  ngOnDestroy(): void {
    this.logoutSubs?.unsubscribe
  }
}
