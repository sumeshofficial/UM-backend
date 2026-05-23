import { User } from "@domain/entities/user.entity";
import { Role } from "@domain/value-objects/user-role";
import { UserStatus } from "@domain/value-objects/user-status";
import { prismaClient } from "@infrastructure/database/prisma/prisma.client";
import { Prisma } from "@prisma/client";

type PrismaUserRow = NonNullable<
  Awaited<ReturnType<typeof prismaClient.user.findUnique>>
>;

export class UserMapper {
  static toDomainUser(row: PrismaUserRow): User {
    return new User(
      row.id,
      row.fullname,
      row.email,
      row.passwordHash,
      UserStatus.fromValue(row.status),
      Role.fromValue(row.role),
      row.isBlocked,
      row.createdAt,
      row.updatedAt
    );
  }

  static toPersistence(entity: User): Prisma.UserUncheckedCreateInput {
    return {
      id: entity.id,
      fullname: entity.fullname,
      email: entity.email,
      passwordHash: entity.passwordHashValue,
      status: entity.status,
      isBlocked: entity.isBlocked,
      role: entity.role,
      updatedAt: entity.updatedAt,
    };
  }
}
