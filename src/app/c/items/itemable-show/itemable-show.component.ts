import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { makeItemablePostFromItem } from 'src/app/helpers';
import { Item } from 'src/app/models/Item';
import { AppService } from 'src/app/services/app.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-itemable-show',
  templateUrl: './itemable-show.component.html',
  styleUrls: ['./itemable-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemableShowComponent implements OnDestroy {
  @Input() item!: Item
  @Input() edit: boolean = false
  @Input() noAddBtn: boolean = false

  @Input() trail!: string

  @Output() editClick = new EventEmitter<void>()
  @Output() deleteClick = new EventEmitter<void>()

  showSelectList: boolean = false

  private addItemSubs?: Subscription

  constructor(private _appS: AppService, private _toastS: ToastService) { }

  addItemToList(listId: number) {
    this.addItemSubs = this._appS.list_addItems(listId, [makeItemablePostFromItem(this.item, this.trail)]).subscribe({
      next: () => this._toastS.createToast({
        message: 'Item añadido',
        type: 'success'
      }),
      error: () => this._toastS.createToast({
        message: 'Hubo un error al añadir a la lista',
        type: 'danger'
      }),
    })
  }

  addClicked() {
    this.showSelectList = true
  }

  editClicked() {
    this.editClick.emit()
  }
  deleteClicked() {
    this.deleteClick.emit()
  }

  getUnitAbbreviationOrName(item: Item) {
    const abbreviation = item.pivot?.measurement_unit?.abbreviation 
    if(abbreviation) {
      return item.pivot?.measurement_unit?.abbreviation       
    }

    const name = item.pivot?.measurement_unit?.measurement_type?.name
    return name === 'Unidad' ? '' : name
  }

  ngOnDestroy(): void {
    this.addItemSubs?.unsubscribe()
  }
}
