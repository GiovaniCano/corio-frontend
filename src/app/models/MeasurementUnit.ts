import { MeasurementType } from "./MeasurementType"

export class MeasurementUnit_Post {
    constructor(
        public name: string ,
        public abbreviation: string | null ,
        public measurement_type_id: number ,
        public convertion: number | null ,
    ) {
        this.name = name
        this.abbreviation = abbreviation ?? null
        this.measurement_type_id = measurement_type_id
        this.convertion = convertion ?? null
    }
}

export interface MeasurementUnit extends MeasurementUnit_Post {
    id: number
    user_id: number | null
    created_at: string
    updated_at: string
    
    measurement_type: MeasurementType
}