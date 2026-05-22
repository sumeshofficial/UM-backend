import type { SyncCreatedUserData } from "@domain/types/sync-created-user-data.type";
import { SyncUpdatedUserData } from "@domain/types/sync-updated-user-data.type";

export interface SyncUserRepository {
  created(data: SyncCreatedUserData): Promise<void>;
  updated(data: SyncUpdatedUserData): Promise<void>;
}
