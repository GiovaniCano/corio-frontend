export class User {
    id: number
    username: string
    email: string
    email_verified_at: string
    avatar: {
        id: number
        name: string
    }
    created_at: string
    updated_at: string

    constructor(args?: User ) {
        this.id = args?.id ?? 0
        this.username = args?.username ?? ''
        this.email = args?.email ?? ''
        this.email_verified_at = args?.email_verified_at ?? ''
        this.avatar = args?.avatar ?? { id: 0, name: '' }
        this.created_at = args?.created_at ?? ''
        this.updated_at = args?.updated_at ?? ''
    }
}