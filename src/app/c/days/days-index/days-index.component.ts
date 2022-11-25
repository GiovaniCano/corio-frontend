import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private _responsiveS: ResponsiveService, private _loadingS: LoadingSpinnerService) { }

}
