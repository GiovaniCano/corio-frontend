import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sortObjectsArray } from 'src/app/helpers';
import { DaySection } from 'src/app/models/DaySection';
import { Dish } from 'src/app/models/Dish';
import { Item } from 'src/app/models/Item';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-day-section-edit',
  templateUrl: './day-section-edit.component.html',
  styleUrls: ['./day-section-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaySectionEditComponent implements OnInit {
  @Input() section!: DaySection
  
  @Input() preloadedDishesIndex!: Dish[]
  @Input() preloadedItemsIndex!: Item[]
  @Input() preloadedUnits!: MeasurementUnit[]

  @Output() deleteClicked = new EventEmitter<void>()
  @Output() sectionUpdated = new EventEmitter<DaySection>()

  private _dishes = new BehaviorSubject<Dish[]>([])
  private _items = new BehaviorSubject<Item[]>([])
  dishes$ = this._dishes.asObservable()  
  items$ = this._items.asObservable()

  get currentItems() { return this._items.getValue() }
  get currentDishes() { return this._dishes.getValue() }

  itemToEdit?: Item

  showAddItemModal: boolean = false
  showAddDishModal: boolean = false
  showUpdateItemModal: boolean = false
  showConfirmDeleteSectionModal: boolean = false

  constructor(private _toastS: ToastService) { }

  addDish(dish :Dish) {
    const currentDishes = this._dishes.getValue()
    this._dishes.next( sortObjectsArray([...currentDishes, dish]) )
    this.emitSectionUpdated()
    this._toastS.createToast({
      message: 'Platillo añadido',
      type: 'success',
    })
  }
  removeDish(id: number) {
    const currentDishes = this._dishes.getValue()
    this._dishes.next(currentDishes?.filter(dish => dish.id !== id))
    this.emitSectionUpdated()
  }

  addItem(item: Item) {
    const currentItems = this._items.getValue()
    this._items.next( sortObjectsArray([...currentItems, item]) )
    this.emitSectionUpdated()
  }
  updateItem(updatedItem: Item) {
    const currentItems = this._items.getValue()
    this._items.next( sortObjectsArray(currentItems.map(item => item.id === updatedItem.id ? updatedItem : item)) )
    this.showUpdateItemModal = false
    this.emitSectionUpdated()
  }
  removeItem(id: number) {
    const currentItems = this._items.getValue()
    this._items.next(currentItems.filter(item => item.id !== id))
    this.emitSectionUpdated()
  }

  editItemInModal(item: Item) {
    this.itemToEdit = item
    this.showUpdateItemModal = true
  }
  updatePreloadedItems(items: Item[]) {
    this.preloadedItemsIndex = items
  }
  
  private emitSectionUpdated(): void {
    const section = this.section
    section.dishes = this._dishes.getValue()
    section.items = this._items.getValue()
    this.sectionUpdated.emit(section)
  }
  emitDeleteSection() {
    this.deleteClicked.emit()
  }

  ngOnInit(): void {
    this._dishes.next(this.section.dishes)
    this._items.next(this.section.items)
  }
}