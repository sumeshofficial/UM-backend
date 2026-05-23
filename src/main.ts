import { LoginUseCase } from "@application/use-cases/auth/login.usecase";
import { RegisterUseCase } from "@application/use-cases/auth/register.usecase";
import { SyncCreatedUserUseCase } from "@application/use-cases/sync-user/sync-created-user.usecase";
import { SyncUpdatedUserUseCase } from "@application/use-cases/sync-user/sync-updated-user.usecase";
import { BlockOrUnBlockUserUseCase } from "@application/use-cases/user/block-or-unblock-user.usecase";
import { GetAllUsersUseCase } from "@application/use-cases/user/get-all-users.usecase";
import { GetUserUseCase } from "@application/use-cases/user/get-user.usecase";
import { env } from "@config/env.config";
import {
  connectMongo,
  disconnectMongo,
} from "@infrastructure/database/mongoose/mongoose.client";
import {
  connectPrisma,
  disconnectPrisma,
} from "@infrastructure/database/prisma/prisma.client";
import { BullMQUserQueue } from "@infrastructure/queues/bullmq/user.queue";
import { MongooseUserSyncRepository } from "@infrastructure/repositories/mongoose-user-sync.repository";
import { PrismaUserRepository } from "@infrastructure/repositories/prisma-user-repository";
import { Argon2PasswordHasher } from "@infrastructure/services/argon2-password-hasher.service";
import { JwtTokenService } from "@infrastructure/services/jwt-token.service";
import { UserWorker } from "@infrastructure/workers/user.worker";
import { AuthController } from "@presentation/http/controller/auth.controller";
import { UserController } from "@presentation/http/controller/user.controller";
import { errorHandlerMiddleware } from "@presentation/http/middleware/error-handle.middleware";
import { createAuthRouter } from "@presentation/http/routes/auth.routes";
import { createUserRouter } from "@presentation/http/routes/user.routes";
import express from "express";

const app = express();

app.use(express.json());

const prismaUserRepository = new PrismaUserRepository();

const argon2PasswordHasher = new Argon2PasswordHasher();
const jwtTokenService = new JwtTokenService();

const bullMQUserQueue = new BullMQUserQueue();

const registerUserCase = new RegisterUseCase(
  prismaUserRepository,
  argon2PasswordHasher,
  bullMQUserQueue
);
const loginUseCase = new LoginUseCase(
  prismaUserRepository,
  argon2PasswordHasher,
  jwtTokenService
);

const getAllUsersUseCase = new GetAllUsersUseCase(prismaUserRepository);
const getUserUseCase = new GetUserUseCase(prismaUserRepository);
const blockOrUnBlockUserUseCase = new BlockOrUnBlockUserUseCase(
  prismaUserRepository,
  bullMQUserQueue
);

const authController = new AuthController(registerUserCase, loginUseCase);

const userController = new UserController(
  getAllUsersUseCase,
  getUserUseCase,
  blockOrUnBlockUserUseCase
);

const authRouter = createAuthRouter(authController, jwtTokenService);

const userRouter = createUserRouter(userController, jwtTokenService);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandlerMiddleware());

const bootstrap = async () => {
  await connectPrisma();
  await connectMongo();

  const mongooseUserSyncRepository = new MongooseUserSyncRepository();
  const syncCreatedUserUseCase = new SyncCreatedUserUseCase(
    mongooseUserSyncRepository
  );
  const syncUpdatedUserUseCase = new SyncUpdatedUserUseCase(
    mongooseUserSyncRepository
  );

  const userWorker = new UserWorker(
    syncCreatedUserUseCase,
    syncUpdatedUserUseCase
  );

  const server = app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await disconnectMongo();
      await disconnectPrisma();
      await userWorker.shutdown();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

bootstrap().catch((error) => {
  console.error("Failed to bootstrap application", error);
  process.exit(1);
});
