import { SyncUserRepository } from "@domain/repositories/sync-user.repository";
import { SyncCreatedUserData } from "@domain/types/sync-created-user-data.type";
import { SyncUpdatedUserData } from "@domain/types/sync-updated-user-data.type";
import { UserModel } from "@infrastructure/database/mongoose/models/user.model";

export class MongooseUserSyncRepository implements SyncUserRepository {
  async created(data: SyncCreatedUserData): Promise<void> {
    await UserModel.create(data);
  }

  async updated(data: SyncUpdatedUserData): Promise<void> {
    await UserModel.updateOne(
      { postgresId: data.postgresId },
      { $set: data.updates }
    );
  }
}
