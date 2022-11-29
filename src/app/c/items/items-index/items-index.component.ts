import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';
import { AppService } from 'src/app/services/app.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

@Component({
  selector: 'app-items-index',
  templateUrl: './items-index.component.html',
  styleUrls: ['./items-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsIndexComponent implements OnInit, OnDestroy {
  items$ = this._appS.item_index().pipe(tap({ finalize: () => this._loadingS.hide() }))
  units!: MeasurementUnit[]

  showUnitsModal: boolean = false

  unitsSubs!: Subscription

  constructor(private _appS: AppService, private _loadingS: LoadingSpinnerService) {
    this._loadingS.show()
  }

  ngOnInit(): void {
    this.unitsSubs =  this._appS.measurementUnit_index().subscribe(units => this.units = units)
  }

  ngOnDestroy(): void {
    this.unitsSubs.unsubscribe()
  }
}
