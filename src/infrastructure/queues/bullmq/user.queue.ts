import { UserQueuePort } from "@application/ports/queues/user.queue";
import { SyncCreatedUserJob } from "@application/types/queue/sync-created-user-job.type";
import { userQueue } from "./bullmq.client";
import { USER_QUEUE_CONSTANTS } from "@infrastructure/constants/queue/user-queue.constants";
import { SyncUpdatedUserJob } from "@application/types/queue/sync-updated-user-job.type";

export class BullMQUserQueue implements UserQueuePort {
  async syncCreatedUserJob(data: SyncCreatedUserJob): Promise<void> {
    await userQueue.add(USER_QUEUE_CONSTANTS.SYNC_CREATED_USER, data);
  }
  
  async syncUpdatedUserJob(data: SyncUpdatedUserJob): Promise<void> {
    await userQueue.add(USER_QUEUE_CONSTANTS.SYNC_UPDATED_USER, data);
  }
}