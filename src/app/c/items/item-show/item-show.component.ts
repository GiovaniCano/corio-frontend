import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Itemable } from 'src/app/models/Itemable';

@Component({
  selector: 'app-item-show',
  templateUrl: './item-show.component.html',
  styleUrls: ['./item-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemShowComponent implements OnInit {

  @Input('itemable') itemable!: Itemable

  constructor() { }

  ngOnInit(): void {
  }

}
