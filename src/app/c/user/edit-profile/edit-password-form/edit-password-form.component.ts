import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-password-form',
  templateUrl: './edit-password-form.component.html',
  styleUrls: ['./edit-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPasswordFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
