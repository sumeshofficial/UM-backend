import { UseCase } from "./user-case.interface";
import { SyncUpdatedUserJob } from "@application/types/queue/sync-updated-user-job.type";

export interface ISyncUpdatedUserUseCase extends UseCase<SyncUpdatedUserJob, void> {}
