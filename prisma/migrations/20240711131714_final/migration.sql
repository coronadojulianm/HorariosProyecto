/*
  Warnings:

  - You are about to drop the `actividad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ambiente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `area` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `asignacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bitacora` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ficha` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `horario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `matricula` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `municipio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `persona` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `programa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seguimiento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `actividad` DROP FOREIGN KEY `Actividad_productiva_fkey`;

-- DropForeignKey
ALTER TABLE `ambiente` DROP FOREIGN KEY `Ambiente_municipio_fkey`;

-- DropForeignKey
ALTER TABLE `asignacion` DROP FOREIGN KEY `Asignacion_instructor_fkey`;

-- DropForeignKey
ALTER TABLE `asignacion` DROP FOREIGN KEY `Asignacion_productiva_fkey`;

-- DropForeignKey
ALTER TABLE `bitacora` DROP FOREIGN KEY `Bitacora_seguimiento_fkey`;

-- DropForeignKey
ALTER TABLE `empresa` DROP FOREIGN KEY `Empresa_municipio_fkey`;

-- DropForeignKey
ALTER TABLE `ficha` DROP FOREIGN KEY `Ficha_programa_fkey`;

-- DropForeignKey
ALTER TABLE `horario` DROP FOREIGN KEY `Horario_ambiente_fkey`;

-- DropForeignKey
ALTER TABLE `horario` DROP FOREIGN KEY `Horario_ficha_fkey`;

-- DropForeignKey
ALTER TABLE `horario` DROP FOREIGN KEY `Horario_instructor_fkey`;

-- DropForeignKey
ALTER TABLE `matricula` DROP FOREIGN KEY `Matricula_aprendiz_fkey`;

-- DropForeignKey
ALTER TABLE `matricula` DROP FOREIGN KEY `Matricula_ficha_fkey`;

-- DropForeignKey
ALTER TABLE `persona` DROP FOREIGN KEY `Persona_municipio_fkey`;

-- DropForeignKey
ALTER TABLE `productiva` DROP FOREIGN KEY `Productiva_matricula_fkey`;

-- DropForeignKey
ALTER TABLE `seguimiento` DROP FOREIGN KEY `Seguimiento_productiva_fkey`;

-- DropForeignKey
ALTER TABLE `vinculacion` DROP FOREIGN KEY `Vinculacion_area_fkey`;

-- DropForeignKey
ALTER TABLE `vinculacion` DROP FOREIGN KEY `Vinculacion_instructor_fkey`;

-- DropTable
DROP TABLE `actividad`;

-- DropTable
DROP TABLE `ambiente`;

-- DropTable
DROP TABLE `area`;

-- DropTable
DROP TABLE `asignacion`;

-- DropTable
DROP TABLE `bitacora`;

-- DropTable
DROP TABLE `ficha`;

-- DropTable
DROP TABLE `horario`;

-- DropTable
DROP TABLE `matricula`;

-- DropTable
DROP TABLE `municipio`;

-- DropTable
DROP TABLE `persona`;

-- DropTable
DROP TABLE `programa`;

-- DropTable
DROP TABLE `seguimiento`;

-- CreateTable
CREATE TABLE `Actividades` (
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
CREATE TABLE `Ambientes` (
    `id_ambiente` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_amb` VARCHAR(80) NULL,
    `municipio` INTEGER NULL,
    `sede` ENUM('centro', 'yamboro') NULL,
    `estado` ENUM('activo', 'inactivo') NULL,

    INDEX `municipio_ambiente`(`municipio`),
    PRIMARY KEY (`id_ambiente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Areas` (
    `id_area` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_area` VARCHAR(80) NULL,

    PRIMARY KEY (`id_area`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asignaciones` (
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
CREATE TABLE `Bitacoras` (
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
CREATE TABLE `Fichas` (
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
CREATE TABLE `Horarios` (
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
CREATE TABLE `Matriculas` (
    `id_matricula` INTEGER NOT NULL AUTO_INCREMENT,
    `ficha` INTEGER NULL,
    `aprendiz` INTEGER NULL,
    `estado` ENUM('Induccion', 'Formacion', 'Condicionado', 'Cancelado', 'RetiroVoluntario', 'PorCertificar', 'Certificado') NULL,
    `pendiente_tecnicos` INTEGER NULL,
    `pendiente_transversales` INTEGER NULL,
    `pendiente_ingles` INTEGER NULL,

    INDEX `matriculas_personas`(`aprendiz`),
    UNIQUE INDEX `Matriculas_ficha_aprendiz_key`(`ficha`, `aprendiz`),
    PRIMARY KEY (`id_matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipios` (
    `id_municipio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_mpio` VARCHAR(80) NULL,
    `departamento` VARCHAR(80) NULL,

    PRIMARY KEY (`id_municipio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Personas` (
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
    UNIQUE INDEX `Personas_identificacion_key`(`identificacion`),
    PRIMARY KEY (`id_persona`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Programas` (
    `id_programa` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_programa` VARCHAR(80) NULL,
    `sigla` VARCHAR(20) NULL,
    `nivel` ENUM('Tecnico', 'Tecnologo', 'Auxiliar', 'Especializacion') NULL,
    `estado` ENUM('activo', 'inactivo') NULL,

    PRIMARY KEY (`id_programa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seguimientos` (
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

-- AddForeignKey
ALTER TABLE `Actividades` ADD CONSTRAINT `Actividades_productiva_fkey` FOREIGN KEY (`productiva`) REFERENCES `Productiva`(`id_productiva`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ambientes` ADD CONSTRAINT `Ambientes_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipios`(`id_municipio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asignaciones` ADD CONSTRAINT `Asignaciones_productiva_fkey` FOREIGN KEY (`productiva`) REFERENCES `Productiva`(`id_productiva`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asignaciones` ADD CONSTRAINT `Asignaciones_instructor_fkey` FOREIGN KEY (`instructor`) REFERENCES `Vinculacion`(`id_vinculacion`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bitacoras` ADD CONSTRAINT `Bitacoras_seguimiento_fkey` FOREIGN KEY (`seguimiento`) REFERENCES `Seguimientos`(`id_seguimiento`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresa` ADD CONSTRAINT `Empresa_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipios`(`id_municipio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fichas` ADD CONSTRAINT `Fichas_programa_fkey` FOREIGN KEY (`programa`) REFERENCES `Programas`(`id_programa`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horarios` ADD CONSTRAINT `Horarios_ambiente_fkey` FOREIGN KEY (`ambiente`) REFERENCES `Ambientes`(`id_ambiente`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horarios` ADD CONSTRAINT `Horarios_ficha_fkey` FOREIGN KEY (`ficha`) REFERENCES `Fichas`(`codigo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horarios` ADD CONSTRAINT `Horarios_instructor_fkey` FOREIGN KEY (`instructor`) REFERENCES `Vinculacion`(`id_vinculacion`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matriculas` ADD CONSTRAINT `Matriculas_ficha_fkey` FOREIGN KEY (`ficha`) REFERENCES `Fichas`(`codigo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matriculas` ADD CONSTRAINT `Matriculas_aprendiz_fkey` FOREIGN KEY (`aprendiz`) REFERENCES `Personas`(`id_persona`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personas` ADD CONSTRAINT `Personas_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipios`(`id_municipio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productiva` ADD CONSTRAINT `Productiva_matricula_fkey` FOREIGN KEY (`matricula`) REFERENCES `Matriculas`(`id_matricula`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seguimientos` ADD CONSTRAINT `Seguimientos_productiva_fkey` FOREIGN KEY (`productiva`) REFERENCES `Productiva`(`id_productiva`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vinculacion` ADD CONSTRAINT `Vinculacion_area_fkey` FOREIGN KEY (`area`) REFERENCES `Areas`(`id_area`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vinculacion` ADD CONSTRAINT `Vinculacion_instructor_fkey` FOREIGN KEY (`instructor`) REFERENCES `Personas`(`id_persona`) ON DELETE SET NULL ON UPDATE CASCADE;
