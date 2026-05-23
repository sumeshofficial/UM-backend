import { User } from "@domain/entities/user.entity";
import type { UserRepository } from "@domain/repositories/user.repository";
import { prismaClient } from "@infrastructure/database/prisma/prisma.client";
import { UserMapper } from "@infrastructure/mappers/user.mapper";

export class PrismaUserRepository implements UserRepository {
  async save(entity: User): Promise<void> {
    await prismaClient.user.upsert({
      where: { id: entity.id },
      update: UserMapper.toPersistence(entity),
      create: {
        ...UserMapper.toPersistence(entity),
        createdAt: entity.createdAt,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await prismaClient.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    return row ? UserMapper.toDomainUser(row) : null;
  }

  async findById(id: string): Promise<User | null> {
    const row = await prismaClient.user.findUnique({
      where: { id },
    });

    return row ? UserMapper.toDomainUser(row) : null;
  }

  async findManyExceptAdmin(): Promise<User[]> {
    const rows = await prismaClient.user.findMany({
      where: { role: { not: "ADMIN" } },
    });

    return rows.map(UserMapper.toDomainUser);
  }
}
