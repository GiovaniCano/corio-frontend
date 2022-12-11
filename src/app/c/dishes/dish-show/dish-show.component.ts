import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { makeItemablePostFromItem } from 'src/app/helpers';
import { Dish } from 'src/app/models/Dish';
import { AppService } from 'src/app/services/app.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dish-show',
  templateUrl: './dish-show.component.html',
  styleUrls: ['./dish-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishShowComponent implements OnDestroy {
  @Input() dish!: Dish
  @Input() editBtn: boolean = false
  @Input() noAddBtn: boolean = false

  @Input() trail?: string

  @Output() deleteClicked = new EventEmitter<number>()

  showSelectList: boolean = false

  private addItemSubs?: Subscription

  constructor(private _appS: AppService, private _toastS: ToastService) { }

  addItemsToList(listId: number) {
    const trail = this.trail ? this.trail+' / '+this.dish.name : this.dish.name
    const dishItems = this.dish.items

    const itemsToAdd = dishItems.map(item => makeItemablePostFromItem(item, trail))

    this.addItemSubs = this._appS.list_addItems(listId, itemsToAdd).subscribe({
      next: () => this._toastS.createToast({
        message: 'Items añadidos',
        type: 'success'
      }),
      error: () => this._toastS.createToast({
        message: 'Hubo un error al añadir a la lista',
        type: 'danger'
      }),
    })
  }

  onDeleteClicked() {
    this.deleteClicked.emit(this.dish.id)
  }

  ngOnDestroy(): void {
    this.addItemSubs?.unsubscribe()
  }
}
