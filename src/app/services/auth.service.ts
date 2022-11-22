import { debugObs } from '../helpers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, concat, Observable, Subject, tap } from 'rxjs';
import { LoginCredentials, RegisterCredentials, ResetPasswordCredentials } from '../models/interfaces';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = new BehaviorSubject<boolean>(false)
  auth$ = this._auth.asObservable()
  private _user = new BehaviorSubject<User|null>(null)
  user$ = this._user.asObservable()

  private _beforeGuards = new Subject<void>() // to check auth before guards
  beforeGuards$ = this._beforeGuards.asObservable() // to check auth before guards
  private _isFirstLoad:boolean = true
  isFirstLoad() { return this._isFirstLoad }

  constructor(private _toastS: ToastService, private _http: HttpClient, private _router: Router) { }

  resetPassword(body: ResetPasswordCredentials): Observable<any> {
    const url = this.url('reset-password')
    return this._http.post(url, body).pipe(
      tap(() => {
        this._router.navigate(['/login'])
        this._toastS.createToast({
          message: 'Contraseña restablecida exitosamente.',
          type: 'success'
        })
      })
    )
  }

  sendResetPasswordLink(email:string): Observable<any> {
    const url = this.url('forgot-password')
    return this._http.post(url, { email: email }).pipe(
      tap(() => this._toastS.createToast({
        message: 'Email enviado, revisa tu correo electrónico y usa el enlace que enviamos para restablecer tu contraseña.',
        type: 'success'
      }))
    )
  }

  register(credentials: RegisterCredentials): Observable<null> {
    const url = this.url('register')
    return this._http.post<null>(url, credentials).pipe(
      tap(() => {
        this._router.navigate(['/login'])
        this._toastS.createToast({
          message: '¡Cuenta creada, ahora puedes iniciar sesión!',
          type: 'success'
        })
      })
    )
  }

  authStatus(): Observable<User|null> {
    const url = this.url('auth-status')
    return this._http.get<User|null>(url, { headers: { skipCheckIfSessionExpired: 'true' }}).pipe(
      tap({
        next: (next: User | null) => {
          if(next) {
            const user = next
            this._user.next(user)
            this._auth.next(true)
          }
        },
        finalize: () => {
          this._isFirstLoad = false
          this._beforeGuards.complete()
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
  expireSession(): void {
    this._user.next(null)
    this._auth.next(false)
    this._router.navigate(['/login'])
    this._toastS.createToast({
      message: 'Tu sesión expiró, puedes volver a iniciar sesión.',
      type: 'danger'
    })
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
