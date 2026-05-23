import { PasswordHasher } from "@application/ports/services/password-hasher.service";
import argon2 from "argon2";

export class Argon2PasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch {
      return false;
    }
  }
}
