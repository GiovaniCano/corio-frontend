import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-item-show',
  templateUrl: './item-show.component.html',
  styleUrls: ['./item-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemShowComponent {

  @Input() item!: Item

  @Output() itemUpdated = new EventEmitter<Item>()
  @Output() itemDeleted = new EventEmitter<number>()

  showEditItemModal: boolean = false

  constructor() { }

  updateItem(updatedItem: Item) {
    this.itemUpdated.emit(updatedItem)
  }
  deleteItem(id: number) {
    this.itemDeleted.emit(id)
  }
}
