import { User } from "@domain/entities/user.entity";
import { BaseRepository } from "./base.repository";

export interface UserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;

  findManyExceptAdmin(): Promise<User[]>;
}
