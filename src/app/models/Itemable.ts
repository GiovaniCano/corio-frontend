import { Item } from "./Item"
import { MeasurementUnit } from "./MeasurementUnit"

export class Itemable {
    id: number
    itemable_id: number
    itemable_type: string
    item: Item
    quantity: number
    measurement_unit: MeasurementUnit
    // trail

    created_at: string
    updated_at: string

    constructor(args?: Itemable ) {
        this.id = args?.id ?? 0
        this.itemable_id = args?.itemable_id ?? 0
        this.itemable_type = args?.itemable_type ?? ''
        this.item = args?.item ?? new Item()
        this.quantity = args?.quantity ?? 0
        this.measurement_unit = args?.measurement_unit ?? new MeasurementUnit()
        // trail


        this.created_at = args?.created_at ?? ''
        this.updated_at = args?.updated_at ?? ''
    }
}