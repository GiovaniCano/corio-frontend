import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { makeItemablePostFromItem } from 'src/app/helpers';
import { DaySection } from 'src/app/models/DaySection';
import { Itemable_Post } from 'src/app/models/Itemable';
import { AppService } from 'src/app/services/app.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-day-section-show',
  templateUrl: './day-section-show.component.html',
  styleUrls: ['./day-section-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaySectionShowComponent implements OnDestroy {

  @Input('daySection') daySection!: DaySection

  @Input() trail!: string

  showSelectList: boolean = false

  private addItemSubs?: Subscription

  constructor(private _appS: AppService, private _toastS: ToastService) { }

  addItemsToList(listId: number) {
    const itemsToAdd: Itemable_Post[] = []
    
    // section items
    const sectionItems = this.daySection.items
    const sectionTrail = this.trail+' / '+this.daySection.name
    sectionItems.forEach(item => itemsToAdd.push(makeItemablePostFromItem(item, sectionTrail)))

    // dishes
    const dishes = this.daySection.dishes
    dishes.forEach(dish => {
      const trail = sectionTrail+' / '+dish.name
      const items = dish.items
      items.forEach(item => itemsToAdd.push(makeItemablePostFromItem(item, trail)))
    })

    // add
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

  ngOnDestroy(): void {
    this.addItemSubs?.unsubscribe()
  }
}
