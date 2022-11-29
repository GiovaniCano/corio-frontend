import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, ViewChildren } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Toast } from 'src/app/models/_types';
import { ToastService } from 'src/app/services/toast.service';
declare const bootstrap: any;


@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastsComponent implements AfterViewChecked {
  @ViewChildren('toast') toastsInView!: ElementRef[]

  toasts$: Observable<Toast[]> = this._toastService.toasts$
    // .pipe(tap(toasts => console.log(toasts)))

  constructor(private _toastService: ToastService) { }

  ngAfterViewChecked(): void {
    this.toastsInView.forEach(function(toast) {
      const bsToast = new bootstrap.Toast(toast.nativeElement, {autohide: false, animation: false})
      bsToast.show()
    })
  }

  deleteToast(index: number) {
    this._toastService.deleteToast(index)
  }

  /* debug */
  createToast() {
    this._toastService.createToast({
      message: 'This try to be a very long debug message with a random number: ' + Math.floor((Math.random() * 100)),
      // type: 'danger' 
      // type: 'info'
      type: 'success'
    })
  }
}
