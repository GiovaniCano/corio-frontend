import { Dish } from "./Dish"
import { Itemable } from "./Itemable"

export class DaySection {
    id: number
    name: string
    user_id: number
    day_id: number
    dishes: Dish[]
    itemables: Itemable[]

    created_at: string
    updated_at: string

    constructor(args?: DaySection ) {
        this.id = args?.id ?? 0
        this.name = args?.name ?? ''
        this.user_id = args?.user_id ?? 0
        this.day_id = args?.day_id ?? 0
        this.dishes = args?.dishes ?? []
        this.itemables = args?.itemables ?? []

        this.created_at = args?.created_at ?? ''
        this.updated_at = args?.updated_at ?? ''
    }
}