import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, UrlTree } from '@angular/router';
import { concat, map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private _authS: AuthService, private _router: Router) { }

  canActivate(): Observable<true | UrlTree> {
    return this.authguard()
  }
  canActivateChild(): Observable<true | UrlTree> {
    return this.authguard()
  }
  canLoad(): Observable<true | UrlTree> {
    return this.authguard()
  }

  private authguard(): Observable<true | UrlTree> {
    if (this._authS.isFirstLoad()) {
      return concat(
        this._authS.beforeGuards$,
        this._authS.auth$
      ).pipe(
        map(auth => this.guard(auth))
      )
    } else {
      return this._authS.auth$.pipe(
        map(auth => this.guard(auth))
      )
    }
  }

  private guard(auth:boolean|void) {
    return auth ? auth : this._router.parseUrl('login')
  }
}
