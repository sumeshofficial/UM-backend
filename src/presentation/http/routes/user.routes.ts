import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { TokenService } from "@application/ports/services/token.port";
import { UserController } from "../controller/user.controller";

export const createUserRouter = (
  userController: UserController,
  tokenService: TokenService
) => {
  const router = Router();

  router.get(
    "/",
    authenticate(tokenService),
    authorize("ADMIN"),
    userController.getAllUsers
  );

  router.get(
    "/:userId",
    authenticate(tokenService),
    authorize("ADMIN"),
    userController.getUser
  );

  router.patch(
    "/:userId",
    authenticate(tokenService),
    authorize("ADMIN"),
    userController.blockOrUnBlockUser
  );

  return router;
};
