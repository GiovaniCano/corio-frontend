import { Item } from "./Item"

export class List_Post {
    constructor(public name: string) {
        this.name = name
    }
}

export interface List extends List_Post {
    id: number
    user_id: number
    created_at: string
    updated_at: string

    items: Item[]
}