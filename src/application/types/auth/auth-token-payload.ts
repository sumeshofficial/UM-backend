import { RoleType } from "@domain/value-objects/user-role"

export type AuthTokenPayload = {
    sub: string,
    email: string,
    role: RoleType
}