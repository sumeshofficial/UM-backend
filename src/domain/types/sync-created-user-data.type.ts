import type { RoleType } from "@domain/value-objects/user-role";
import type { UserStatusType } from "@domain/value-objects/user-status";

export type SyncCreatedUserData = {
  userId: string;
  fullname: string;
  email: string;
  role: RoleType;
  status: UserStatusType;
};
