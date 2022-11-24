import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-actions',
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderActionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
