import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, concat, last, Observable, Subject, take, tap } from 'rxjs';
import { LoginCredentials, RegisterCredentials, ResetPasswordCredentials, UpdatePasswordCredentials, UpdateProfileCredentials } from '../models/_types';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { ToastService } from './toast.service';
import { AppService } from './app.service';
import { SelectListService } from './select-list.service';

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

  constructor(
    private _toastS: ToastService, 
    private _http: HttpClient, 
    private _router: Router,
    private _appS: AppService,
    private _selectListS: SelectListService
  ) { }

  updateProfile(body: UpdateProfileCredentials): Observable<User> {
    const url = this.url('user/profile-information')
    return this._http.put<User>(url, body).pipe(
      tap(user => {
        this._user.next(user)
      })
    )
  }

  updatePassword(body: UpdatePasswordCredentials): Observable<any> {
    const url = this.url('user/password')
    return this._http.put(url, body)
  }

  deleteAccount(password:string): Observable<null> {
    const url = this.url('user/delete-account')
    const deleteAccound$ = this._http.delete<null>(url)

    return concat(
      this.confirmPassword(password),
      deleteAccound$
    ).pipe( last(), tap(() => {
      this._auth.next(false)
      this._user.next(null)
      this._router.navigate(['/login'])
    }))
  }

  confirmPassword(password:string): Observable<any> {
    const url = this.url('user/confirm-password')
    return this._http.post(url, {password: password})
  }

  resetPassword(body: ResetPasswordCredentials): Observable<any> {
    const url = this.url('reset-password')
    return this._http.post(url, body).pipe(
      tap(() => {
        this._router.navigate(['/login'])
        this._toastS.createToast({
          message: 'Contrase??a restablecida exitosamente.',
          type: 'success'
        })
      })
    )
  }

  sendResetPasswordLink(email:string): Observable<any> {
    const url = this.url('forgot-password')
    return this._http.post(url, { email: email }).pipe(
      tap(() => this._toastS.createToast({
        message: 'Email enviado, revisa tu correo electr??nico y usa el enlace que enviamos para restablecer tu contrase??a.',
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
          message: '??Cuenta creada, ahora puedes iniciar sesi??n!',
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
      message: 'Tu sesi??n expir??, puedes volver a iniciar sesi??n.',
      type: 'danger'
    })
  }

  login(credentials: LoginCredentials): Observable<any> {
    const url = this.url('login')
    const login$ = this._http.post<User>(url, credentials).pipe(
      tap({
        next: next => {
          const user = next
          this._user.next(user)
          this._auth.next(true)
          this._router.navigate(['/'])
        },
        complete: () => this._appS.list_indexlite().pipe(take(1)).subscribe(lists => this._selectListS.pushLists(lists))
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
