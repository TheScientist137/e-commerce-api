import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const showTelescopesController = async (req, res) => {
 try {
  const findTelescopes = await prisma.telescope.findMany();
  if (!findTelescopes) throw new Error('Error loading telescopes');

  res.json({ message: 'Loading telescopes', findTelescopes });
 } catch (error) {
  console.error('Error loading telescopes', error);
 }
}

const showTelescopeByIdController = async (req, res) => {
 const { id } = req.params;

 try {
  const findTelescopeById = await prisma.telescope.findUnique({ where: { id: parseInt(id) } });
  if (!findTelescopeById) throw new Error('Error loading telescope');

  res.json({ message: 'Loading telescope:', findTelescopeById });
 } catch (error) {
  console.error('Error loading telescope by id', error);
 }
}

const showTelescopesByTypeIdController = async (req, res) => {
 const { typeId } = req.params;

 try {
  const findTelescopesByTypeId = await prisma.telescope.findMany({ where: { telescopeTypeId: parseInt(typeId) } });
  if (!findTelescopesByTypeId) throw new Error('Error loading telescopes by typeId');

  res.json({ message: 'Loading telescopes by typeId:', findTelescopesByTypeId });
 } catch (error) {
  console.error('Error loading telescopes by typeId', error);
 }
}

export default {
 showTelescopesController,
 showTelescopeByIdController,
 showTelescopesByTypeIdController };