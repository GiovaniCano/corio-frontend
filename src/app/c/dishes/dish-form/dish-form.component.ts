import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, take } from 'rxjs';
import { sortObjectsArray } from 'src/app/helpers';
import { Dish, Dish_Post } from 'src/app/models/Dish';
import { Item } from 'src/app/models/Item';
import { Itemable_Post } from 'src/app/models/Itemable';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';
import { AppService } from 'src/app/services/app.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishFormComponent implements OnInit, OnDestroy {
  private _items = new BehaviorSubject<Item[]>([])
  items$ = this._items.asObservable()

  get currentItems() { return this._items.getValue() }

  dishId?: number
  dishName?: string

  preloadedItems!: Item[]
  units!: MeasurementUnit[]

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(25)])
  })
  get name() { return this.form.controls.name }


  showSpinner: boolean = false

  showAddItemModal: boolean = false
  showUpdateItemModal: boolean = false
  showConfirmDeleteDishModal: boolean = false

  private itemsIndexSubs!: Subscription
  private unitsSubs!: Subscription
  private actionSubs?: Subscription
  private deleteDishSubs?: Subscription

  itemToEdit?: Item

  constructor(
    private _route: ActivatedRoute, 
    private _appS: AppService, 
    private _router: Router, 
    private _toastS: ToastService, 
    private _cd: ChangeDetectorRef
  ) { }

  submit() {
    this.showSpinner = true
    this.form.markAsPending()

    const items: Itemable_Post[] = this._items.getValue().map(item => {
      return {
        item_id: item.id,
        quantity: item.pivot!.quantity,
        measurement_unit_id: item.pivot!.measurement_unit.id
      }
    })

    const data: Dish_Post = new Dish_Post(this.name.value ?? '', items)

    let action: Observable<any>
    if(this.dishId) {
      action = this._appS.dish_update(this.dishId, data)
    } else {
      action = this._appS.dish_store(data)
    }

    this.actionSubs = action.subscribe({
      next: () => {
        this._router.navigate(['/dishes'])
        this._toastS.createToast({
          message: this.dishId ? 'Platillo actualizado' : 'Platillo creado',
          type: 'success'
        })
      },
      error: error => {
        this.showSpinner = false
        this._cd.detectChanges()

        const responseErrors:{[key:string]:string[]} = error.error?.errors
        if(!responseErrors) return

        for(let error in responseErrors) {          
          const control = this.form.get(error)
          control?.setErrors({serverErrorMessage: responseErrors[error][0]})
          control?.markAsTouched()
        }
      }
    })
  }

  deleteDish() {
    const id = this.dishId!
    this.deleteDishSubs = this._appS.dish_delete(id).subscribe(() => {
      this._router.navigate(['/dishes'])
      this._toastS.createToast({
        message: 'Platillo eliminado',
        type: 'success'
      })
    })
  }

  addItem(item: Item) {
    const currentItems = this._items.getValue()
    this._items.next( sortObjectsArray([...currentItems, item]) )
    this.form.updateValueAndValidity()
  }
  updateItem(updatedItem: Item) {
    const currentItems = this._items.getValue()
    this._items.next( sortObjectsArray(currentItems.map(item => item.id === updatedItem.id ? updatedItem : item)) )
    this.showUpdateItemModal = false
    this.form.updateValueAndValidity()
  }
  removeItem(id: number) {
    const currentItems = this._items.getValue()
    this._items.next(currentItems?.filter(item => item.id !== id))
    this.form.updateValueAndValidity()
  }

  editItemInModal(item: Item) {
    this.itemToEdit = item
    this.showUpdateItemModal = true
  }

  updatePreloadedItems(items: Item[]) {
    this.preloadedItems = items
  }

  ngOnInit(): void {
    this._route.data.pipe(take(1)).subscribe(data => {
      const dish: Dish | undefined = data['dish']
      if(dish) {
        this.name.setValue(dish.name)
        this._items.next(dish.items)
        this.dishId = dish.id
        this.dishName = dish.name
      }
    })

    this.itemsIndexSubs = this._appS.item_index().subscribe(items => this.preloadedItems = items)

    this.unitsSubs = this._appS.measurementUnit_index().subscribe(units => this.units = units)
  }

  ngOnDestroy(): void {
    this.itemsIndexSubs.unsubscribe()
    this.unitsSubs.unsubscribe()
    this.actionSubs?.unsubscribe()
    this.deleteDishSubs?.unsubscribe()
  }
}
