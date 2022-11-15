import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-guest',
  template: `
    <header class="py-3">
      <h1 class="text-center m-0">
        {{title}}
      </h1>
    </header>
  `,
  styles: [
    `
      :host {
        /* background-color: yellow; */
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderGuestComponent {
  title = environment.APP_NAME

  constructor() { }
}
