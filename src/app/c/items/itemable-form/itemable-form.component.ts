import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/Item';
import { Itemable } from 'src/app/models/Itemable';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';
import { ToastService } from 'src/app/services/toast.service';
import { requiredSelect } from '../../_base/form-extensions/validators';

@Component({
  selector: 'app-itemable-form',
  templateUrl: './itemable-form.component.html',
  styleUrls: ['./itemable-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemableFormComponent implements OnInit {
  @Input() item!: Item
  @Input() units!: MeasurementUnit[]

  @Output() close = new EventEmitter<void>()
  @Output() itemDone = new EventEmitter<Item>()

  form = new FormGroup({
    quantity: new FormControl(),
    measurement_unit_id: new FormControl(0, requiredSelect(0))
  })

  get measurement_unit_id() { return this.form.controls.measurement_unit_id }
  get quantity() { return this.form.controls.quantity }

  editMode!:boolean

  constructor(private _toastS: ToastService) { }

  submit() {
    const quantity = this.quantity.value
    const measurement_unit = this.units.find(({id}) => id == this.measurement_unit_id.value)!
    const itemable = new Itemable(quantity, measurement_unit)
    this.item = {...this.item, pivot: itemable}

    this.itemDone.emit(this.item)

    this._toastS.createToast({
      message: this.editMode ? 'Item actualizado' : 'Item añadido',
      type: 'success'
    })
  }

  ngOnInit(): void {
    this.quantity.setValidators([Validators.required, Validators.max(999999.99)]) // done here to keep empty the input

    this.units = this.units.filter(unit => unit.measurement_type_id == this.item.measurement_type_id)

    this.editMode = !!this.item.pivot
    if(this.editMode) {
      this.measurement_unit_id.setValue(this.item.pivot!.measurement_unit.id)
      this.quantity.setValue(this.item.pivot!.quantity)
    }
  }

  onClose() {
    this.close.emit()
  }
}
