-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelescopeType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TelescopeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telescope" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "telescopeTypeId" INTEGER NOT NULL,

    CONSTRAINT "Telescope_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Telescope" ADD CONSTRAINT "Telescope_telescopeTypeId_fkey" FOREIGN KEY ("telescopeTypeId") REFERENCES "TelescopeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
