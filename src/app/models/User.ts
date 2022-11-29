import { Avatar } from "./_types"

export type User = {
    id: number
    username: string
    email: string
    email_verified_at: string
    avatar: Avatar
    created_at: string
    updated_at: string
}