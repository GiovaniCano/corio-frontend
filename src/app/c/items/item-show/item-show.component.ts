import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-item-show',
  templateUrl: './item-show.component.html',
  styleUrls: ['./item-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemShowComponent implements OnInit {

  @Input() item!: Item

  constructor() { }

  ngOnInit(): void {
  }

}
