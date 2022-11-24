import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-days-index',
  templateUrl: './days-index.component.html',
  styleUrls: ['./days-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysIndexComponent {
  test$ = this._http.get(environment.API_URL + 'auth-status').pipe(
    tap({ finalize: () => this._loadingS.hide() })
  )

  constructor(private _http: HttpClient, private _loadingS: LoadingSpinnerService) {
    this._loadingS.show()
  }

}
