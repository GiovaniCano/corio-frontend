export interface LoginCredentials {
    email: string
    password: string
    remember: boolean
}
export interface RegisterCredentials {
    email: string
    username: string
    password: string
    password_confirmation: string
}
export interface ResetPasswordCredentials {
    email: string
    token: string
    password: string
    password_confirmation: string
}
export interface UpdatePasswordCredentials {
    current_password: string
    password: string
    password_confirmation: string
}
export interface UpdateProfileCredentials {
    email: string
    username: string
    avatar_id: number
}
export interface Avatar {
    id: number
    name: string
}

export interface Toast {
    type: 'info'|'success'|'danger'
    message: string
}