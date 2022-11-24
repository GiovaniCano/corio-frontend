import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MobileMenuService } from 'src/app/services/mobile-menu.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileMenuComponent {

  constructor(private _mobileMenuS: MobileMenuService) { }

  hideMobileMenu() {
    this._mobileMenuS.hide()
  }
}
