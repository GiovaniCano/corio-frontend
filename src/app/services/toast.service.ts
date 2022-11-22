import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toasts = new BehaviorSubject<Toast[]>([])
  toasts$ = this._toasts.asObservable()

  constructor() { }

  createToast(toast: Toast): void {
    const currentToasts = this._toasts.getValue()
    this._toasts.next([...currentToasts, toast])
  }

  deleteToast(index: number): void {
    const currentToasts = this._toasts.getValue()
    const toasts = currentToasts.filter((toast, i) => index !== i)
    console.log(toasts)
    this._toasts.next(toasts)
  }
}
