import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
