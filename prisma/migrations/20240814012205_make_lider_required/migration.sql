/*
  Warnings:

  - Made the column `lider` on table `areas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `areas` DROP FOREIGN KEY `Areas_lider_fkey`;

-- AlterTable
ALTER TABLE `areas` MODIFY `lider` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Areas` ADD CONSTRAINT `Areas_lider_fkey` FOREIGN KEY (`lider`) REFERENCES `Personas`(`id_persona`) ON DELETE RESTRICT ON UPDATE CASCADE;
