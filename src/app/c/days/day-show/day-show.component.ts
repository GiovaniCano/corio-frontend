import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Day } from 'src/app/models/Day';

@Component({
  selector: 'app-day-show',
  templateUrl: './day-show.component.html',
  styleUrls: ['./day-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayShowComponent implements OnInit {

  @Input('day') day!: Day

  constructor() { }

  ngOnInit(): void {
  }

}
