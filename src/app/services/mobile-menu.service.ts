import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileMenuService {
  private _status = new BehaviorSubject<boolean>(false)
  status$ = this._status.asObservable()

  constructor() { }

  show(): void {
    this._status.next(true)
  }

  hide(): void {
    this._status.next(false)
  }

  toggle(): void {
    if(this._status.getValue()) {
      this._status.next(false)
    } else {
      this._status.next(true)
    }
  }
}
