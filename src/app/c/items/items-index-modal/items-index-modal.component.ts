import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, fromEvent, map, Observable, startWith} from 'rxjs';
import { sortObjectsArray } from 'src/app/helpers';
import { Item } from 'src/app/models/Item';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';

@Component({
  selector: 'app-items-index-modal',
  templateUrl: './items-index-modal.component.html',
  styleUrls: ['./items-index-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ItemsIndexModalComponent implements OnInit, AfterViewInit {
  @Input() initialItems!: Item[]
  @Input() currentItems!: Item[]
  @Input() units!: MeasurementUnit[]

  @Output() close = new EventEmitter<void>()
  @Output() itemAdded = new EventEmitter<Item>()
  @Output() itemsUpdated = new EventEmitter<Item[]>()

  private _items = new BehaviorSubject<Item[]>([])
  items$: Observable<Item[]> = this._items.asObservable()

  @ViewChild('searchBar') searchBar!: ElementRef

  filteredItems$!: Observable<Item[]>

  showItemableFormModal: boolean = false
  showCreateItemModal: boolean = false

  selectedItem?: Item

  constructor(private _cd: ChangeDetectorRef) { }

  createItem(item: Item) {
    const currentItems = this._items.getValue()
    this._items.next( sortObjectsArray([...currentItems, item]) )
    this.showCreateItemModal = false
    this.itemsUpdated.emit(this._items.getValue())
  }

  onItemAdded(item: Item) {
    this.itemAdded.emit(item)
    this.showItemableFormModal = false
  }

  selectItem(item: Item) {
    this.selectedItem = item
    this.showItemableFormModal = true
  }

  alreadySelected(item: Item) {
    const currentItems = this.currentItems.map(item => item.id)
    return currentItems.includes(item.id)
  }

  ngAfterViewInit(): void {
    const filter$: Observable<string> = fromEvent<Event>(this.searchBar.nativeElement, 'input')
      .pipe(
        map( ({target}) => (target as HTMLInputElement).value ),
        startWith(''),
      )

    /* filtered */
    this.filteredItems$ = combineLatest(
      [this.items$, filter$],
      (items, search) => items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    )

    this._cd.detectChanges()
  }
  
  ngOnInit(): void {
    this._items.next(this.initialItems)
  }

  onClose() {
    this.close.emit()
  }
}
