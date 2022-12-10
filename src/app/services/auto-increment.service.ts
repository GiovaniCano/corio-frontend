import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoIncrementService {

  private id: number = 1

  getId(): number {
    return this.id++
  }

}
