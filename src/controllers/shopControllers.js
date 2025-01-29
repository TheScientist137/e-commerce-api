import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const showTelescopesController = async (req, res) => {
 try {
  const findTelescopes = await prisma.telescope.findMany({ include: { telescopeType: true } });
  // Al añadir el include accedemos a la relation creada en prisma
  if (!findTelescopes) throw new Error('Error loading telescopes');

  res.json({ message: 'Loading telescopes', telescopes: findTelescopes });
 } catch (error) {
  console.error('Error loading telescopes', error);
 }
}

const showTelescopeByIdController = async (req, res) => {
 const { id } = req.params;

 try {
  const findTelescopeById = await prisma.telescope.findUnique({ where: { id: parseInt(id) } });
  if (!findTelescopeById) throw new Error('Error loading telescope');

  res.json({ message: 'Loading telescope:', telescope: findTelescopeById });
 } catch (error) {
  console.error('Error loading telescope by id', error);
 }
}

const showTelescopesByTypeIdController = async (req, res) => {
 const { typeId } = req.params;

 try {
  const findTelescopesByTypeId = await prisma.telescope.findMany({ 
   where: { telescopeTypeId: parseInt(typeId) },
   include: { telescopeType: true } });
   
  if (!findTelescopesByTypeId) throw new Error('Error loading telescopes by typeId');

  res.json({ message: 'Loading telescopes by typeId:', telescopes: findTelescopesByTypeId });
 } catch (error) {
  console.error('Error loading telescopes by typeId', error);
 }
}

// get telescopes types

export default {
 showTelescopesController,
 showTelescopeByIdController,
 showTelescopesByTypeIdController };