import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subscription, take, tap } from 'rxjs';
import { sortObjectsArray } from 'src/app/helpers';
import { Item } from 'src/app/models/Item';
import { Itemable_Post } from 'src/app/models/Itemable';
import { List, List_Post } from 'src/app/models/List';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';
import { AppService } from 'src/app/services/app.service';
import { ToastService } from 'src/app/services/toast.service';
import { SelectListService } from 'src/app/services/select-list.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFormComponent implements OnInit, OnDestroy {
  private _items = new BehaviorSubject<Item[]>([])
  items$: Observable<(Item | Item[])[]> = this._items.asObservable().pipe(
    map( items => sortObjectsArray(items) ),
    map( (items: Item[]) => this.groupItems(items))
  )

  get currentItems() { return this._items.getValue() }

  listId?: number
  listName?: string
 
  preloadedItems!: Item[]
  preloadedUnits!: MeasurementUnit[]

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(25)])
  })
  get name() { return this.form.controls.name }

  showSpinner: boolean = false

  showAddItemModal: boolean = false
  showUpdateItemModal: boolean = false
  showConfirmDeleteListModal: boolean = false

  private itemsIndexSubs!: Subscription
  private unitsSubs!: Subscription
  private actionSubs?: Subscription
  private deleteListSubs?: Subscription

  itemToEdit?: Item

  constructor(
    private _route: ActivatedRoute, 
    private _appS: AppService, 
    private _router: Router, 
    private _toastS: ToastService, 
    private _cd: ChangeDetectorRef,
    private _selectListS: SelectListService
  ) { }

  submit() {
    this.showSpinner = true
    this.form.markAsPending()

    const items: Itemable_Post[] = this._items.getValue().map(item => {
      return {
        item_id: item.id,
        quantity: item.pivot!.quantity,
        measurement_unit_id: item.pivot!.measurement_unit.id,
        trail: item.pivot!.trail!.trail
      }
    })

    const data: List_Post = new List_Post(this.name.value ?? '', items)

    let action: Observable<any>
    if(this.listId) {
      action = this._appS.list_update(this.listId, data).pipe(tap(list => this._selectListS.updateList(list)))
    } else {
      action = this._appS.list_store(data).pipe(tap(list => this._selectListS.addList(list)))
    }

    this.actionSubs = action.subscribe({
      next: () => {
        this._toastS.createToast({
          message: this.listId ? 'Lista actualizada' : 'Lista creada',
          type: 'success'
        })
        this._router.navigate(['/lists'])
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

  deleteList() {
    const id = this.listId!
    this.deleteListSubs = this._appS.list_delete(id).subscribe(() => {
      this._selectListS.removeList(id)

      this._toastS.createToast({
        message: 'Lista eliminada',
        type: 'success'
      })

      this._router.navigate(['/lists'])
    })
  }

  addItem(item: Item) {
    this._items.next( [...this.currentItems, item] )
    this.form.updateValueAndValidity()
  }
  updateItem(updatedItem: Item) {
    this._items.next( this.currentItems.map(item => {
      const updatedItem_pivot = updatedItem.pivot!
      const currentItem_pivot = item.pivot!

      if(updatedItem_pivot.id) {
        return updatedItem_pivot.id === currentItem_pivot.id ? updatedItem : item
      } else {
        return updatedItem_pivot.ngId === currentItem_pivot.ngId ? updatedItem : item
      }
    }) )
    this.showUpdateItemModal = false
    this.form.updateValueAndValidity()
  }
  removeItem(itemToDelete: Item) {
    this._items.next( this.currentItems?.filter(item => {
      const itemToDelete_pivot = itemToDelete.pivot!
      const currentItem_pivot = item.pivot!

      if(itemToDelete_pivot.id) {
        return itemToDelete_pivot.id !== currentItem_pivot.id
      } else {
        return itemToDelete_pivot.ngId !== currentItem_pivot.ngId
      }
    }) )
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
      const list: List | undefined = data['list']
      if(list) {
        this.name.setValue(list.name)
        this._items.next(list.items)
        this.listId = list.id
        this.listName = list.name
      }
    })

    this.itemsIndexSubs = this._appS.item_index().subscribe(items => this.preloadedItems = items)

    this.unitsSubs = this._appS.measurementUnit_index().subscribe(units => this.preloadedUnits = units)
  }

  private groupItems(items: Item[]): (Item | Item[])[] {
    const grouped: Item[][] = []

    items.forEach(item => {
      const foundedIndex = grouped.findIndex(el => el[0].id === item.id)
      if(foundedIndex !== -1) {
        grouped[foundedIndex].push(item)
      } else {
        grouped.push([item])
      }
    })

    const cleanGroup = grouped.map(item => item.length > 1 ? item : item[0])
    return cleanGroup
  }

  ngOnDestroy(): void {
    this.itemsIndexSubs.unsubscribe()
    this.unitsSubs.unsubscribe()
    this.actionSubs?.unsubscribe()
    this.deleteListSubs?.unsubscribe()
  }
}
