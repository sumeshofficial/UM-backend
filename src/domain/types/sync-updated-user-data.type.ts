import type { RoleType } from "@domain/value-objects/user-role";
import type { UserStatusType } from "@domain/value-objects/user-status";

export type SyncUpdatedUserData = {
  postgresId: string;

  updates: Partial<{
    fullname: string;
    email: string;
    role: RoleType;
    status: UserStatusType;
  }>;
};
