import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { makeItemablePostFromItem } from 'src/app/helpers';
import { Day } from 'src/app/models/Day';
import { Itemable_Post } from 'src/app/models/Itemable';
import { AppService } from 'src/app/services/app.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-day-show',
  templateUrl: './day-show.component.html',
  styleUrls: ['./day-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayShowComponent implements OnDestroy {
  @Input('day') day!: Day

  showSelectList: boolean = false

  private addItemSubs?: Subscription
  constructor(private _appS: AppService, private _toastS: ToastService) { }

  addItemsToList(listId: number) {
    const itemsToAdd: Itemable_Post[] = []

    const dayTrail = this.day.name
    const sections = this.day.day_sections

    sections.forEach(section => {    
      // section items
      const sectionItems = section.items
      const sectionTrail = dayTrail+' / '+section.name
      sectionItems.forEach(item => itemsToAdd.push(makeItemablePostFromItem(item, sectionTrail)))
  
      // dishes
      const dishes = section.dishes
      dishes.forEach(dish => {
        const trail = sectionTrail+' / '+dish.name
        const items = dish.items
        items.forEach(item => itemsToAdd.push(makeItemablePostFromItem(item, trail)))
      })
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
