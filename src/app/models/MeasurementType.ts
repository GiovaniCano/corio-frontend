export class MeasurementType {
    id: number
    name: string

    constructor(args?: MeasurementType ) {
        this.id = args?.id ?? 0
        this.name = args?.name ?? ''
    }
}