import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/models/List';

@Component({
  selector: 'app-list-show',
  templateUrl: './list-show.component.html',
  styleUrls: ['./list-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListShowComponent implements OnInit {
  @Input() list!: List

  constructor() { }

  ngOnInit(): void {
  }

}
