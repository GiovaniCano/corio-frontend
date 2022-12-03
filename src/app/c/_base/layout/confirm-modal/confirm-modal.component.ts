import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent {
  @Input() dataToReturn: any = null

  @Input() cancelText: string = 'Cancelar'
  @Input() confirmText: string = 'Confirmar'

  @Input() cancelClasses: string = ''
  @Input() confirmClasses: string = ''

  @Output() close = new EventEmitter<void>()
  @Output() confirm = new EventEmitter<any>()

  constructor() { }

  onConfirm() {
    this.confirm.emit(this.dataToReturn)
  }

  onClose() {
    this.close.emit()
  }
}
