/*
  Warnings:

  - A unique constraint covering the columns `[identificacion]` on the table `Personas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Personas_identificacion_key` ON `Personas`(`identificacion`);
