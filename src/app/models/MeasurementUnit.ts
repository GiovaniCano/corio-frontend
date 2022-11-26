import { MeasurementType } from "./MeasurementType"

export class MeasurementUnit {
    id: number
    name: string
    abbreviation: string
    measurement_type: MeasurementType
    convertion: number
    user_id: number

    created_at: string
    updated_at: string

    constructor(args?: MeasurementUnit ) {
        this.id = args?.id ?? 0
        this.name = args?.name ?? ''
        this.abbreviation = args?.abbreviation ?? ''
        this.measurement_type = args?.measurement_type ?? new MeasurementType()
        this.convertion = args?.convertion ?? 0
        this.user_id = args?.user_id ?? 0

        this.created_at = args?.created_at ?? ''
        this.updated_at = args?.updated_at ?? ''
    }
}