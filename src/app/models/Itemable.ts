import { MeasurementUnit } from "./MeasurementUnit"

export type Itemable = {
    id: number
    itemable_id: number
    itemable_type: string
    item_id: number

    quantity: number

    created_at: string
    updated_at: string

    measurement_unit: MeasurementUnit

    trail?: { itemable_id: number, trail: string }
}