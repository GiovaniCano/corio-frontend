import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, share } from 'rxjs';
import { AuthService } from './services/auth.service';
import { MobileMenuService } from './services/mobile-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  auth$: Observable<boolean> = this._authS.auth$.pipe(share())

  showMobileMenu$: Observable<boolean> = this._mobileMenuS.status$

  constructor(private _authS: AuthService, private _mobileMenuS: MobileMenuService, private _router: Router) { }

  ngOnInit(): void {
    /* auth status */
    this._authS.authStatus().subscribe()

    /* close mobile menu on navigation */
    this._router.events.subscribe(routerEvent => {
      if(routerEvent instanceof NavigationStart) {
        this._mobileMenuS.hide()
      }
    })
  }
}
