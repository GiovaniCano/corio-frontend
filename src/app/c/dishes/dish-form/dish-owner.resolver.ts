import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Dish } from 'src/app/models/Dish';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class DishOwnerResolver implements Resolve<Dish> {
  constructor(private _appS: AppService, private _router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dish> {
    return this._appS.dish_show(route.params['id']).pipe(tap({
      error: () => this._router.navigate(['/404'])
    }))
  }
}
