import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <p class="text-center m-0 py-4 mt-3">
        <span class="h5 arial">© </span>2022 Corio. Todos los derechos reservados.
      </p>
    </footer>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
