import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DaySection } from 'src/app/models/DaySection';

@Component({
  selector: 'app-day-section-show',
  templateUrl: './day-section-show.component.html',
  styleUrls: ['./day-section-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaySectionShowComponent implements OnInit {

  @Input('daySection') daySection!: DaySection

  constructor() { }

  ngOnInit(): void {
  }

}
