import { PrismaClient } from '@prisma/client';
import { telescopeTypes, telescopes } from '../prisma/seed.json';

const prisma = new PrismaClient();

const seedDataBase = async () => {
 try {
  // Clean previous data
  await prisma.telescopeType.deleteMany();
  await prisma.telescope.deleteMany();
  console.log('Cleaning previous data');

  // Insert telescope type data
  await prisma.telescopeType.createMany({ data: telescopeTypes });
  console.log('Seeded telescope types tables')
  // Insert telescope data
  await prisma.telescope.createMany({ data: telescopes });
  console.log('Seeded telescope tables')

 } catch (error) {
    console.error('Error seeding database', error);
 }
}

seedDataBase();