import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: number = 0

  constructor() { }

  modalOpened(): void {
    this.modals++
    // console.log(this.modals)
  }

  modalClosed(): void {
    this.modals--
    // console.log(this.modals)
  }

  checkModalExistence():boolean {
    return this.modals ? true : false
  }
}
