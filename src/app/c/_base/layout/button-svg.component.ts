import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-svg',
  template: `
    <button class="btn-no-style">
      <svg *ngIf="type === 'edit'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
        <line x1="16" y1="5" x2="19" y2="8" />
      </svg>

      <svg *ngIf="type === 'add'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="9" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="12" y1="9" x2="12" y2="15" />
      </svg>
    </button>
  `,
  styles: [
    'button { width:40px; height: 40px; padding: 4px }',
    'svg { width:100%; height: 100%; }',
    ':host { display: block; cursor: pointer; }'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonSvgComponent {

  @Input('type') type!:'edit'|'add'

  constructor() { }

}
