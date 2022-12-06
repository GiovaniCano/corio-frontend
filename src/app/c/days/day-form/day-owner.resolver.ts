import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Day } from 'src/app/models/Day';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class DayOwnerResolver implements Resolve<Day> {
  constructor(private _appS: AppService, private _router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Day> {
    return this._appS.day_show(route.params['id']).pipe(tap({
      error: () => this._router.navigate(['/404'])
    }))
  }
}
