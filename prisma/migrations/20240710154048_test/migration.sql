/*
  Warnings:

  - You are about to drop the column `area` on the `productiva` table. All the data in the column will be lost.
  - The values [contratisca,planta] on the enum `Vinculacion_tipo` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `actividades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ambientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `areas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `departamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `municipios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `personas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seguimientos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `actividades` DROP FOREIGN KEY `Actividades_productiva_fkey`;

-- DropForeignKey
ALTER TABLE `ambientes` DROP FOREIGN KEY `Ambientes_municipio_fkey`;

-- DropForeignKey
ALTER TABLE `areas` DROP FOREIGN KEY `Areas_municipio_fkey`;

-- DropForeignKey
ALTER TABLE `municipios` DROP FOREIGN KEY `Municipios_departamentos_fkey`;

-- DropForeignKey
ALTER TABLE `personas` DROP FOREIGN KEY `Personas_municipio_fkey`;

-- DropForeignKey
ALTER TABLE `productiva` DROP FOREIGN KEY `Productiva_area_fkey`;

-- DropForeignKey
ALTER TABLE `seguimientos` DROP FOREIGN KEY `Seguimientos_productiva_fkey`;

-- DropForeignKey
ALTER TABLE `vinculacion` DROP FOREIGN KEY `Vinculacion_area_fkey`;

-- DropForeignKey
ALTER TABLE `vinculacion` DROP FOREIGN KEY `Vinculacion_instructor_fkey`;

-- AlterTable
ALTER TABLE `productiva` DROP COLUMN `area`,
    ADD COLUMN `acuerdo` VARCHAR(100) NULL,
    ADD COLUMN `alternativa` ENUM('Contrato_de_Aprendizaje', 'Proyecto_Productivo', 'Pasantias', 'Monitoria') NULL,
    ADD COLUMN `arl` VARCHAR(100) NULL,
    ADD COLUMN `consulta` VARCHAR(100) NULL,
    ADD COLUMN `empresa` INTEGER NULL,
    ADD COLUMN `estado` ENUM('Inicio', 'Renuncia', 'Terminado') NULL,
    ADD COLUMN `fecha_fin` DATETIME(3) NULL,
    ADD COLUMN `fecha_inicio` DATETIME(3) NULL,
    ADD COLUMN `matricula` INTEGER NULL;

-- AlterTable
ALTER TABLE `vinculacion` MODIFY `tipo` ENUM('Vinculacion', 'Contratista') NULL;

-- DropTable
DROP TABLE `actividades`;

-- DropTable
DROP TABLE `ambientes`;

-- DropTable
DROP TABLE `areas`;

-- DropTable
DROP TABLE `departamento`;

-- DropTable
DROP TABLE `municipios`;

-- DropTable
DROP TABLE `personas`;

-- DropTable
DROP TABLE `seguimientos`;

-- CreateTable
CREATE TABLE `Actividad` (
    `id_actividad` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NULL,
    `fecha` DATETIME(3) NULL,
    `evidencia` VARCHAR(100) NULL,
    `instructor` VARCHAR(50) NULL,
    `productiva` INTEGER NULL,

    INDEX `actividad_seguimiento`(`productiva`),
    PRIMARY KEY (`id_actividad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ambiente` (
    `id_ambiente` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_amb` VARCHAR(80) NULL,
    `municipio` INTEGER NULL,
    `sede` ENUM('centro', 'yamboro') NULL,
    `estado` ENUM('activo', 'inactivo') NULL,

    INDEX `municipio_ambiente`(`municipio`),
    PRIMARY KEY (`id_ambiente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Area` (
    `id_area` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_area` VARCHAR(80) NULL,

    PRIMARY KEY (`id_area`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asignacion` (
    `id_asignacion` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_inicio` DATETIME(3) NULL,
    `fecha_fin` DATETIME(3) NULL,
    `productiva` INTEGER NULL,
    `instructor` INTEGER NULL,
    `estado` ENUM('Activo', 'Inactivo') NULL,

    INDEX `asignacion_vinculacacion`(`instructor`),
    INDEX `asignacion_practica`(`productiva`),
    PRIMARY KEY (`id_asignacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bitacora` (
    `id_bitacora` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NULL,
    `bitacora` ENUM('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE') NULL,
    `seguimiento` INTEGER NULL,
    `archivo` VARCHAR(100) NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado') NULL,
    `instructor` VARCHAR(50) NULL,

    INDEX `seguimiento_bitacora`(`seguimiento`),
    PRIMARY KEY (`id_bitacora`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa` (
    `id_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `razon_social` VARCHAR(80) NULL,
    `direccion` VARCHAR(80) NULL,
    `telefono` VARCHAR(20) NULL,
    `correo` VARCHAR(80) NULL,
    `municipio` INTEGER NULL,
    `estado` ENUM('activo', 'inactivo') NULL,

    INDEX `empresa_minicipio`(`municipio`),
    PRIMARY KEY (`id_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ficha` (
    `codigo` INTEGER NOT NULL,
    `inicio_ficha` DATETIME(3) NULL,
    `fin_lectiva` DATETIME(3) NULL,
    `fin_ficha` DATETIME(3) NULL,
    `programa` INTEGER NULL,
    `sede` ENUM('centro', 'yamboro') NULL,
    `estado` ENUM('activa', 'terminada') NULL,

    INDEX `ficha_programa`(`programa`),
    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario` (
    `id_horario` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_inicio` DATETIME(3) NULL,
    `hora_inicio` TIME NULL,
    `fecha_fin` DATETIME(3) NULL,
    `hora_fin` TIME NULL,
    `dia` ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabados', 'domingo') NULL,
    `cantidad_horas` INTEGER NULL,
    `instructor` INTEGER NULL,
    `ficha` INTEGER NULL,
    `ambiente` INTEGER NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado') NULL,

    INDEX `hoario_ambiente`(`ambiente`),
    INDEX `horario_ficha`(`ficha`),
    INDEX `vinculacion_horario`(`instructor`),
    PRIMARY KEY (`id_horario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matricula` (
    `id_matricula` INTEGER NOT NULL AUTO_INCREMENT,
    `ficha` INTEGER NULL,
    `aprendiz` INTEGER NULL,
    `estado` ENUM('Induccion', 'Formacion', 'Condicionado', 'Cancelado', 'RetiroVoluntario', 'PorCertificar', 'Certificado') NULL,
    `pendiente_tecnicos` INTEGER NULL,
    `pendiente_transversales` INTEGER NULL,
    `pendiente_ingles` INTEGER NULL,

    INDEX `matriculas_personas`(`aprendiz`),
    UNIQUE INDEX `Matricula_ficha_aprendiz_key`(`ficha`, `aprendiz`),
    PRIMARY KEY (`id_matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipio` (
    `id_municipio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_mpio` VARCHAR(80) NULL,
    `departamento` VARCHAR(80) NULL,

    PRIMARY KEY (`id_municipio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Persona` (
    `id_persona` INTEGER NOT NULL AUTO_INCREMENT,
    `identificacion` BIGINT NULL,
    `nombres` VARCHAR(80) NULL,
    `correo` VARCHAR(80) NULL,
    `telefono` VARCHAR(40) NULL,
    `password` VARCHAR(25) NULL,
    `rol` ENUM('Instructor', 'Coordinador', 'Lider', 'Seguimiento') NULL,
    `cargo` ENUM('Instructor', 'Aprendiz', 'Coordinador', 'Administrativo') NULL,
    `municipio` INTEGER NULL,

    INDEX `persona_municipio`(`municipio`),
    UNIQUE INDEX `Persona_identificacion_key`(`identificacion`),
    PRIMARY KEY (`id_persona`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Programa` (
    `id_programa` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_programa` VARCHAR(80) NULL,
    `sigla` VARCHAR(20) NULL,
    `nivel` ENUM('Tecnico', 'Tecnologo', 'Auxiliar', 'Especializacion') NULL,
    `estado` ENUM('activo', 'inactivo') NULL,

    PRIMARY KEY (`id_programa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seguimiento` (
    `id_seguimiento` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NULL,
    `seguimiento` ENUM('visita', 'llamada', 'documento', 'otra') NULL,
    `productiva` INTEGER NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado') NULL,
    `archivo` VARCHAR(100) NULL,
    `instructor` VARCHAR(50) NULL,

    INDEX `matricula_aprenidiz`(`productiva`),
    PRIMARY KEY (`id_seguimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `empresa_matricula` ON `Productiva`(`empresa`);

-- CreateIndex
CREATE INDEX `aprendiz_matricula` ON `Productiva`(`matricula`);

-- AddForeignKey
ALTER TABLE `Actividad` ADD CONSTRAINT `Actividad_productiva_fkey` FOREIGN KEY (`productiva`) REFERENCES `Productiva`(`id_productiva`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ambiente` ADD CONSTRAINT `Ambiente_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipio`(`id_municipio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asignacion` ADD CONSTRAINT `Asignacion_productiva_fkey` FOREIGN KEY (`productiva`) REFERENCES `Productiva`(`id_productiva`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asignacion` ADD CONSTRAINT `Asignacion_instructor_fkey` FOREIGN KEY (`instructor`) REFERENCES `Vinculacion`(`id_vinculacion`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bitacora` ADD CONSTRAINT `Bitacora_seguimiento_fkey` FOREIGN KEY (`seguimiento`) REFERENCES `Seguimiento`(`id_seguimiento`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresa` ADD CONSTRAINT `Empresa_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipio`(`id_municipio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ficha` ADD CONSTRAINT `Ficha_programa_fkey` FOREIGN KEY (`programa`) REFERENCES `Programa`(`id_programa`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_ambiente_fkey` FOREIGN KEY (`ambiente`) REFERENCES `Ambiente`(`id_ambiente`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_ficha_fkey` FOREIGN KEY (`ficha`) REFERENCES `Ficha`(`codigo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_instructor_fkey` FOREIGN KEY (`instructor`) REFERENCES `Vinculacion`(`id_vinculacion`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_ficha_fkey` FOREIGN KEY (`ficha`) REFERENCES `Ficha`(`codigo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_aprendiz_fkey` FOREIGN KEY (`aprendiz`) REFERENCES `Persona`(`id_persona`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Persona` ADD CONSTRAINT `Persona_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipio`(`id_municipio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productiva` ADD CONSTRAINT `Productiva_matricula_fkey` FOREIGN KEY (`matricula`) REFERENCES `Matricula`(`id_matricula`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productiva` ADD CONSTRAINT `Productiva_empresa_fkey` FOREIGN KEY (`empresa`) REFERENCES `Empresa`(`id_empresa`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seguimiento` ADD CONSTRAINT `Seguimiento_productiva_fkey` FOREIGN KEY (`productiva`) REFERENCES `Productiva`(`id_productiva`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vinculacion` ADD CONSTRAINT `Vinculacion_area_fkey` FOREIGN KEY (`area`) REFERENCES `Area`(`id_area`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vinculacion` ADD CONSTRAINT `Vinculacion_instructor_fkey` FOREIGN KEY (`instructor`) REFERENCES `Persona`(`id_persona`) ON DELETE SET NULL ON UPDATE CASCADE;
