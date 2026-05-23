import { SyncCreatedUserJob } from "@application/types/queue/sync-created-user-job.type";
import { SyncUpdatedUserJob } from "@application/types/queue/sync-updated-user-job.type";
import { env } from "@config/env.config";
import { USER_QUEUE_CONSTANTS } from "@infrastructure/constants/queue/user-queue.constants";
import { redisConnection } from "@infrastructure/redis/redis.client";
import { Queue } from "bullmq";

export const userQueue = new Queue<SyncCreatedUserJob | SyncUpdatedUserJob>(
  USER_QUEUE_CONSTANTS.USER_SYNC,
  {
    connection: redisConnection,
    defaultJobOptions: {
      attempts: env.BULLMQ_ATTEMPTS,

      backoff: {
        type: "exponential",
        delay: env.BULLMQ_BACKOFF_DELAY,
      },

      removeOnComplete: env.BULLMQ_REMOVE_ON_COMPLETE,
      removeOnFail: env.BULLMQ_REMOVE_ON_FAIL,
    },
  }
);
