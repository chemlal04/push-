const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    console.log("Users:", users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function to display all users
getUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
