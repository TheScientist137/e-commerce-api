// This script only runs one time to seed the database
const { PrismaClient } = require('@prisma/client');
const seedData = require('../prisma/seed.json');

const prisma = new PrismaClient();

const seedDataBase = async () => {
 try {
  // Clean previous data
  console.log('Cleaning previous data');
  await prisma.telescopeType.deleteMany();
  await prisma.telescope.deleteMany();

  // Insert telescope type data
  await prisma.telescopeType.createMany({
   data: seedData.telescopeTypes
  });
  // Insert telescope data
  await prisma.telescope.createMany({
   data: seedData.telescopes
  });

 } catch (error) {
    console.error('Error seeding database', error);
 }
}

seedDataBase();