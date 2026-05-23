import { TokenService } from "@application/ports/services/token.port";
import { AuthTokenPayload } from "@application/types/auth/auth-token-payload";
import { env } from "@config/env.config";
import jwt from "jsonwebtoken";

export class JwtTokenService implements TokenService {
  generate(payload: AuthTokenPayload): string {
    const expiresIn = env.JWT_EXPIRES_IN as NonNullable<
      jwt.SignOptions["expiresIn"]
    >;

    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn,
    });
  }

  verify(token: string): AuthTokenPayload {
    return jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
  };
};