import { DaySection, DaySection_Post } from "./DaySection"

export class Day_Post {
    constructor(public name: string, public sections: DaySection_Post[]) {
        this.name = name
        this.sections = sections
    }
}

export interface Day {
    id: number
    name: string
    user_id: number
    created_at: string
    updated_at: string

    day_sections: DaySection[]
}