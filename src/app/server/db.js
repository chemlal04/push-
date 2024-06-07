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

export async function getActiveUnassignedDriversFromDb() {
  // Retrieve all active drivers
  const activeDrivers = await prisma.user.findMany({
    where: {
      role: 'driver',
      status: 'active',
    },
    select: {
      id_User: true,
      full_name :true,
    },
  });

  // Retrieve IDs of drivers who are associated with buses
  const assignedDriverIds = await prisma.bus.findMany({
    select: {
      id_Driver: true,
    },
  }).then(buses => buses.map(bus => bus.id_Driver));

  // Filter out active drivers whose IDs are associated with buses
  const unassignedDrivers = activeDrivers.filter(driver => !assignedDriverIds.includes(driver.id_User));

  return unassignedDrivers;
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

export async function getHighestBusId() {
  const highestBus = await prisma.bus.findFirst({
    orderBy: {
      id_Driver: 'desc',
    },
    select: {
      id_Driver: true,
    },
  });
  return highestBus ? highestBus.id : 0; // Return 0 if no buses found
}



export async function addBusToDb(busData) {
  try {
    // Step 1: Create the new bus entry
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

    // Step 2: Update the User model with the bus id
    await prisma.user.update({
      where: {
        id_User: busData.id_Driver,
      },
      data: {
        busId: newBus.id_Bus,
      },
    });

    return newBus;
  } catch (error) {
    console.error('Error adding bus to database:', error); // Log the error
    return null;
  }
}




// export async function deleteBusFromDb(busId) {
//   try {
//     // Delete the bus with the specified ID
//     const deletedBus = await prisma.bus.delete({
//       where: { id_Bus: busId },
//     });
//     return deletedBus;
//   } catch (error) {
//     console.error('Error deleting bus from database:', error);
//     throw new Error("Failed to delete bus");
//   }
// }


export async function editBusInDb(busId, updatedBusData) {
  try {
    // Update the bus with the specified ID
    const updatedBus = await prisma.bus.update({
      where: { id_Bus: busId },
      data: {
        image: updatedBusData.image,
        bus_Number: updatedBusData.bus_Number,
        bus_Name: updatedBusData.bus_Name,
        id_Driver: updatedBusData.id_Driver,
        bus_Capacity: updatedBusData.bus_Capacity,
        bus_Status: updatedBusData.bus_Status,
      },
    });
    return updatedBus;
  } catch (error) {
    console.error('Error editing bus in database:', error);
    throw new Error("Failed to edit bus");
  }
}



export async function getIssuesForBusAndDriver() {
  try {
    const issues = await prisma.issue.findMany({
      where: {
        status: 'inactive',
      },
      include: {
        driver: {
          select: {
            full_name: true,
          },
        },
        bus: {
          select: {
            bus_Name: true,
          },
        },
      },
    });

    return issues;
  } catch (error) {
    console.error('Error fetching issues for bus and driver:', error);
    throw new Error("Failed to fetch issues for bus and driver");
  }
}



export async function getAllIssues() {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        driver: {
          select: {
            id_User: true,
            full_name: true,
            image: true,
            email: true,
            status: true,
            role: true,
          },
        },
        bus: {
          select: {
            id_Bus: true,
            bus_Name: true,
            image: true,
            bus_Status: true,
          },
        },
      },
    });

    return issues;
  } catch (error) {
    console.error('Error fetching issues for bus and driver:', error);
    throw new Error("Failed to fetch issues for bus and driver");
  }
}



export async function updateIssueStatus(issueId, newStatus) {
  try {
    const updatedIssue = await prisma.issue.update({
      where: { id_issue: issueId },
      data: { status: newStatus },
    });
    return updatedIssue;
  } catch (error) {
    console.error('Error updating issue status:', error);
    throw new Error("Failed to update issue status");
  }
}


export async function getBookingFromDb() {
  return prisma.booking.findMany();
}

export async function updateStudentStatus(id, newStatus) {
  try {
    const updatedStudent = await prisma.user.update({
      where: { id_User: id },
      data: { status: newStatus },
    });
    return updatedStudent;
  } catch (error) {
    console.error('Error updating student status:', error);
    throw new Error("Failed to update student status");
  }
}
