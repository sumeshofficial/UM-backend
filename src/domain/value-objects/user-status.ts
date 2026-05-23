export type UserStatusType = "ACTIVE" | "BLOCKED";

export class UserStatus {
  private constructor(private readonly value: UserStatusType) {}

  static active(): UserStatus {
    return new UserStatus("ACTIVE");
  }

  static blocked(): UserStatus {
    return new UserStatus("BLOCKED");
  }

  static fromValue(value: UserStatusType): UserStatus {
    switch (value) {
      case "ACTIVE":
        return UserStatus.active();
      case "BLOCKED":
        return UserStatus.blocked();
    }
  }

  getValue(): UserStatusType {
    return this.value;
  }

  equals(status: UserStatus): boolean {
    return this.value === status.value;
  }
}