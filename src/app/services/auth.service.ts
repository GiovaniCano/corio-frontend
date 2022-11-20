import { debugObs } from '../helpers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, concat, Observable, take, tap } from 'rxjs';
import { LoginCredentials } from '../models/interfaces';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = new BehaviorSubject<boolean>(false)
  auth$ = this._auth.asObservable()
  private _user = new BehaviorSubject<User|null>(null)
  user$ = this._user.asObservable()
  // firstLoad
  // waitFirstLoad

  constructor(private _http: HttpClient, private _router: Router) { }

  authStatus(): Observable<User|null> {
    const url = this.url('auth-status')
    return this._http.get<User|null>(url).pipe(
      tap((next: User | null) => {
        if(next) {
          const user = next
          this._user.next(user)
          this._auth.next(true)
        }
      })
    )
  }
  
  logout(): Observable<null> {
    const url = this.url('logout')
    return this._http.post<null>(url, {}).pipe(
      tap({complete: () => {
        this._user.next(null)
        this._auth.next(false)
        this._router.navigate(['/login'])
      }})
    )
  }

  login(credentials: LoginCredentials): Observable<any> {
    const url = this.url('login')
    const login$ = this._http.post<User>(url, credentials).pipe(
      tap((next: User) => {
        const user = next
        this._user.next(user)
        this._auth.next(true)
        this._router.navigate(['/'])
      })
    )
    return concat(this.sanctumCSRF(), login$)
  }

  private sanctumCSRF(): Observable<null> {
    const url = this.url('sanctum/csrf-cookie')
    return this._http.get<null>(url)
  }

  private url(endpoint: string): string {
    return environment.API_URL + endpoint
  }
}
