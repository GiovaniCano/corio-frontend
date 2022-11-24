import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MobileMenuService } from 'src/app/services/mobile-menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMobileComponent {
  appName:string = environment.APP_NAME

  constructor(private _mobileMenuS: MobileMenuService) { }

  showMobileMenu() {
    this._mobileMenuS.show()
  }
}
