import { MeasurementType } from "./MeasurementType"

export class Item {
    id: number
    name: string
    user_id: number
    measurement_type: MeasurementType

    created_at: string
    updated_at: string

    constructor(args?: Item ) {
        this.id = args?.id ?? 0
        this.name = args?.name ?? ''
        this.user_id = args?.user_id ?? 0
        this.measurement_type = args?.measurement_type ?? new MeasurementType()

        this.created_at = args?.created_at ?? ''
        this.updated_at = args?.updated_at ?? ''
    }
}