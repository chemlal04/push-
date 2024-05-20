// db.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserFromDb() {
  return prisma.user.findMany({
    include: {
      key: true,
    },
  });
}

export async function getKeyFromDb() {
  return prisma.key.findMany();
}
