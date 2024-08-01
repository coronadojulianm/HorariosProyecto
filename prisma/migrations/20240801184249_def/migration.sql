/*
  Warnings:

  - A unique constraint covering the columns `[correo]` on the table `Personas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Personas_correo_key` ON `Personas`(`correo`);
