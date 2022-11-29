import { Itemable } from "./Itemable"
import { MeasurementType } from "./MeasurementType"

export class Item_Post {
    constructor(public name: string, public measurement_type_id: number) {
        this.name = name
        this.measurement_type_id = measurement_type_id
    }
}

export interface Item extends Item_Post {
    id: number
    user_id: number
    created_at: string
    updated_at: string

    measurement_type: MeasurementType
    pivot?: Itemable
}