import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-list-itemable',
  templateUrl: './list-itemable.component.html',
  styleUrls: ['./list-itemable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemableComponent {
  @Input() item!: Item | Item[]
  @Input() showTrails!: boolean

  @Input() edit: boolean = false

  @Output() clickEdit = new EventEmitter<Item>()
  @Output() clickDelete = new EventEmitter<Item>()

  Array = Array

  constructor() { }

  onClickEdit(item: Item) {
    this.clickEdit.emit(item)
  }
  onClickDelete(item: Item) {
    this.clickDelete.emit(item)
  }

  total(items: Item[]): number {
    const quantities = items.map(item => {
      if(item.pivot!.measurement_unit.convertion) {
        return Number(item.pivot!.quantity * item.pivot!.measurement_unit.convertion)
      } else {
        return Number(item.pivot!.quantity)
      }
    })

    const total = quantities.reduce((pV, cV) => pV + cV)

    return total
  }
  transformTotalToConvenientUnit(total: number, itemToGetType: Item): number {
    if(itemToGetType.measurement_type.name === 'Unidad') return Number(total.toFixed(2))

    return total >= 1000 ? Number((total / 1000).toFixed(2)) : Number(total.toFixed(2))
  }

  getUnitAbbreviationOrName(item: Item, total?: number) {
    if(total) {
      const type = item.measurement_type.name
      if(type === 'Unidad') return ''
      if(type === 'Peso') return total >= 1000 ? 'kg' : 'g'
      if(type === 'Volumen') return total >= 1000 ? 'L' : 'mL'
    }

    const abbreviation = item.pivot?.measurement_unit?.abbreviation 
    if(abbreviation) {
      return item.pivot?.measurement_unit?.abbreviation       
    }

    const name = item.pivot?.measurement_unit?.measurement_type?.name
    return name === 'Unidad' ? '' : name
  }

}
