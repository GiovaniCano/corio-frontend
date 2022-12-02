import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { sortObjectsArray } from 'src/app/helpers';
import { Item } from 'src/app/models/Item';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';
import { AppService } from 'src/app/services/app.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

@Component({
  selector: 'app-items-index',
  templateUrl: './items-index.component.html',
  styleUrls: ['./items-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsIndexComponent implements OnInit, OnDestroy {
  private _items = new BehaviorSubject<Item[]>([])
  items$ = this._items.asObservable()

  units!: MeasurementUnit[]

  showUnitsModal: boolean = false
  showCreateItemModal: boolean = false

  unitsSubs!: Subscription
  itemsSubs!: Subscription

  constructor(private _appS: AppService, private _loadingS: LoadingSpinnerService) {
    this._loadingS.show()
  }

  ngOnInit(): void {
    this.unitsSubs =  this._appS.measurementUnit_index().subscribe(units => this.units = units)
    this.itemsSubs = this._appS.item_index().pipe(tap({ finalize: () => this._loadingS.hide() })).subscribe(items => this._items.next(items))
  }

  ngOnDestroy(): void {
    this.unitsSubs.unsubscribe()
    this.itemsSubs.unsubscribe()
  }

  createItem(item: Item) {
    const currentItems = this._items.getValue()
    this._items.next( sortObjectsArray([...currentItems, item]) )
    this.showCreateItemModal = false
  }
  updateItem(updatedItem: Item) {
    const currentItems = this._items.getValue()
    this._items.next( sortObjectsArray(currentItems.map(item => item.id === updatedItem.id ? updatedItem : item)) )
  }
  deleteItem(id: number) {
    const currentItems = this._items.getValue()
    this._items.next(currentItems?.filter(item => item.id !== id))
  }
}
