-- CreateTable
CREATE TABLE `Actividades` (
    `id_actividad` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NULL,
    `evidencia` VARCHAR(191) NULL,
    `instructor` VARCHAR(191) NULL,
    `productiva` INTEGER NULL,

    INDEX `actividad_seguimiento`(`productiva`),
    PRIMARY KEY (`id_actividad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ambientes` (
    `id_ambiente` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_amb` VARCHAR(191) NULL,
    `municipio` INTEGER NULL,
    `sede` ENUM('centro', 'yamboro') NULL,
    `estado` ENUM('activo', 'inactivo') NULL,

    INDEX `municipio_ambiente`(`municipio`),
    PRIMARY KEY (`id_ambiente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Areas` (
    `id_area` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_area` VARCHAR(191) NULL,
    `ficha` INTEGER NULL,
    `municipio` INTEGER NULL,

    INDEX `area_municipio`(`municipio`),
    PRIMARY KEY (`id_area`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipios` (
    `id_municipio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_municipio` VARCHAR(191) NULL,
    `departamentos` INTEGER NULL,

    INDEX `municipio_departamento`(`departamentos`),
    PRIMARY KEY (`id_municipio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Personas` (
    `id_persona` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `apellido` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NULL,
    `municipio` INTEGER NULL,

    INDEX `municipio_persona`(`municipio`),
    PRIMARY KEY (`id_persona`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Productiva` (
    `id_productiva` INTEGER NOT NULL AUTO_INCREMENT,
    `area` INTEGER NULL,

    INDEX `productiva_area`(`area`),
    PRIMARY KEY (`id_productiva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seguimientos` (
    `id_seguimiento` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NULL,
    `seguimiento` VARCHAR(191) NULL,
    `productiva` INTEGER NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado') NULL,
    `archivo` VARCHAR(191) NULL,
    `instructor` VARCHAR(191) NULL,

    INDEX `matricula_aprenidiz`(`productiva`),
    PRIMARY KEY (`id_seguimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vinculacion` (
    `id_vinculacion` INTEGER NOT NULL AUTO_INCREMENT,
    `instructor` INTEGER NULL,
    `tipo` ENUM('contratisca', 'planta') NULL,
    `sede` ENUM('centro', 'yamboro') NULL,
    `area` INTEGER NULL,

    INDEX `vinculacion_area`(`area`),
    INDEX `vinculacion_horario`(`instructor`),
    PRIMARY KEY (`id_vinculacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departamento` (
    `id_departamento` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_departamento` VARCHAR(191) NULL,

    PRIMARY KEY (`id_departamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Actividades` ADD CONSTRAINT `Actividades_productiva_fkey` FOREIGN KEY (`productiva`) REFERENCES `Productiva`(`id_productiva`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ambientes` ADD CONSTRAINT `Ambientes_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipios`(`id_municipio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Areas` ADD CONSTRAINT `Areas_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipios`(`id_municipio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Municipios` ADD CONSTRAINT `Municipios_departamentos_fkey` FOREIGN KEY (`departamentos`) REFERENCES `Departamento`(`id_departamento`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Personas` ADD CONSTRAINT `Personas_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipios`(`id_municipio`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productiva` ADD CONSTRAINT `Productiva_area_fkey` FOREIGN KEY (`area`) REFERENCES `Areas`(`id_area`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seguimientos` ADD CONSTRAINT `Seguimientos_productiva_fkey` FOREIGN KEY (`productiva`) REFERENCES `Productiva`(`id_productiva`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vinculacion` ADD CONSTRAINT `Vinculacion_area_fkey` FOREIGN KEY (`area`) REFERENCES `Areas`(`id_area`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vinculacion` ADD CONSTRAINT `Vinculacion_instructor_fkey` FOREIGN KEY (`instructor`) REFERENCES `Personas`(`id_persona`) ON DELETE SET NULL ON UPDATE CASCADE;
