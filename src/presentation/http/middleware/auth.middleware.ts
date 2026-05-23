import type { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../errors/unauthorized.exception";
import { TokenService } from "@application/ports/services/token.port";

export const authenticate = (tokenService: TokenService) => {
  return (request: Request, _response: Response, next: NextFunction): void => {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(new UnauthorizedException());
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      return next(new UnauthorizedException());
    }

    try {
      const payload = tokenService.verify(token);
      request.user = payload;
      next();
    } catch {
      return next(new UnauthorizedException());
    }
  };
};
