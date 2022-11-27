import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Itemable } from 'src/app/models/Itemable';

@Component({
  selector: 'app-itemable-show',
  templateUrl: './itemable-show.component.html',
  styleUrls: ['./itemable-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemableShowComponent implements OnInit {

  @Input('itemable') itemable!: Itemable

  constructor() { }

  ngOnInit(): void {
  }

}
