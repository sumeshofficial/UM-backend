import { ISyncUpdatedUserUseCase } from "@application/ports/use-cases/sync-updated-user.interface";
import { SyncUserRepository } from "@domain/repositories/sync-user.repository";
import { SyncUpdatedUserData } from "@domain/types/sync-updated-user-data.type";

export class SyncUpdatedUserUseCase implements ISyncUpdatedUserUseCase {
  constructor(private readonly _userSyncRepository: SyncUserRepository) {}
  async execute(request: SyncUpdatedUserData): Promise<void> {
    await this._userSyncRepository.updated(request);
  }
}
