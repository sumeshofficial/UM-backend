import type { AuthTokenPayload } from "@application/types/auth-token-payload";

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

export {};