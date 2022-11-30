import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-list-itemable',
  templateUrl: './list-itemable.component.html',
  styleUrls: ['./list-itemable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemableComponent implements OnInit {
  @Input() item!: Item | Item[]
  @Input() showTrails!: boolean

  Array = Array

  constructor() { }

  ngOnInit(): void {
  }

  total(items: Item[]): number {
    const quantities = items.map(item => Number(item.pivot!.quantity))
    const total = quantities.reduce((pV, cV) => pV + cV)
    return total
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
