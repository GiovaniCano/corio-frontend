import { Itemable } from "./Itemable"

export class Dish {
    id: number
    name: string
    user_id: number
    itemables: Itemable[]

    pivot?: { id:number }

    created_at: string
    updated_at: string

    constructor(args?: Dish ) {
        this.id = args?.id ?? 0
        this.name = args?.name ?? ''
        this.user_id = args?.user_id ?? 0
        this.itemables = args?.itemables ?? []

        this.pivot = args?.pivot ?? { id:0 }

        this.created_at = args?.created_at ?? ''
        this.updated_at = args?.updated_at ?? ''
    }
}