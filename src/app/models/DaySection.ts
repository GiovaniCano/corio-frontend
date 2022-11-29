import { Dish } from "./Dish"
import { Item } from "./Item"

export class DaySection_Post {    
    constructor(public name: string, public day_id: number) {
        this.name = name
        this.day_id = day_id
    }
}

export interface DaySection extends DaySection_Post {
    id: number
    user_id: number
    created_at: string
    updated_at: string

    dishes: Dish[]
    items: Item[]
}