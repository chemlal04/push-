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

export async function getActiveDriversFromDb() {
  return prisma.user.findMany({
    where: {
      role: 'driver',
      status: 'active',
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
          id_User:true,
          full_name: true,
          email: true,
          image: true,
          status: true,
          role:true,
        },
      },
      reportedUser: {
        select: {
          id_User:true,
          full_name: true,
          email: true,
          image: true,
          status: true,
          role:true,
        },
      },
    },
  });
}





export async function getBusFromDB(limit, offset) {
  return prisma.bus.findMany({
    skip: offset,
    take: limit,
  });
}



export async function addBusToDb(busData) {
  try {
    const newBus = await prisma.bus.create({
      data: {
        image: busData.image,
        bus_Number: busData.bus_Number,
        bus_Name: busData.bus_Name,
        id_Driver: busData.id_Driver,
        bus_Capacity: busData.bus_Capacity,
        bus_Status: busData.bus_Status,
      },
    });
    return newBus;
  } catch (error) {
    console.error('Error adding bus to database:', error); // Log the error
    return null;
  }
}