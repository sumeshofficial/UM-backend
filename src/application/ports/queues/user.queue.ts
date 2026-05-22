import { SyncCreatedUserJob } from "@application/types/queue/sync-created-user-job.type";
import { SyncUpdatedUserJob } from "@application/types/queue/sync-updated-user-job.type";

export interface UserQueuePort {
  addSyncUserJob(data: SyncCreatedUserJob| SyncUpdatedUserJob): Promise<void>;
}
