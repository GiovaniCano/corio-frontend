import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-not-found',
  template: `
    <div id="content" class="content-center mx-auto">
      
      <h1 class="h2">Página no encontrada</h1>

      <p *ngIf="(auth$|async); else guest" class="text-center fs-5">Ir a <a routerLink="/" class="text-reset">Inicio</a>.</p>

      <ng-template #guest>
        <p class="text-center fs-5">Ir a <a routerLink="/login" class="text-reset">Iniciar sesión</a>.</p>
      </ng-template>

    </div>
  `,
  styles: [`
      
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  auth$ = this._authS.auth$

  constructor(private _authS: AuthService) { }
}
