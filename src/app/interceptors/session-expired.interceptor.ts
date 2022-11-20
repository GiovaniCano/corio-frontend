import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SessionExpiredInterceptor implements HttpInterceptor {
  constructor(private _authSerivce: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.headers.has('skipCheckIfSessionExpired')) {
      const newRequest = request.clone({
        headers: request.headers.delete('skipCheckIfSessionExpired')
      })
      return next.handle(newRequest)
    }

    return next.handle(request).pipe(
      tap({ error: error => {
        if(error.status === 401 || error.status === 419) {
          this._authSerivce.expireSession()
        }
      }})
    )
  }
}
