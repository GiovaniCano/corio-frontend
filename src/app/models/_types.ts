export type LoginCredentials = {
    email: string
    password: string
    remember: boolean
}
export type RegisterCredentials = {
    email: string
    username: string
    password: string
    password_confirmation: string
}
export type ResetPasswordCredentials = {
    email: string
    token: string
    password: string
    password_confirmation: string
}
export type UpdatePasswordCredentials = {
    current_password: string
    password: string
    password_confirmation: string
}
export type UpdateProfileCredentials = {
    email: string
    username: string
    avatar_id: number
}
export type Avatar = {
    id: number
    name: string
}

export type Toast = {
    id?: number
    type: 'info'|'success'|'danger'
    message: string
}