-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 23-07-2024 a las 21:43:59
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sena`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ambientes`
--

CREATE TABLE `ambientes` (
  `id_ambiente` int NOT NULL,
  `nombre_amb` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `municipio` int NOT NULL,
  `sede` enum('centro','Yamboro') COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` enum('activo','inactivo') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `ambientes`
--

INSERT INTO `ambientes` (`id_ambiente`, `nombre_amb`, `municipio`, `sede`, `estado`) VALUES
(1, 'Y-10', 1, 'Yamboro', 'activo'),
(2, 'Y-12', 1, 'Yamboro', 'activo'),
(3, 'C-12', 1, 'centro', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `id_area` int NOT NULL,
  `nombre_area` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`id_area`, `nombre_area`) VALUES
(1, 'TIC'),
(2, 'PAE'),
(3, 'Bioconstrucción');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichas`
--

CREATE TABLE `fichas` (
  `codigo` int NOT NULL,
  `inicio_fecha` datetime(3) NOT NULL,
  `fin_lectiva` datetime(3) NOT NULL,
  `fin_ficha` datetime(3) NOT NULL,
  `programa` int NOT NULL,
  `sede` enum('centro','Yamboro') COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` enum('lectiva','electiva','finalizada') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `fichas`
--

INSERT INTO `fichas` (`codigo`, `inicio_fecha`, `fin_lectiva`, `fin_ficha`, `programa`, `sede`, `estado`) VALUES
(12345, '2024-08-01 00:00:00.000', '2025-05-01 00:00:00.000', '2025-06-01 00:00:00.000', 1, 'centro', 'lectiva'),
(232323, '2024-08-01 00:00:00.000', '2025-05-01 00:00:00.000', '2025-06-01 00:00:00.000', 3, 'centro', 'lectiva'),
(2644590, '2022-10-02 13:43:34.000', '2024-07-17 13:43:34.000', '2025-02-01 13:43:34.000', 1, 'Yamboro', 'lectiva'),
(2977321, '2024-07-03 13:43:34.000', '2025-07-17 13:43:34.000', '2026-04-01 13:43:34.000', 3, 'Yamboro', 'finalizada'),
(2992929, '2024-08-01 00:00:00.000', '2025-05-01 00:00:00.000', '2025-06-01 00:00:00.000', 3, 'centro', 'lectiva'),
(21212121, '2024-08-01 00:00:00.000', '2025-05-01 00:00:00.000', '2025-06-01 00:00:00.000', 3, 'centro', 'lectiva');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id_horario` int NOT NULL,
  `fecha_inicio` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `hora_inicio` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_fin` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `hora_fin` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dia` enum('lunes','martes','miercoles','jueves','viernes','sabado','domingo') COLLATE utf8mb4_unicode_ci NOT NULL,
  `cantidad_horas` int NOT NULL,
  `instructor` int NOT NULL,
  `ficha` int NOT NULL,
  `ambiente` int NOT NULL,
  `estado` enum('solicitud','aprobado','noaprobado') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id_horario`, `fecha_inicio`, `hora_inicio`, `fecha_fin`, `hora_fin`, `dia`, `cantidad_horas`, `instructor`, `ficha`, `ambiente`, `estado`) VALUES
(1, '2024-07-23 13:47:38.000', '1:00 pm', '2024-07-23 13:47:38.000', '5:00 pm', 'martes', 5, 1, 2644590, 1, 'solicitud'),
(2, '2024-07-23 13:47:38.000', '1:00 pm ', '2024-07-23 13:47:38.000', '5:00 pm ', 'martes', 5, 2, 2977321, 3, 'aprobado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipios`
--

CREATE TABLE `municipios` (
  `id_municipio` int NOT NULL,
  `nombre_mpio` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `departamento` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `municipios`
--

INSERT INTO `municipios` (`id_municipio`, `nombre_mpio`, `departamento`) VALUES
(1, 'Pitalito', 'Huila'),
(2, 'San Agustin', 'Huila'),
(3, 'Acevedo', 'Huila'),
(4, 'Rosas', 'Cauca'),
(5, 'Florencia', 'Caqueta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id_persona` int NOT NULL,
  `identificacion` int NOT NULL,
  `nombres` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol` enum('Administrador','Instructor','Coordinador','Lider') COLLATE utf8mb4_unicode_ci NOT NULL,
  `cargo` enum('Instructor','Aprendiz','Coordinador') COLLATE utf8mb4_unicode_ci NOT NULL,
  `municipio` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id_persona`, `identificacion`, `nombres`, `correo`, `telefono`, `password`, `rol`, `cargo`, `municipio`) VALUES
(1, 1938928, 'Carlos', 'c@gmail.com', '3123121', '1234', 'Instructor', 'Instructor', 1),
(2, 127712, 'Diego', 'diego@gmail.com', '31211221', '1232', 'Coordinador', 'Coordinador', 3),
(4, 111111, 'Juan Pérez', 'juan.perez@gmail.com', '3124567890', 'password123', 'Administrador', 'Instructor', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programas`
--

CREATE TABLE `programas` (
  `id_programa` int NOT NULL,
  `nombre_programa` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sigla` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nivel` enum('Tecnico','Tecnologo') COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` enum('activo','inactivo') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `programas`
--

INSERT INTO `programas` (`id_programa`, `nombre_programa`, `sigla`, `nivel`, `estado`) VALUES
(1, 'Analisis y Desarrollo de Software', 'ADSO', 'Tecnologo', 'activo'),
(2, 'Multimedia', 'Multimedia', 'Tecnologo', 'activo'),
(3, 'Dibujo Arquitectónico', 'Dibujo', 'Tecnico', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vinculacion`
--

CREATE TABLE `vinculacion` (
  `id_vinculacion` int NOT NULL,
  `instructor` int NOT NULL,
  `tipo` enum('contratista','planta') COLLATE utf8mb4_unicode_ci NOT NULL,
  `sede` enum('centro','Yamboro') COLLATE utf8mb4_unicode_ci NOT NULL,
  `area` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `vinculacion`
--

INSERT INTO `vinculacion` (`id_vinculacion`, `instructor`, `tipo`, `sede`, `area`) VALUES
(1, 1, 'contratista', 'Yamboro', 1),
(2, 2, 'planta', 'centro', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('1bc941c1-4d22-4ab7-8e02-5237d95a7aa3', 'def8d605deffe32adf0c44c24d8919f8dfac68e97013d98b9d54cddec2837528', '2024-07-23 16:06:58.756', '20240723160657_sena', NULL, NULL, '2024-07-23 16:06:57.888', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ambientes`
--
ALTER TABLE `ambientes`
  ADD PRIMARY KEY (`id_ambiente`),
  ADD KEY `Ambientes_municipio_fkey` (`municipio`);

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id_area`);

--
-- Indices de la tabla `fichas`
--
ALTER TABLE `fichas`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `Fichas_programa_fkey` (`programa`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id_horario`),
  ADD KEY `Horarios_ficha_fkey` (`ficha`),
  ADD KEY `Horarios_ambiente_fkey` (`ambiente`),
  ADD KEY `Horarios_instructor_fkey` (`instructor`);

--
-- Indices de la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD PRIMARY KEY (`id_municipio`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id_persona`),
  ADD UNIQUE KEY `Personas_identificacion_key` (`identificacion`),
  ADD KEY `Personas_municipio_fkey` (`municipio`);

--
-- Indices de la tabla `programas`
--
ALTER TABLE `programas`
  ADD PRIMARY KEY (`id_programa`);

--
-- Indices de la tabla `vinculacion`
--
ALTER TABLE `vinculacion`
  ADD PRIMARY KEY (`id_vinculacion`),
  ADD UNIQUE KEY `Vinculacion_instructor_key` (`instructor`),
  ADD KEY `Vinculacion_area_fkey` (`area`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ambientes`
--
ALTER TABLE `ambientes`
  MODIFY `id_ambiente` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `id_area` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id_horario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios`
  MODIFY `id_municipio` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id_persona` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `programas`
--
ALTER TABLE `programas`
  MODIFY `id_programa` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `vinculacion`
--
ALTER TABLE `vinculacion`
  MODIFY `id_vinculacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ambientes`
--
ALTER TABLE `ambientes`
  ADD CONSTRAINT `Ambientes_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `municipios` (`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `fichas`
--
ALTER TABLE `fichas`
  ADD CONSTRAINT `Fichas_programa_fkey` FOREIGN KEY (`programa`) REFERENCES `programas` (`id_programa`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD CONSTRAINT `Horarios_ambiente_fkey` FOREIGN KEY (`ambiente`) REFERENCES `ambientes` (`id_ambiente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Horarios_ficha_fkey` FOREIGN KEY (`ficha`) REFERENCES `fichas` (`codigo`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Horarios_instructor_fkey` FOREIGN KEY (`instructor`) REFERENCES `vinculacion` (`id_vinculacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `Personas_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `municipios` (`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `vinculacion`
--
ALTER TABLE `vinculacion`
  ADD CONSTRAINT `Vinculacion_area_fkey` FOREIGN KEY (`area`) REFERENCES `areas` (`id_area`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Vinculacion_instructor_fkey` FOREIGN KEY (`instructor`) REFERENCES `personas` (`id_persona`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
