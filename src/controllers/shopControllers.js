import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// cambiar console.error por res.status.json

// cambiar nombres a get not show
const showTelescopesController = async (req, res) => {
 try {
  const findTelescopes = await prisma.telescope.findMany({ include: { telescopeType: true } });
  // Al añadir el include accedemos a la relation creada en prisma
  if (!findTelescopes) throw new Error('Error obtaining telescopes');

  res.status(200).json({ message: 'Loading telescopes', telescopes: findTelescopes });
 } catch (error) {
  res.status(500).json({ message: 'Server Error', error });
 }
}

const showTelescopeByIdController = async (req, res) => {
 const { id } = req.params;

 try {
  const findTelescopeById = await prisma.telescope.findUnique({
   where: { id: parseInt(id) },
   include: { telescopeType: true } });
  if (!findTelescopeById) throw new Error('Error obtaining telescope by id');

  res.status(200).json({ message: 'Loading telescope:', telescope: findTelescopeById });
 } catch (error) {
  res.status(500).json({ message: 'Server Erorr', error });
 }
}

export default {
 showTelescopesController,
 showTelescopeByIdController };