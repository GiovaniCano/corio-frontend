import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-days-index',
  templateUrl: './days-index.component.html',
  styleUrls: ['./days-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysIndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
