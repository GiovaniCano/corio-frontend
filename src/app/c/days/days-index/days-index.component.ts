import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-days-index',
  templateUrl: './days-index.component.html',
  styleUrls: ['./days-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysIndexComponent {
  sm$: Observable<boolean> = this._responsiveS.media_breakpoint_up('sm')

  days$ = this._corioS.day_index().pipe(tap({ finalize: () => this._loadingS.hide() }))

  showDaysModal: boolean = false
  currentDayOnMobile: number = 0

  constructor(private _corioS: AppService, private _responsiveS: ResponsiveService, private _loadingS: LoadingSpinnerService) {
    this._loadingS.show()
  }

}
