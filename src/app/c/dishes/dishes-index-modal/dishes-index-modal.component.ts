import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, fromEvent, map, Observable, startWith} from 'rxjs';
import { Dish } from 'src/app/models/Dish';

@Component({
  selector: 'app-dishes-index-modal',
  templateUrl: './dishes-index-modal.component.html',
  styleUrls: ['./dishes-index-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishesIndexModalComponent implements OnInit, AfterViewInit {
  @Input() initialDishes!: Dish[]
  @Input() currentDishes!: Dish[]

  @Output() close = new EventEmitter<void>()
  @Output() dishAdded = new EventEmitter<Dish>()

  private _dishes = new BehaviorSubject<Dish[]>([])
  dishes: Observable<Dish[]> = this._dishes.asObservable()

  @ViewChild('searchBar') searchBar!: ElementRef

  filteredDishes$!: Observable<Dish[]>

  constructor(private _cd: ChangeDetectorRef) { }

  selectDish(dish: Dish) {
    this.dishAdded.emit(dish)
  }

  alreadySelected(dish: Dish) {
    const currentDishes = this.currentDishes.map(dish => dish.id)
    return currentDishes.includes(dish.id)
  }

  ngAfterViewInit(): void {
    const filter$: Observable<string> = fromEvent<Event>(this.searchBar.nativeElement, 'input')
      .pipe(
        map( ({target}) => (target as HTMLInputElement).value ),
        startWith(''),
      )

    /* filtered */
    this.filteredDishes$ = combineLatest(
      [this.dishes, filter$],
      (dishes, search) => dishes.filter(dish => dish.name.toLowerCase().includes(search.toLowerCase()))
    )

    this._cd.detectChanges()
  }
  
  ngOnInit(): void {
    this._dishes.next(this.initialDishes)
  }

  onClose() {
    this.close.emit()
  }
}
