import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-guest',
  template: `
    <p class="text-center m-0 py-4 mt-3">
      <span class="h5 arial">© </span>Todos los derechos reservados.
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterGuestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
