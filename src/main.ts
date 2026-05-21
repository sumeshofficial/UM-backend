import { env } from "@config/env.config";
import { connectMongo, disconnectMongo } from "@infrastructure/database/mongoose/mongoose.client";
import { connectPrisma, disconnectPrisma } from "@infrastructure/database/prisma/prisma.client";
import express from "express";

const app = express();

app.use(express.json());

const bootstrap = async () => {
  await connectPrisma();
  await connectMongo();

  const server = app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await disconnectMongo();
      await disconnectPrisma();
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