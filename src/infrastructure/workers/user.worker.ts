import { ISyncCreatedUserUseCase } from "@application/ports/use-cases/sync-created-user.interface";
import { ISyncUpdatedUserUseCase } from "@application/ports/use-cases/sync-updated-user.interface";
import { SyncCreatedUserJob } from "@application/types/queue/sync-created-user-job.type";
import { SyncUpdatedUserJob } from "@application/types/queue/sync-updated-user-job.type";
import { BULLMQ_EVENTS } from "@infrastructure/constants/queue/bullmq-events.constants";
import { USER_QUEUE_CONSTANTS } from "@infrastructure/constants/queue/user-queue.constants";
import { redisConnection } from "@infrastructure/redis/redis.client";
import { Job, Worker } from "bullmq";

export class UserWorker {
  private readonly _worker: Worker<SyncCreatedUserJob | SyncUpdatedUserJob>;

  constructor(
    private readonly _syncCreatedUserUseCase: ISyncCreatedUserUseCase,
    private readonly _syncUpdatedUserUseCase: ISyncUpdatedUserUseCase
  ) {
    this._worker = new Worker(
      USER_QUEUE_CONSTANTS.USER_SYNC,
      this._processJob,
      {
        connection: redisConnection,
      }
    );
    this._registerEvents();
  }

  private _processJob = async (
    job: Job<SyncCreatedUserJob | SyncUpdatedUserJob>
  ): Promise<void> => {
    switch (job.name) {
      case USER_QUEUE_CONSTANTS.SYNC_CREATED_USER:
        await this._syncCreatedUser(job.data as SyncCreatedUserJob);
        break;
      case USER_QUEUE_CONSTANTS.SYNC_UPDATED_USER:
        await this._syncUpdatedUser(job.data as SyncUpdatedUserJob);
        break;

      default:
        throw new Error(`Unknown job: ${job.name}`);
    }
  };

  private async _syncCreatedUser(data: SyncCreatedUserJob): Promise<void> {
    await this._syncCreatedUserUseCase.execute(data);
  }

  private async _syncUpdatedUser(data: SyncUpdatedUserJob): Promise<void> {
    await this._syncUpdatedUserUseCase.execute(data);
  }

  private _registerEvents(): void {
    this._worker.on(BULLMQ_EVENTS.COMPLETED, (job) => {
      console.log(`Job completed: ${job.id}`);
    });

    this._worker.on(BULLMQ_EVENTS.FAILED, (job, error) => {
      console.error(`Job failed: ${job?.id}`, error);
    });
  }

  async shutdown(): Promise<void> {
    await this._worker.close();
  }
}
