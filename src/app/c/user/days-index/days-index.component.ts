import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-days-index',
  templateUrl: './days-index.component.html',
  styleUrls: ['./days-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysIndexComponent implements OnInit {
  test$ = this._http.get(environment.API_URL+'auth-status')

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
  }

}
