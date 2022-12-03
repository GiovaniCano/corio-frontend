import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-itemable-show',
  templateUrl: './itemable-show.component.html',
  styleUrls: ['./itemable-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemableShowComponent {
  @Input() item!: Item
  @Input() edit: boolean = false

  @Output() editClick = new EventEmitter<void>()
  @Output() deleteClick = new EventEmitter<void>()

  constructor() { }

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
}
