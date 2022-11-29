import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-lists-index',
  templateUrl: './lists-index.component.html',
  styleUrls: ['./lists-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListsIndexComponent {
  sm$: Observable<boolean> = this._responsiveS.media_breakpoint_up('sm')

  lists$ = this._appS.list_index().pipe(tap({ finalize: () => this._loadingS.hide() }))

  showListsModal: boolean = false
  currentListOnMobile: number = 0
  showTrails: boolean = false

  constructor(private _appS: AppService, private _responsiveS: ResponsiveService, private _loadingS: LoadingSpinnerService) {
    this._loadingS.show()
  }

  toggleTrails() {
    this.showTrails = !this.showTrails
  }

}
