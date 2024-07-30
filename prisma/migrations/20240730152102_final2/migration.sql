/*
  Warnings:

  - You are about to drop the `actividades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `asignaciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bitacoras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `empresa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `matriculas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productiva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seguimientos` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `nombre_amb` on table `ambientes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `municipio` on table `ambientes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sede` on table `ambientes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estado` on table `ambientes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombre_area` on table `areas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `inicio_ficha` on table `fichas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fin_lectiva` on table `fichas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fin_ficha` on table `fichas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `programa` on table `fichas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sede` on table `fichas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estado` on table `fichas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fecha_inicio` on table `horarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hora_inicio` on table `horarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fecha_fin` on table `horarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hora_fin` on table `horarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dia` on table `horarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cantidad_horas` on table `horarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instructor` on table `horarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ficha` on table `horarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ambiente` on table `horarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estado` on table `horarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombre_mpio` on table `municipios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `departamento` on table `municipios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `identificacion` on table `personas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombres` on table `personas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `correo` on table `personas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefono` on table `personas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `personas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rol` on table `personas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cargo` on table `personas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `municipio` on table `personas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombre_programa` on table `programas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sigla` on table `programas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nivel` on table `programas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estado` on table `programas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instructor` on table `vinculacion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tipo` on table `vinculacion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sede` on table `vinculacion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `area` on table `vinculacion` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `actividades` DROP FOREIGN KEY `Actividades_productiva_fkey`;

-- DropForeignKey
ALTER TABLE `ambientes` DROP FOREIGN KEY `Ambientes_municipio_fkey`;

-- DropForeignKey
ALTER TABLE `asignaciones` DROP FOREIGN KEY `Asignaciones_instructor_fkey`;

-- DropForeignKey
ALTER TABLE `asignaciones` DROP FOREIGN KEY `Asignaciones_productiva_fkey`;

-- DropForeignKey
ALTER TABLE `bitacoras` DROP FOREIGN KEY `Bitacoras_seguimiento_fkey`;

-- DropForeignKey
ALTER TABLE `empresa` DROP FOREIGN KEY `Empresa_municipio_fkey`;

-- DropForeignKey
ALTER TABLE `fichas` DROP FOREIGN KEY `Fichas_programa_fkey`;

-- DropForeignKey
ALTER TABLE `horarios` DROP FOREIGN KEY `Horarios_ambiente_fkey`;

-- DropForeignKey
ALTER TABLE `horarios` DROP FOREIGN KEY `Horarios_ficha_fkey`;

-- DropForeignKey
ALTER TABLE `horarios` DROP FOREIGN KEY `Horarios_instructor_fkey`;

-- DropForeignKey
ALTER TABLE `matriculas` DROP FOREIGN KEY `Matriculas_aprendiz_fkey`;

-- DropForeignKey
ALTER TABLE `matriculas` DROP FOREIGN KEY `Matriculas_ficha_fkey`;

-- DropForeignKey
ALTER TABLE `personas` DROP FOREIGN KEY `Personas_municipio_fkey`;

-- DropForeignKey
ALTER TABLE `productiva` DROP FOREIGN KEY `Productiva_empresa_fkey`;

-- DropForeignKey
ALTER TABLE `productiva` DROP FOREIGN KEY `Productiva_matricula_fkey`;

-- DropForeignKey
ALTER TABLE `seguimientos` DROP FOREIGN KEY `Seguimientos_productiva_fkey`;

-- DropForeignKey
ALTER TABLE `vinculacion` DROP FOREIGN KEY `Vinculacion_area_fkey`;

-- DropForeignKey
ALTER TABLE `vinculacion` DROP FOREIGN KEY `Vinculacion_instructor_fkey`;

-- DropIndex
DROP INDEX `Personas_identificacion_key` ON `personas`;

-- AlterTable
ALTER TABLE `ambientes` MODIFY `nombre_amb` VARCHAR(80) NOT NULL,
    MODIFY `municipio` INTEGER NOT NULL,
    MODIFY `sede` ENUM('centro', 'yamboro') NOT NULL,
    MODIFY `estado` ENUM('activo', 'inactivo') NOT NULL;

-- AlterTable
ALTER TABLE `areas` MODIFY `nombre_area` VARCHAR(80) NOT NULL;

-- AlterTable
ALTER TABLE `fichas` MODIFY `inicio_ficha` DATETIME(3) NOT NULL,
    MODIFY `fin_lectiva` DATETIME(3) NOT NULL,
    MODIFY `fin_ficha` DATETIME(3) NOT NULL,
    MODIFY `programa` INTEGER NOT NULL,
    MODIFY `sede` ENUM('centro', 'yamboro') NOT NULL,
    MODIFY `estado` ENUM('Lectiva', 'Electiva', 'Finalizada') NOT NULL;

-- AlterTable
ALTER TABLE `horarios` MODIFY `fecha_inicio` DATETIME(3) NOT NULL,
    MODIFY `hora_inicio` DATETIME(3) NOT NULL,
    MODIFY `fecha_fin` DATETIME(3) NOT NULL,
    MODIFY `hora_fin` DATETIME(3) NOT NULL,
    MODIFY `dia` ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo') NOT NULL,
    MODIFY `cantidad_horas` INTEGER NOT NULL,
    MODIFY `instructor` INTEGER NOT NULL,
    MODIFY `ficha` INTEGER NOT NULL,
    MODIFY `ambiente` INTEGER NOT NULL,
    MODIFY `estado` ENUM('solicitud', 'aprobado', 'no_aprobado') NOT NULL;

-- AlterTable
ALTER TABLE `municipios` MODIFY `nombre_mpio` VARCHAR(80) NOT NULL,
    MODIFY `departamento` VARCHAR(80) NOT NULL;

-- AlterTable
ALTER TABLE `personas` MODIFY `identificacion` BIGINT NOT NULL,
    MODIFY `nombres` VARCHAR(80) NOT NULL,
    MODIFY `correo` VARCHAR(80) NOT NULL,
    MODIFY `telefono` VARCHAR(40) NOT NULL,
    MODIFY `password` VARCHAR(25) NOT NULL,
    MODIFY `rol` ENUM('Instructor', 'Coordinador', 'Lider') NOT NULL,
    MODIFY `cargo` ENUM('Instructor', 'Aprendiz', 'Coordinador') NOT NULL,
    MODIFY `municipio` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `programas` MODIFY `nombre_programa` VARCHAR(80) NOT NULL,
    MODIFY `sigla` VARCHAR(20) NOT NULL,
    MODIFY `nivel` ENUM('Tecnico', 'Tecnologo') NOT NULL,
    MODIFY `estado` ENUM('activo', 'inactivo') NOT NULL;

-- AlterTable
ALTER TABLE `vinculacion` MODIFY `instructor` INTEGER NOT NULL,
    MODIFY `tipo` ENUM('contratisca', 'planta') NOT NULL,
    MODIFY `sede` ENUM('centro', 'yamboro') NOT NULL,
    MODIFY `area` INTEGER NOT NULL;

-- DropTable
DROP TABLE `actividades`;

-- DropTable
DROP TABLE `asignaciones`;

-- DropTable
DROP TABLE `bitacoras`;

-- DropTable
DROP TABLE `empresa`;

-- DropTable
DROP TABLE `matriculas`;

-- DropTable
DROP TABLE `productiva`;

-- DropTable
DROP TABLE `seguimientos`;

-- AddForeignKey
ALTER TABLE `Horarios` ADD CONSTRAINT `Horarios_ficha_fkey` FOREIGN KEY (`ficha`) REFERENCES `Fichas`(`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horarios` ADD CONSTRAINT `Horarios_instructor_fkey` FOREIGN KEY (`instructor`) REFERENCES `Personas`(`id_persona`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horarios` ADD CONSTRAINT `Horarios_ambiente_fkey` FOREIGN KEY (`ambiente`) REFERENCES `Ambientes`(`id_ambiente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fichas` ADD CONSTRAINT `Fichas_programa_fkey` FOREIGN KEY (`programa`) REFERENCES `Programas`(`id_programa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ambientes` ADD CONSTRAINT `Ambientes_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipios`(`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vinculacion` ADD CONSTRAINT `Vinculacion_instructor_fkey` FOREIGN KEY (`instructor`) REFERENCES `Personas`(`id_persona`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vinculacion` ADD CONSTRAINT `Vinculacion_area_fkey` FOREIGN KEY (`area`) REFERENCES `Areas`(`id_area`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personas` ADD CONSTRAINT `Personas_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipios`(`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;
