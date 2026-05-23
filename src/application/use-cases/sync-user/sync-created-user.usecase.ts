import { ISyncCreatedUserUseCase } from "@application/ports/use-cases/sync-created-user.interface";
import { SyncCreatedUserJob } from "@application/types/queue/sync-created-user-job.type";
import { SyncUserRepository } from "@domain/repositories/sync-user.repository";

export class SyncCreatedUserUseCase implements ISyncCreatedUserUseCase {
  constructor(private readonly _userSyncRepository: SyncUserRepository) {}
  async execute(request: SyncCreatedUserJob): Promise<void> {
    await this._userSyncRepository.created(request);
  }
}
