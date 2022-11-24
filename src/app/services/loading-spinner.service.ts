import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private maxTimeShowingInSeconds: number = 3

  private _status = new BehaviorSubject<boolean>(false)
  status$ = this._status.asObservable()

  constructor() { }

  show(): void {
    this._status.next(true)

    setTimeout(() => {
      if(this._status.getValue()) {
        this._status.next(false)
      }
    }, this.maxTimeShowingInSeconds * 1000);
  }

  hide(): void {
    this._status.next(false)
  }
}
