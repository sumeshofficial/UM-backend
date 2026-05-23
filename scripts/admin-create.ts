/// <reference types="node" />
import { PrismaClient, Role, Status } from "@prisma/client";
import argon2 from "argon2";
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const email = process.env.ADMIN_EMAIL ?? "admin@gmail.com";
  const password = process.env.ADMIN_PASSWORD ?? "Admin@123";
  const fullname = process.env.ADMIN_NAME ?? "Admin";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin already exists (${email}), skipping`);
    return;
  }

  const hashedPassword = await argon2.hash(password, {
    type: argon2.argon2id,
  });

  await prisma.user.create({
    data: {
      id: randomUUID(),
      fullname,
      email,
      passwordHash: hashedPassword,
      isBlocked: false,
      status: Status.ACTIVE,
      role: Role.ADMIN,
    },
  });

  console.log(`Admin created: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
