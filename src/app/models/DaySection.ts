import { Dish } from "./Dish"
import { Item } from "./Item"
import { Itemable_Post } from "./Itemable"

export class DaySection_Post {
    constructor(
        public name: string,
        public dishes: number[],
        public items: Itemable_Post[],
    ) {
        this.name = name
        this.dishes = dishes
        this.items = items
    }
}

export class DaySection {
    id: number = 0

    name: string

    day_id: number = 0    
    user_id: number = 0
    created_at: string = ''
    updated_at: string = ''

    dishes: Dish[] = []
    items: Item[] = []

    constructor(name: string = '') {
        this.name = name
    }
}