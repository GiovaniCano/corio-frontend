import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { Item, Item_Post } from 'src/app/models/Item';
import { AppService } from 'src/app/services/app.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';
import { ToastService } from 'src/app/services/toast.service';
import { requiredSelect } from '../../_base/form-extensions/validators';

@Component({
  selector: 'app-item-form-modal',
  templateUrl: './item-form-modal.component.html',
  styleUrls: ['./item-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemFormModalComponent implements OnDestroy, OnInit {
  @Input() itemToEdit?: Item

  @Output() close = new EventEmitter<void>()

  @Output() itemCreated = new EventEmitter<Item>()
  @Output() itemUpdated = new EventEmitter<Item>()
  @Output() itemDeleted = new EventEmitter<number>()

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    measurement_type_id: new FormControl(0, [requiredSelect(0)]),
  })

  get name() { return this.form.controls.name }
  get measurement_type_id() { return this.form.controls.measurement_type_id }

  showSpinner: boolean = false
  showConfirmDeleteModal: boolean = false

  private actionSubs?: Subscription
  private deleteSubs?: Subscription

  constructor(
    private _appS: AppService, 
    private _cd: ChangeDetectorRef, 
    private _toastS: ToastService, 
    private _spinnerS: LoadingSpinnerService
  ) { }

  submit(): void {
    this.form.markAsPending()
    this.showSpinner = true

    const item: Item_Post = new Item_Post(this.name.value ?? '', this.measurement_type_id.value ?? 0)

    let action: Observable<Item>
    if(this.itemToEdit) {
      action = this._appS.item_update(this.itemToEdit.id, item).pipe(tap(item => {
        this.itemUpdated.emit(item)
        this._toastS.createToast({type: 'success', message: 'Item actualizado'})
      }))
    } else {
      action = this._appS.item_store(item).pipe(tap(item => {
        this.itemCreated.emit(item)
        this._toastS.createToast({type: 'success', message: 'Item creado'})
      }))
    }

    this.actionSubs = action
      .pipe(tap({ finalize: () => {
        this.showSpinner = false
        this._cd.detectChanges()
      }}))
      .subscribe({ error: error => {
        const responseErrors:{[key:string]:string[]} = error.error?.errors
        if(!responseErrors) return

        for(let error in responseErrors) {
          const control = this.form.get(error)
          control?.setErrors({serverErrorMessage: responseErrors[error][0]})
          control?.markAsTouched()
        }
      }})
  }

  deleteItem(id: number): void {
    this._spinnerS.show()
    this.deleteSubs = this._appS.item_delete(id)
    .pipe( tap({finalize: () => this._spinnerS.hide()}) )
    .subscribe(() => {
      this.itemDeleted.emit(id)
      this._toastS.createToast({type: 'success', message: 'Item eliminado'})
    })
  }

  ngOnInit(): void {
    if(this.itemToEdit) {
      this.name.setValue(this.itemToEdit.name)
      this.measurement_type_id.setValue(this.itemToEdit.measurement_type_id)
    }
  }

  ngOnDestroy(): void {
    this.actionSubs?.unsubscribe()
    this.deleteSubs?.unsubscribe()
  }

  onClose() {
    this.close.emit()
  }
}
