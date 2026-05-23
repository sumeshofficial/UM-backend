import { env } from "@config/env.config";
import mongoose from "mongoose";

export const connectMongo = async (): Promise<void> => {
  await mongoose.connect(env.MONGODB_URL);
};

export const disconnectMongo = async (): Promise<void> => {
  await mongoose.disconnect();
};