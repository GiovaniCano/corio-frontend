import { Injectable } from '@angular/core';
import { fromEvent, map, Observable, startWith } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private windowWidth$: Observable<number> = fromEvent(window, 'resize')
    .pipe(
      startWith(window.innerWidth), 
      map(() => window.innerWidth)
    )

  private breakpoints = {
    sm:	576,
    md:	768,
    lg:	992,
    xl:	1200,
    xxl: 1400,
  }

  constructor() { }

  media_breakpoint_up(breakpoint: 'sm'|'md'|'lg'|'xl'|'xxl'): Observable<boolean> {
    return this.windowWidth$.pipe(map(width => width > this.breakpoints[breakpoint]))
  }
}
