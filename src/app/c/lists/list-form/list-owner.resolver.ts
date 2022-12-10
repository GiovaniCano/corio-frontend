import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { List } from 'src/app/models/List';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class ListOwnerResolver implements Resolve<List> {
  constructor(private _appS: AppService, private _router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<List> {
    return this._appS.list_show(route.params['id']).pipe(tap({
      error: () => this._router.navigate(['/404'])
    }))
  }
}
