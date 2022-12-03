import { MeasurementUnit } from "./MeasurementUnit"

export class Itemable_Post {
    constructor(public item_id: number, public quantity: number, public measurement_unit_id: number) {
        this.item_id = item_id
        this.quantity = quantity
        this.measurement_unit_id = measurement_unit_id
    }
}

export class Itemable {
    quantity: number
    measurement_unit: MeasurementUnit

    id: number = 0
    itemable_id: number = 0
    itemable_type: string = ''
    item_id: number = 0

    created_at: string = ''
    updated_at: string = ''

    trail?: { itemable_id: number, trail: string }

    constructor(quantity: number, measurement_unit: MeasurementUnit) {
        this.quantity = quantity
        this.measurement_unit = measurement_unit
    }
}