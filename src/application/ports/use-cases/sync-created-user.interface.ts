import { SyncCreatedUserJob } from "@application/types/queue/sync-created-user-job.type";
import { UseCase } from "./use-case.interface";

export interface ISyncCreatedUserUseCase extends UseCase<SyncCreatedUserJob, void> {}
