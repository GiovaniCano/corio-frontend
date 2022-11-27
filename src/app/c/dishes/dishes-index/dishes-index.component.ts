import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

@Component({
  selector: 'app-dishes-index',
  templateUrl: './dishes-index.component.html',
  styleUrls: ['./dishes-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishesIndexComponent {
  dishes$ = this._corioS.dish_index().pipe(tap({ finalize: () => this._loadingS.hide() }))

  constructor(private _corioS: AppService, private _loadingS: LoadingSpinnerService) {
    this._loadingS.show()
  }

}
