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


export async function getReportsFromDb(reporterId, reportedUserId) {
  const whereClause = {};

  // Add conditions for reporterId and reportedUserId if provided
  if (reporterId) {
    whereClause.reporterId = reporterId;
  }

  if (reportedUserId) {
    whereClause.reportedUserId = reportedUserId;
  }

  // Fetch reports based on the provided conditions
  return prisma.report.findMany({
    where: whereClause,
    include: {
      reporter: {
        select: {
          full_name: true,
          email: true,
          image: true,
          status: true,
        },
      },
      reportedUser: {
        select: {
          full_name: true,
          email: true,
          image: true,
          status: true,
        },
      },
    },
  });
}