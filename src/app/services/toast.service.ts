import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models/_types';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private maxTimeToastInSeconds = 4

  private _toasts = new BehaviorSubject<Toast[]>([])
  toasts$ = this._toasts.asObservable()

  private nextId: number = 0

  constructor() { }

  createToast(toast: Toast): void {
    toast.id = this.nextId
    this.nextId++

    const currentToasts = this._toasts.getValue()
    this._toasts.next([...currentToasts, toast])

    setTimeout(() => { // autohide
      const currentToasts = this._toasts.getValue()

      if(currentToasts.length > 0) {
        this.deleteToast(toast.id!)
      }
    }, this.maxTimeToastInSeconds * 1000);
  }

  deleteToast(id: number): void {
    const currentToasts = this._toasts.getValue()
    const toasts = currentToasts.filter((toast) => id !== toast.id)
    this._toasts.next(toasts)
  }
}
