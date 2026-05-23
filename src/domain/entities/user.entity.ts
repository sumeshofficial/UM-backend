import { Role, RoleType } from "@domain/value-objects/user-role";
import { UserStatus, UserStatusType } from "@domain/value-objects/user-status";
import { randomUUID } from "node:crypto";

export class User {
  constructor(
    private readonly _id: string,
    private _fullname: string,
    private _email: string,
    private _passwordHash: string,
    private _status: UserStatus,
    private _role: Role,
    private _isBlocked: boolean,
    private readonly _createdAt: Date,
    private _updatedAt: Date
  ) {
    this.validateEmail(this._email);
    this.validateFullname(this._fullname);
  }

  // Validations

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error(`Invalid email format: ${email}`);
    }
  }

  private validateFullname(fullname: string): void {
    if (!fullname || fullname.trim().length === 0) {
      throw new Error("Fullname cannot be empty");
    }

    if (fullname.length > 100) {
      throw new Error("Fullname cannot exceed 100 characters");
    }
  }

  // Getters

  get id(): string {
    return this._id;
  }

  get fullname(): string {
    return this._fullname;
  }

  get email(): string {
    return this._email;
  }

  get passwordHashValue(): string {
    return this._passwordHash;
  }

  get status(): UserStatusType {
    return this._status.getValue();
  }

  get role(): RoleType {
    return this._role.getValue();
  }

  get isBlocked(): boolean {
    return this._isBlocked;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static create(data: {
    fullname: string;
    email: string;
    passwordHash: string;
  }): User {
    const now = new Date();

    return new User(
      randomUUID(),
      data.fullname,
      data.email,
      data.passwordHash,
      UserStatus.active(),
      Role.user(),
      false,
      now,
      now
    );
  }

  block(): void {
    this._isBlocked = true;
    this._status = UserStatus.blocked();
    this._updatedAt = new Date();
  }

  unblock(): void {
    this._isBlocked = false;
    this._status = UserStatus.active();
    this._updatedAt = new Date();
  }

  // DTO

  toPrimitives() {
    return {
      id: this._id,
      fullname: this._fullname,
      email: this._email,
      status: this._status.getValue(),
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}

export type UserDTO = ReturnType<typeof User.prototype.toPrimitives>;
