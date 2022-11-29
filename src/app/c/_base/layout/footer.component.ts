import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <p class="text-center m-0 py-4 mt-3">
        <span class="h5 arial">© </span>2022 {{ appName }}. Todos los derechos reservados.
      </p>
    </footer>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  appName: string = environment.APP_NAME

  constructor() { }

  ngOnInit(): void {
  }

}
