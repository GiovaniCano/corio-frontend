import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/Item';
import { Itemable } from 'src/app/models/Itemable';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';
import { AutoIncrementService } from 'src/app/services/auto-increment.service';
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

  @Input() trail?: string
  @Input() disableToast?: boolean = false

  @Output() close = new EventEmitter<void>()
  @Output() itemDone = new EventEmitter<Item>()

  form = new FormGroup({
    quantity: new FormControl('', [Validators.required, Validators.min(0), Validators.max(999999.99)]),
    measurement_unit_id: new FormControl(0, requiredSelect(0))
  })

  get measurement_unit_id() { return this.form.controls.measurement_unit_id }
  get quantity() { return this.form.controls.quantity }

  editMode!:boolean

  constructor(private _toastS: ToastService, private _autoIncrementS: AutoIncrementService) { }

  submit() {
    const quantity: number = parseFloat(this.quantity.value ?? '')
    const measurement_unit: MeasurementUnit = this.units.find(({id}) => id == this.measurement_unit_id.value)!
    const itemable = new Itemable(quantity, measurement_unit)

    const pivot = this.item.pivot
    if(pivot) {
      // update
      if(pivot.id) {
        itemable.id = pivot.id
      } else {
        itemable.ngId = pivot.ngId
      }      
      if(pivot.trail) itemable.trail = pivot.trail
    } else {
      // create
      itemable.ngId = this._autoIncrementS.getId()
      if(this.trail) itemable.trail = {itemable_id:0, trail:this.trail}
    }

    this.item = {...this.item, pivot: itemable}

    this.itemDone.emit(this.item)

    if(!this.disableToast && !this.editMode) {
      this._toastS.createToast({
        message: 'Item añadido',
        type: 'success'
      })
    }
  }

  ngOnInit(): void {
    this.units = this.units.filter(unit => unit.measurement_type_id == this.item.measurement_type_id)

    this.editMode = !!this.item.pivot
    if(this.editMode) {
      this.measurement_unit_id.setValue(this.item.pivot!.measurement_unit.id)
      this.quantity.setValue(this.item.pivot!.quantity.toString())
    }
  }

  onClose() {
    this.close.emit()
  }
}
