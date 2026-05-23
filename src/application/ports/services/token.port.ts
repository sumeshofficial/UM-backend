import { AuthTokenPayload } from "@application/types/auth/auth-token-payload";

export interface TokenService {
    generate(payload: AuthTokenPayload): string;
    verify(token: string): AuthTokenPayload;
}