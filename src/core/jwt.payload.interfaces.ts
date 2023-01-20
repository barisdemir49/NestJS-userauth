export interface JwtPayload {
    uuid: string
    username: string
    level: string
    expiresIn: Date
}