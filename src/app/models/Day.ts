import { DaySection } from "./DaySection"

export class Day_Post {
    constructor(public name: string ) {
        this.name = name
    }
}

export interface Day extends Day_Post {
    id: number
    user_id: number
    created_at: string
    updated_at: string

    day_sections: DaySection[]
}