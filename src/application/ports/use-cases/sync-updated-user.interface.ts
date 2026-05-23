import { UseCase } from "./use-case.interface";
import { SyncUpdatedUserJob } from "@application/types/queue/sync-updated-user-job.type";

export interface ISyncUpdatedUserUseCase extends UseCase<SyncUpdatedUserJob, void> {}
