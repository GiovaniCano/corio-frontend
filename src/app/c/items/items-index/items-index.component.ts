import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

@Component({
  selector: 'app-items-index',
  templateUrl: './items-index.component.html',
  styleUrls: ['./items-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsIndexComponent {
  items$ = this._corioS.item_index().pipe(tap({ finalize: () => this._loadingS.hide() }))

  constructor(private _corioS: AppService, private _loadingS: LoadingSpinnerService) {
    this._loadingS.show()
  }
}
