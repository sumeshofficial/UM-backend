import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { AuthController } from "../controller/auth.controller";
import { TokenService } from "@application/ports/services/token.port";

export const createAuthRouter = (
  authController: AuthController,
  tokenService: TokenService
) => {
  const router = Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);

  router.get("/me", authenticate(tokenService), authController.getMe);

  return router;
};
