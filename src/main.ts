import { SyncCreatedUserUseCase } from "@application/use-cases/sync-created-user.usecase";
import { SyncUpdatedUserUseCase } from "@application/use-cases/sync-updated-user.usecase";
import { env } from "@config/env.config";
import { connectMongo, disconnectMongo } from "@infrastructure/database/mongoose/mongoose.client";
import { connectPrisma, disconnectPrisma } from "@infrastructure/database/prisma/prisma.client";
import { MongooseUserSyncRepository } from "@infrastructure/repositories/mongoose-user-sync.repository";
import { UserWorker } from "@infrastructure/workers/user.worker";
import express from "express";

const app = express();

app.use(express.json());

const bootstrap = async () => {
  await connectPrisma();
  await connectMongo();

  const mongooseUserSyncRepository = new MongooseUserSyncRepository();
  const syncCreatedUserUseCase = new SyncCreatedUserUseCase(mongooseUserSyncRepository);
  const syncUpdatedUserUseCase = new SyncUpdatedUserUseCase(mongooseUserSyncRepository);

  const userWorker = new UserWorker(syncCreatedUserUseCase, syncUpdatedUserUseCase);

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