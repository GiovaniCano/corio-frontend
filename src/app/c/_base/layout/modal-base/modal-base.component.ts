import { AfterContentChecked, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, QueryList, Renderer2 } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalBaseComponent implements OnInit, OnDestroy, AfterContentChecked {

  @Output('close') onClose = new EventEmitter<void>()

  @HostListener('window:keydown.escape') escapeKey() { this.close() }
  // @HostListener('click', ['$event']) onClick(event:Event): void { this.close(event) }

  @ContentChildren('closeModalBtn',{descendants:true}) contentCloseButtons?: QueryList<ElementRef>

  private body  = document.body

  constructor(private _modalS: ModalService, private _render:Renderer2) { }

  close(event?:Event) {
    if(event?.target === event?.currentTarget) {
      this.onClose.emit()
      // console.log('close')
    }
    // if event, the event is triggered only by the bound element
    // if !event, (undefined === undefined) = true, it triggers everywhere (children)
  }

  ngAfterContentChecked(): void {
    this.contentCloseButtons?.forEach(contentCloseButton => {
      const btn = contentCloseButton.nativeElement as HTMLButtonElement
      this._render.listen(btn, 'click', e => this.close())
    })
  }

  ngOnInit(): void {
    this._modalS.modalOpened()
    if(this._modalS.checkModalExistence()) {
      this.disableBodyScroll()
    }
  }

  ngOnDestroy(): void {
    this._modalS.modalClosed()

    if(!this._modalS.checkModalExistence()) {
      this.enableBodyScroll()
    }
  }

  private disableBodyScroll(): void {
    this._render.addClass(this.body, 'overflow-hidden')
  }
  private enableBodyScroll(): void {
    this._render.removeClass(this.body, 'overflow-hidden')    
  }
}
