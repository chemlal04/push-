// app/server/db.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getStudentFromDb() {
  return prisma.user.findMany({
    where: {
      role: {
        in: ['student', 'staff'],
      },
    },
  });
}

export async function getDriversFromDb() {
  return prisma.user.findMany({
    where: {
      role: 'driver',
    },
  });
}

export async function updateDriverStatus(id, newStatus) {
  try {
    const updatedDriver = await prisma.user.update({
      where: { id_User: id },
      data: { status: newStatus },
    });
    return updatedDriver;
  } catch (error) {
    console.error('Error updating driver status:', error);
    throw new Error("Failed to update driver status");
  }
}