import { DaySection } from "./DaySection"

export class Day {
    id: number
    name: string
    user_id: number
    day_sections: DaySection[]

    created_at: string
    updated_at: string

    constructor(args?: Day ) {
        this.id = args?.id ?? 0
        this.name = args?.name ?? ''
        this.user_id = args?.user_id ?? 0
        this.day_sections = args?.day_sections ?? []

        this.created_at = args?.created_at ?? ''
        this.updated_at = args?.updated_at ?? ''
    }
}