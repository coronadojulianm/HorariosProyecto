-- AlterTable
ALTER TABLE `areas` ADD COLUMN `lider` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Areas` ADD CONSTRAINT `Areas_lider_fkey` FOREIGN KEY (`lider`) REFERENCES `Personas`(`id_persona`) ON DELETE SET NULL ON UPDATE CASCADE;
