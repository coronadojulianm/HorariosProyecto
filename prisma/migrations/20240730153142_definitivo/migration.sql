-- DropForeignKey
ALTER TABLE `horarios` DROP FOREIGN KEY `Horarios_instructor_fkey`;

-- AddForeignKey
ALTER TABLE `Horarios` ADD CONSTRAINT `Horarios_instructor_fkey` FOREIGN KEY (`instructor`) REFERENCES `Vinculacion`(`id_vinculacion`) ON DELETE RESTRICT ON UPDATE CASCADE;
