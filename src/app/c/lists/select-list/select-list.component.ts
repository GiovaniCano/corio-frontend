import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { List_Post } from 'src/app/models/List';
import { AppService } from 'src/app/services/app.service';
import { ToastService } from 'src/app/services/toast.service';
import { SelectListService } from 'src/app/services/select-list.service';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectListComponent implements OnDestroy {
  @Output() close = new EventEmitter<void>()
  @Output() listSelected = new EventEmitter<number>()

  lists$ = this.selectListsS.lists$

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(25)])
  })
  get name() { return this.form.controls.name }

  showSpinner: boolean = false
  showCreateListModal: boolean = false

  private createlistSubs?: Subscription

  constructor(
    private selectListsS: SelectListService, 
    private _appS: AppService, 
    private _toastS: ToastService, 
    private _cd: ChangeDetectorRef,
  ) { }

  createList() {
    this.showSpinner = true
    this.form.markAsPending()

    const list = new List_Post(this.name.value??'', [])

    this.createlistSubs = this._appS.list_store(list).subscribe({
      next: list => {
        this.selectListsS.addList(list)

        this._toastS.createToast({
          message: 'Lista creada',
          type: 'success'
        })

        this.showCreateListModal = false
        this.showSpinner = false
        this.form.reset()
        this._cd.detectChanges()
      },
      error: error => {
        this.showSpinner = false

        const responseErrors:{[key:string]:string[]} = error.error?.errors
        if(responseErrors) {
          for(let error in responseErrors) {          
            const control = this.form.get(error)
            control?.setErrors({serverErrorMessage: responseErrors[error][0]})
            control?.markAsTouched()
          }          
        }

        this._cd.detectChanges()
      }
    })
  }

  onListSelected(id: number) {
    this.listSelected.emit(id)
  }

  onclose() {
    this.close.emit()
  }

  ngOnDestroy(): void {
    this.createlistSubs?.unsubscribe() 
  }
}
