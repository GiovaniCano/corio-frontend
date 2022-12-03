import { Item } from "./Item"
import { Itemable_Post } from "./Itemable"

export class Dish_Post {
    constructor(public name: string, public items: Itemable_Post[]) {
        this.name = name
        this.items = items
    }
}

export interface Dish {
    id: number
    name: string
    user_id: number
    created_at: string
    updated_at: string

    items: Item[]
    pivot?: { id: number }
}