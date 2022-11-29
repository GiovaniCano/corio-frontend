import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-list-itemable',
  templateUrl: './list-itemable.component.html',
  styleUrls: ['./list-itemable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemableComponent implements OnInit {
  @Input() item!: Item

  constructor() { }

  ngOnInit(): void {
  }

}
