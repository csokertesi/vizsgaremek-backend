-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Gép: localhost:3306
-- Létrehozás ideje: 2026. Ápr 24. 16:13
-- Kiszolgáló verziója: 8.4.3
-- PHP verzió: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `kler`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `device`
--

CREATE TABLE `device` (
  `additional_details` text COLLATE utf8mb4_unicode_ci,
  `computer_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `debug_info` text COLLATE utf8mb4_unicode_ci,
  `id` int NOT NULL,
  `last_seen` datetime(3) DEFAULT NULL,
  `measure_interval` int NOT NULL DEFAULT '300',
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `site_id` int NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `wifi_password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wifi_ssid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `device`
--

INSERT INTO `device` (`additional_details`, `computer_type`, `debug_info`, `id`, `last_seen`, `measure_interval`, `name`, `site_id`, `status`, `wifi_password`, `wifi_ssid`) VALUES
(NULL, 'Raspberry Pi 4', NULL, 82, NULL, 300, 'Budapest-01', 42, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 83, NULL, 300, 'Budapest-02', 42, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 84, NULL, 300, 'Debrecen-01', 43, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 85, NULL, 300, 'Debrecen-02', 43, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 86, NULL, 300, 'Szeged-01', 44, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 87, NULL, 300, 'Szeged-02', 44, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 88, NULL, 300, 'Miskolc-01', 45, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 89, NULL, 300, 'Miskolc-02', 45, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 90, NULL, 300, 'Pécs-01', 46, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 91, NULL, 300, 'Pécs-02', 46, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 92, NULL, 300, 'Győr-01', 47, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 93, NULL, 300, 'Győr-02', 47, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 94, NULL, 300, 'Nyíregyháza-01', 48, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 95, NULL, 300, 'Nyíregyháza-02', 48, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 96, NULL, 300, 'Kecskemét-01', 49, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 97, NULL, 300, 'Kecskemét-02', 49, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 98, NULL, 300, 'Székesfehérvár-01', 50, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 99, NULL, 300, 'Székesfehérvár-02', 50, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 100, NULL, 300, 'Szombathely-01', 51, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 101, NULL, 300, 'Szombathely-02', 51, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 102, NULL, 300, 'Szolnok-01', 52, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 103, NULL, 300, 'Szolnok-02', 52, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 104, NULL, 300, 'Tatabánya-01', 53, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 105, NULL, 300, 'Tatabánya-02', 53, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 106, NULL, 300, 'Kaposvár-01', 54, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 107, NULL, 300, 'Kaposvár-02', 54, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 108, NULL, 300, 'Érd-01', 55, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 109, NULL, 300, 'Érd-02', 55, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 110, NULL, 300, 'Veszprém-01', 56, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 111, NULL, 300, 'Veszprém-02', 56, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 112, NULL, 300, 'Békéscsaba-01', 57, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 113, NULL, 300, 'Békéscsaba-02', 57, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 114, NULL, 300, 'Zalaegerszeg-01', 58, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 115, NULL, 300, 'Zalaegerszeg-02', 58, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 116, NULL, 300, 'Sopron-01', 59, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 117, NULL, 300, 'Sopron-02', 59, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 118, NULL, 300, 'Eger-01', 60, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 119, NULL, 300, 'Eger-02', 60, 'active', NULL, NULL),
(NULL, 'Raspberry Pi 4', NULL, 120, NULL, 300, 'Nagykanizsa-01', 61, 'active', NULL, NULL),
(NULL, 'ESP32', NULL, 121, NULL, 300, 'Nagykanizsa-02', 61, 'active', NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `measurement`
--

CREATE TABLE `measurement` (
  `id` int NOT NULL,
  `device_id` int NOT NULL,
  `timestamp` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `pm10` double NOT NULL,
  `pm4` double NOT NULL,
  `pm2_5` double NOT NULL,
  `pm1` double NOT NULL,
  `composition` text COLLATE utf8mb4_unicode_ci,
  `temp` double NOT NULL,
  `humidity` double NOT NULL,
  `wind_speed` double NOT NULL,
  `wind_dir` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dewpoint` double NOT NULL,
  `rain` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `measurement`
--

INSERT INTO `measurement` (`id`, `device_id`, `timestamp`, `pm10`, `pm4`, `pm2_5`, `pm1`, `composition`, `temp`, `humidity`, `wind_speed`, `wind_dir`, `dewpoint`, `rain`) VALUES
(242, 82, '2026-04-22 17:42:50.365', 26.5, 17.5, 5.5, 2.8, 'Városi szálló por.', 20.3, 40.6, 0.4, 'D', 8.1, 0),
(243, 82, '2026-04-22 16:42:50.368', 23.6, 13.2, 6.9, 3.8, 'Városi szálló por.', 18.9, 78.7, 10, 'É', 8.5, 0),
(244, 82, '2026-04-22 15:42:50.371', 40.8, 23.5, 8.4, 3.9, 'Városi szálló por.', 18.6, 47, 9.8, 'D', 9.7, 0),
(245, 83, '2026-04-22 17:42:50.374', 43.7, 11, 9.9, 7, 'Városi szálló por.', 19.9, 70.4, 4.1, 'D', 9.9, 0.9),
(246, 83, '2026-04-22 16:42:50.376', 35.1, 21.7, 5.1, 2.9, 'Városi szálló por.', 17.8, 40, 16.5, 'É', 6.7, 1.3),
(247, 83, '2026-04-22 15:42:50.379', 22.3, 19.5, 8.3, 2.6, 'Városi szálló por.', 24.8, 75.9, 20.1, 'É', 7, 0.5),
(248, 84, '2026-04-22 17:42:50.382', 30.2, 11.7, 12.6, 5, 'Városi szálló por.', 22.1, 78.7, 2.6, 'NY', 7.7, 0),
(249, 84, '2026-04-22 16:42:50.384', 28.9, 11.8, 11.6, 6.9, 'Városi szálló por.', 22.6, 40.4, 3.5, 'DK', 8.5, 1.4),
(250, 84, '2026-04-22 15:42:50.386', 30.6, 21, 11.3, 6.3, 'Városi szálló por.', 17.5, 57, 20.6, 'NY', 10, 0),
(251, 85, '2026-04-22 17:42:50.389', 32.1, 22, 11.7, 3.5, 'Városi szálló por.', 18.3, 75.3, 3.5, 'DK', 8.7, 0),
(252, 85, '2026-04-22 16:42:50.392', 15.8, 11.6, 9.5, 6.3, 'Városi szálló por.', 23.5, 46.2, 1.6, 'NY', 6, 0),
(253, 85, '2026-04-22 15:42:50.394', 25.6, 17.7, 10, 2.3, 'Városi szálló por.', 20.8, 46.3, 9.4, 'ÉNY', 6.4, 0),
(254, 86, '2026-04-22 17:42:50.396', 38.2, 14.9, 11.9, 6.2, 'Városi szálló por.', 17.7, 61.6, 8.5, 'ÉNY', 8.5, 0),
(255, 86, '2026-04-22 16:42:50.398', 18.4, 10.8, 10.7, 4.1, 'Városi szálló por.', 17.4, 57.8, 24.9, 'NY', 6.5, 0),
(256, 86, '2026-04-22 15:42:50.400', 17.1, 22.9, 7.9, 2.5, 'Városi szálló por.', 15.1, 58.9, 9.4, 'ÉNY', 9.4, 0),
(257, 87, '2026-04-22 17:42:50.402', 18.9, 20.8, 6.7, 5.5, 'Városi szálló por.', 22.1, 62.8, 7.2, 'ÉNY', 7.6, 0),
(258, 87, '2026-04-22 16:42:50.405', 37.2, 21.2, 13.6, 5.8, 'Városi szálló por.', 19.1, 58.8, 17.1, 'NY', 8.4, 0),
(259, 87, '2026-04-22 15:42:50.407', 21.4, 10.4, 5.8, 5.2, 'Városi szálló por.', 15.3, 51.1, 4.7, 'É', 8.5, 1.2),
(260, 88, '2026-04-22 17:42:50.409', 32.1, 23.6, 14.1, 3.3, 'Városi szálló por.', 20.1, 47.5, 22.4, 'D', 9.1, 0),
(261, 88, '2026-04-22 16:42:50.411', 33.8, 17, 7.7, 6, 'Városi szálló por.', 22.5, 63.5, 7, 'K', 7.1, 0),
(262, 88, '2026-04-22 15:42:50.414', 19.5, 14.2, 11.5, 4, 'Városi szálló por.', 17.2, 66.3, 8.8, 'K', 7.2, 0),
(263, 89, '2026-04-22 17:42:50.416', 37.4, 22.9, 12.7, 7, 'Városi szálló por.', 22, 78.3, 22.6, 'K', 8.7, 0),
(264, 89, '2026-04-22 16:42:50.419', 27.9, 13.9, 12.1, 3.3, 'Városi szálló por.', 20.2, 49.5, 17.6, 'ÉNY', 6.6, 0),
(265, 89, '2026-04-22 15:42:50.421', 45, 13.2, 13.2, 4.6, 'Városi szálló por.', 22.9, 79.1, 21.8, 'ÉNY', 8.8, 0),
(266, 90, '2026-04-22 17:42:50.424', 21.5, 18.7, 5.8, 3.2, 'Városi szálló por.', 22.7, 78.2, 10.1, 'DK', 8.1, 0),
(267, 90, '2026-04-22 16:42:50.427', 29.6, 23.5, 12.1, 3.4, 'Városi szálló por.', 22.2, 50.8, 18, 'D', 9.1, 0),
(268, 90, '2026-04-22 15:42:50.429', 19.8, 13.2, 14.7, 5.8, 'Városi szálló por.', 23.7, 45.3, 20.9, 'DK', 5.6, 0),
(269, 91, '2026-04-22 17:42:50.432', 29.8, 22.4, 11, 6.1, 'Városi szálló por.', 18.3, 46.6, 16.8, 'ÉNY', 7.7, 0),
(270, 91, '2026-04-22 16:42:50.433', 34.5, 16, 13.7, 6.6, 'Városi szálló por.', 24.6, 40.6, 14.9, 'K', 5.6, 0),
(271, 91, '2026-04-22 15:42:50.436', 27.6, 10.8, 14.2, 2.5, 'Városi szálló por.', 17.8, 79, 16, 'K', 9.4, 0),
(272, 92, '2026-04-22 17:42:50.438', 42.9, 20.9, 13.6, 7, 'Városi szálló por.', 19, 73.4, 6.9, 'É', 8.6, 0),
(273, 92, '2026-04-22 16:42:50.440', 34.8, 10.6, 6.7, 6.2, 'Városi szálló por.', 21.1, 67.3, 23.8, 'DK', 8.1, 0),
(274, 92, '2026-04-22 15:42:50.443', 17, 21.8, 10.2, 4.2, 'Városi szálló por.', 18, 40.5, 23.7, 'ÉNY', 8.3, 0),
(275, 93, '2026-04-22 17:42:50.445', 37.4, 12.8, 10.2, 3.4, 'Városi szálló por.', 21.8, 60.7, 20.6, 'DK', 9, 0),
(276, 93, '2026-04-22 16:42:50.447', 26.2, 20.4, 14.2, 7, 'Városi szálló por.', 15.6, 50, 12.1, 'K', 5.2, 1.1),
(277, 93, '2026-04-22 15:42:50.450', 22, 17.2, 7.8, 3.3, 'Városi szálló por.', 22.1, 50.7, 17.6, 'D', 5.1, 0),
(278, 94, '2026-04-22 17:42:50.453', 30, 13.5, 13.8, 3, 'Városi szálló por.', 17.2, 73.4, 13.5, 'D', 8.9, 0),
(279, 94, '2026-04-22 16:42:50.455', 37.1, 12.7, 11.7, 5.9, 'Városi szálló por.', 15.8, 44.3, 23.2, 'NY', 5.1, 0),
(280, 94, '2026-04-22 15:42:50.458', 39.7, 10.2, 14.3, 4.2, 'Városi szálló por.', 21.6, 79.5, 19.7, 'NY', 8.8, 0),
(281, 95, '2026-04-22 17:42:50.460', 21.2, 24.1, 14.7, 6.8, 'Városi szálló por.', 21.3, 77.1, 0.7, 'DK', 8.7, 0),
(282, 95, '2026-04-22 16:42:50.462', 20, 18.1, 12.8, 6.7, 'Városi szálló por.', 19.7, 41.5, 13.6, 'ÉNY', 8.6, 0),
(283, 95, '2026-04-22 15:42:50.465', 31.8, 13.5, 11.7, 2.8, 'Városi szálló por.', 16.8, 42.4, 7.9, 'D', 6.7, 0),
(284, 96, '2026-04-22 17:42:50.467', 44.6, 11.7, 13.7, 4.3, 'Városi szálló por.', 20.8, 64, 5.1, 'K', 7.1, 0),
(285, 96, '2026-04-22 16:42:50.470', 43.7, 23.6, 8.9, 5.6, 'Városi szálló por.', 17.4, 67.5, 15.9, 'D', 7.9, 0),
(286, 96, '2026-04-22 15:42:50.472', 38.5, 24.6, 9.8, 3.5, 'Városi szálló por.', 24.3, 70.7, 4.6, 'DK', 9.1, 0),
(287, 97, '2026-04-22 17:42:50.475', 16.1, 15, 13.8, 4.4, 'Városi szálló por.', 23.2, 41.9, 1.7, 'NY', 7.8, 0),
(288, 97, '2026-04-22 16:42:50.477', 22.7, 20.4, 10.8, 3.5, 'Városi szálló por.', 21.3, 60, 10.4, 'ÉNY', 7.6, 0),
(289, 97, '2026-04-22 15:42:50.480', 40.8, 10.3, 5.7, 5.2, 'Városi szálló por.', 20.4, 70.2, 13.9, 'DK', 7.1, 0),
(290, 98, '2026-04-22 17:42:50.482', 44, 14, 7.1, 4.3, 'Városi szálló por.', 24.3, 69.8, 6.8, 'K', 7.4, 0),
(291, 98, '2026-04-22 16:42:50.484', 27.6, 12.3, 7.1, 4.4, 'Városi szálló por.', 16.7, 68.2, 8.4, 'É', 8.7, 0),
(292, 98, '2026-04-22 15:42:50.486', 44, 22.1, 14.9, 4.8, 'Városi szálló por.', 16.8, 67.2, 10, 'ÉNY', 8.1, 0),
(293, 99, '2026-04-22 17:42:50.488', 37.4, 14.5, 11.3, 2.8, 'Városi szálló por.', 15.1, 42.8, 15, 'D', 8.4, 0),
(294, 99, '2026-04-22 16:42:50.490', 19.8, 24.9, 14.7, 5.5, 'Városi szálló por.', 20.3, 56.3, 3.4, 'ÉNY', 7.1, 0),
(295, 99, '2026-04-22 15:42:50.492', 36.3, 17.3, 12.6, 4.6, 'Városi szálló por.', 20.9, 45.1, 0.6, 'ÉNY', 7.5, 1.6),
(296, 100, '2026-04-22 17:42:50.494', 34.3, 12.5, 6.1, 2.6, 'Városi szálló por.', 22, 53.4, 4.1, 'NY', 9.6, 0),
(297, 100, '2026-04-22 16:42:50.496', 30.2, 16.5, 11.9, 2.3, 'Városi szálló por.', 21.5, 77, 23, 'K', 9.8, 0),
(298, 100, '2026-04-22 15:42:50.498', 24.4, 18.6, 12.6, 4.8, 'Városi szálló por.', 24.3, 67, 19.8, 'D', 9.4, 0),
(299, 101, '2026-04-22 17:42:50.500', 43.2, 22, 5.4, 5, 'Városi szálló por.', 23, 61.9, 13.9, 'NY', 5.6, 0),
(300, 101, '2026-04-22 16:42:50.501', 41.1, 13.9, 12.6, 6.5, 'Városi szálló por.', 23.7, 43.8, 18.6, 'ÉNY', 8, 0),
(301, 101, '2026-04-22 15:42:50.503', 35.9, 18, 11.3, 5.2, 'Városi szálló por.', 24.4, 54.9, 16.1, 'DK', 5.6, 0),
(302, 102, '2026-04-22 17:42:50.505', 21.3, 12.5, 8.4, 4.9, 'Városi szálló por.', 15.4, 75.3, 22.5, 'DK', 7.7, 0),
(303, 102, '2026-04-22 16:42:50.507', 36.1, 11.4, 6.9, 5.6, 'Városi szálló por.', 16.8, 41.5, 19.8, 'DK', 8.9, 0),
(304, 102, '2026-04-22 15:42:50.509', 24.7, 11.7, 10, 5, 'Városi szálló por.', 19.4, 55.4, 18.7, 'ÉNY', 8, 0),
(305, 103, '2026-04-22 17:42:50.512', 31.5, 18.4, 5.5, 4.9, 'Városi szálló por.', 20.9, 78.9, 17.4, 'D', 5.5, 0.6),
(306, 103, '2026-04-22 16:42:50.514', 22.1, 11.7, 9.8, 6.1, 'Városi szálló por.', 20.8, 53.7, 10.7, 'K', 7.6, 0),
(307, 103, '2026-04-22 15:42:50.515', 23.6, 18.4, 7.4, 6.8, 'Városi szálló por.', 21.1, 62.2, 1.1, 'ÉNY', 6.5, 0),
(308, 104, '2026-04-22 17:42:50.517', 17.4, 13, 11, 4, 'Városi szálló por.', 15.8, 71.9, 8.5, 'NY', 9.9, 0),
(309, 104, '2026-04-22 16:42:50.519', 36.7, 18.6, 8.3, 5.9, 'Városi szálló por.', 23.2, 78, 16.6, 'É', 9.7, 0),
(310, 104, '2026-04-22 15:42:50.521', 34, 18.4, 9.3, 2.1, 'Városi szálló por.', 23.1, 47.1, 18.4, 'DK', 9.8, 0),
(311, 105, '2026-04-22 17:42:50.523', 34, 24.1, 8.2, 2.4, 'Városi szálló por.', 15.7, 64.6, 4, 'D', 9.4, 0),
(312, 105, '2026-04-22 16:42:50.525', 24.5, 13.2, 5.3, 5.4, 'Városi szálló por.', 15.7, 59.5, 16.8, 'D', 5, 0),
(313, 105, '2026-04-22 15:42:50.528', 33.6, 15.4, 10, 3.5, 'Városi szálló por.', 19.2, 41.2, 19.4, 'É', 5.9, 0.3),
(314, 106, '2026-04-22 17:42:50.530', 43.6, 17.7, 14.9, 5.1, 'Városi szálló por.', 22.2, 67.7, 23.6, 'K', 5.5, 0),
(315, 106, '2026-04-22 16:42:50.532', 43.5, 22.4, 11.5, 4.4, 'Városi szálló por.', 17.8, 60.5, 24.3, 'É', 8, 0),
(316, 106, '2026-04-22 15:42:50.535', 42.7, 22.5, 7.5, 2.3, 'Városi szálló por.', 19.7, 66.8, 0.1, 'ÉNY', 5.4, 0),
(317, 107, '2026-04-22 17:42:50.537', 34.4, 10.8, 9.7, 3.1, 'Városi szálló por.', 19.3, 77.2, 18.1, 'D', 9.7, 0),
(318, 107, '2026-04-22 16:42:50.540', 22.5, 21.6, 14.6, 4.4, 'Városi szálló por.', 21.9, 79.5, 14.9, 'K', 6.5, 0),
(319, 107, '2026-04-22 15:42:50.542', 32.6, 10.6, 10.1, 6.2, 'Városi szálló por.', 20, 78.5, 20.8, 'D', 9.5, 0),
(320, 108, '2026-04-22 17:42:50.545', 18.9, 21.4, 5.3, 4.3, 'Városi szálló por.', 19.3, 78.2, 16.5, 'D', 6.1, 0),
(321, 108, '2026-04-22 16:42:50.547', 34.1, 18.6, 12.7, 3.5, 'Városi szálló por.', 21.6, 76.6, 8.4, 'É', 5.2, 0),
(322, 108, '2026-04-22 15:42:50.549', 21.4, 17.4, 10.4, 6.8, 'Városi szálló por.', 16, 77, 13.6, 'ÉNY', 9.2, 0),
(323, 109, '2026-04-22 17:42:50.551', 36.7, 21.7, 8.6, 2.8, 'Városi szálló por.', 22.7, 51.6, 9.4, 'DK', 9.8, 0),
(324, 109, '2026-04-22 16:42:50.553', 29.5, 18.3, 12.2, 2.8, 'Városi szálló por.', 16.4, 75.8, 2.3, 'K', 9.9, 0),
(325, 109, '2026-04-22 15:42:50.555', 21.5, 21, 6, 5.9, 'Városi szálló por.', 16.9, 64.6, 22.6, 'É', 6.4, 1.7),
(326, 110, '2026-04-22 17:42:50.558', 35.1, 23.7, 5.1, 2.3, 'Városi szálló por.', 18.4, 77, 18.5, 'ÉNY', 9.4, 0),
(327, 110, '2026-04-22 16:42:50.560', 31.6, 23.7, 12.6, 2.2, 'Városi szálló por.', 22.8, 41.3, 4.5, 'DK', 5.5, 0),
(328, 110, '2026-04-22 15:42:50.562', 30.7, 14.3, 8.9, 2.9, 'Városi szálló por.', 19.9, 59.6, 22.4, 'É', 6.5, 0),
(329, 111, '2026-04-22 17:42:50.564', 19.9, 17.4, 8.5, 2.7, 'Városi szálló por.', 23.5, 54.3, 7.4, 'K', 9.3, 0),
(330, 111, '2026-04-22 16:42:50.566', 17.9, 19.6, 9.5, 3, 'Városi szálló por.', 15.3, 65.9, 11.3, 'D', 8.7, 0),
(331, 111, '2026-04-22 15:42:50.569', 43.1, 17, 11.3, 6.6, 'Városi szálló por.', 18.7, 71.8, 3.5, 'ÉNY', 6.3, 0),
(332, 112, '2026-04-22 17:42:50.571', 20.3, 19.1, 6.1, 5.2, 'Városi szálló por.', 16.1, 59.2, 9, 'ÉNY', 6.7, 0),
(333, 112, '2026-04-22 16:42:50.573', 42.5, 12.7, 8.9, 2.8, 'Városi szálló por.', 21.7, 55.4, 20.7, 'DK', 8.9, 0),
(334, 112, '2026-04-22 15:42:50.575', 41.3, 12.9, 7.1, 4, 'Városi szálló por.', 18.8, 61.2, 18.9, 'ÉNY', 9.6, 0),
(335, 113, '2026-04-22 17:42:50.578', 24.6, 15.8, 5.2, 2.6, 'Városi szálló por.', 22.2, 46.9, 0.4, 'K', 7.2, 0),
(336, 113, '2026-04-22 16:42:50.580', 27, 13.6, 9, 4.8, 'Városi szálló por.', 22.3, 58.6, 22.7, 'K', 7.7, 0),
(337, 113, '2026-04-22 15:42:50.582', 21.6, 22.2, 7, 4, 'Városi szálló por.', 21, 72.8, 16.5, 'D', 6.9, 0),
(338, 114, '2026-04-22 17:42:50.584', 34.6, 18.2, 13.9, 2.5, 'Városi szálló por.', 18, 45.2, 1.6, 'K', 8.6, 1.3),
(339, 114, '2026-04-22 16:42:50.586', 39.7, 20.6, 7.1, 6.5, 'Városi szálló por.', 19.2, 50.3, 22.7, 'ÉNY', 6.3, 0),
(340, 114, '2026-04-22 15:42:50.588', 40.3, 24.6, 13.6, 4.7, 'Városi szálló por.', 22.6, 58.4, 14.8, 'K', 8.2, 1.4),
(341, 115, '2026-04-22 17:42:50.591', 37.2, 21.4, 10.2, 5.8, 'Városi szálló por.', 15.6, 54.6, 0.2, 'É', 6.5, 0),
(342, 115, '2026-04-22 16:42:50.593', 30.9, 21, 14.1, 3.3, 'Városi szálló por.', 19.7, 51.7, 4.8, 'É', 7.6, 0),
(343, 115, '2026-04-22 15:42:50.595', 27.2, 16.3, 5.3, 6.5, 'Városi szálló por.', 15.9, 61.4, 2.8, 'K', 8.4, 0),
(344, 116, '2026-04-22 17:42:50.597', 39.4, 13.3, 6.6, 5.2, 'Városi szálló por.', 18.9, 63.2, 8, 'É', 9, 1),
(345, 116, '2026-04-22 16:42:50.599', 27.8, 11.4, 10.9, 5.6, 'Városi szálló por.', 24.4, 70.7, 16.2, 'É', 5.9, 1.2),
(346, 116, '2026-04-22 15:42:50.602', 22.8, 19.7, 5.2, 2.3, 'Városi szálló por.', 16.4, 42, 0.4, 'É', 6.8, 0),
(347, 117, '2026-04-22 17:42:50.604', 16.8, 14, 6.6, 2.5, 'Városi szálló por.', 16.3, 74.8, 8.1, 'D', 5.2, 0.4),
(348, 117, '2026-04-22 16:42:50.606', 36, 15.5, 7.4, 6.3, 'Városi szálló por.', 23.8, 53.3, 12.6, 'D', 8, 0),
(349, 117, '2026-04-22 15:42:50.608', 41, 13.7, 7.4, 5.9, 'Városi szálló por.', 24.6, 45.6, 22, 'D', 7.1, 0),
(350, 118, '2026-04-22 17:42:50.610', 23.4, 20.2, 5.2, 2.3, 'Városi szálló por.', 20.2, 49.8, 21.1, 'ÉNY', 6.9, 0),
(351, 118, '2026-04-22 16:42:50.613', 39.8, 20.1, 10.2, 2.3, 'Városi szálló por.', 21.7, 57.1, 15.3, 'DK', 5.7, 0.3),
(352, 118, '2026-04-22 15:42:50.616', 34.6, 14.9, 5.3, 3.1, 'Városi szálló por.', 19.2, 42.1, 5, 'DK', 7.9, 1.1),
(353, 119, '2026-04-22 17:42:50.619', 17.6, 22, 9.9, 2.7, 'Városi szálló por.', 16.5, 69.3, 22, 'NY', 7.4, 0),
(354, 119, '2026-04-22 16:42:50.621', 41.7, 24.7, 8.2, 3.2, 'Városi szálló por.', 18.8, 70.9, 7.9, 'DK', 6.5, 0),
(355, 119, '2026-04-22 15:42:50.624', 34.7, 23.8, 6.4, 6.1, 'Városi szálló por.', 16.2, 79.8, 3.5, 'NY', 6.6, 0),
(356, 120, '2026-04-22 17:42:50.626', 24.1, 22, 14.4, 5.6, 'Városi szálló por.', 19, 48.3, 8.9, 'K', 7.3, 0),
(357, 120, '2026-04-22 16:42:50.629', 43.9, 13, 13.3, 4.2, 'Városi szálló por.', 24.8, 76.4, 18.5, 'D', 8.1, 0),
(358, 120, '2026-04-22 15:42:50.631', 21.4, 21.2, 6.7, 2.4, 'Városi szálló por.', 19.7, 59.6, 18.6, 'K', 7.9, 0),
(359, 121, '2026-04-22 17:42:50.634', 20.1, 16.4, 9.7, 4.3, 'Városi szálló por.', 20.3, 50.1, 22.1, 'ÉNY', 8.4, 0),
(360, 121, '2026-04-22 16:42:50.636', 42.6, 13.2, 11.9, 5.2, 'Városi szálló por.', 22.1, 60.9, 7.7, 'NY', 7.5, 0),
(361, 121, '2026-04-22 15:42:50.639', 43.6, 11, 8.8, 3.2, 'Városi szálló por.', 16.9, 63.5, 24.4, 'NY', 7.9, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `site`
--

CREATE TABLE `site` (
  `id` int NOT NULL,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `site`
--

INSERT INTO `site` (`id`, `lat`, `lon`, `name`) VALUES
(42, 47.4979, 19.0402, 'Budapest'),
(43, 47.5316, 21.6273, 'Debrecen'),
(44, 46.253, 20.1414, 'Szeged'),
(45, 48.1035, 20.7784, 'Miskolc'),
(46, 46.0727, 18.2323, 'Pécs'),
(47, 47.6875, 17.6504, 'Győr'),
(48, 47.9554, 21.7167, 'Nyíregyháza'),
(49, 46.8964, 19.6897, 'Kecskemét'),
(50, 47.186, 18.4221, 'Székesfehérvár'),
(51, 47.2307, 16.6218, 'Szombathely'),
(52, 47.175, 20.1833, 'Szolnok'),
(53, 47.5875, 18.4089, 'Tatabánya'),
(54, 46.3594, 17.7968, 'Kaposvár'),
(55, 47.3775, 18.9142, 'Érd'),
(56, 47.0929, 17.9135, 'Veszprém'),
(57, 46.6795, 21.0911, 'Békéscsaba'),
(58, 46.8417, 16.8417, 'Zalaegerszeg'),
(59, 47.6833, 16.5833, 'Sopron'),
(60, 47.9025, 20.3772, 'Eger'),
(61, 46.4583, 16.9917, 'Nagykanizsa');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `siteevaluation`
--

CREATE TABLE `siteevaluation` (
  `id` int NOT NULL,
  `site_id` int NOT NULL,
  `generated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `evaluation_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `generated_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ADMIN'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'admin', 'admin@example.com', '$2b$10$f62x31vZ09IVzVZqMcY8a..MMTa1IOe8IGYx.Cb1c3yfgPqsNjLlW', 'ADMIN'),
(3, 'postman_user_1776698214364', 'postman_user_1776698214364@example.com', '$2b$10$h9LwpLfCJK7jIJv7D1GzDeiGTP6PV0yIt8oAC.vTd8e2C01uXr4UO', 'USER'),
(4, 'user', 'user@example.com', '$2b$10$oIcge0ihiDJdacfCeI6u/..EoOboCQMb7sN1PWTpgV6Ny2TvSVZEy', 'USER');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Device_site_id_fkey` (`site_id`);

--
-- A tábla indexei `measurement`
--
ALTER TABLE `measurement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Measurement_device_id_fkey` (`device_id`);

--
-- A tábla indexei `site`
--
ALTER TABLE `site`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `siteevaluation`
--
ALTER TABLE `siteevaluation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SiteEvaluation_site_id_fkey` (`site_id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `device`
--
ALTER TABLE `device`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT a táblához `measurement`
--
ALTER TABLE `measurement`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=362;

--
-- AUTO_INCREMENT a táblához `site`
--
ALTER TABLE `site`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT a táblához `siteevaluation`
--
ALTER TABLE `siteevaluation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `device`
--
ALTER TABLE `device`
  ADD CONSTRAINT `Device_site_id_fkey` FOREIGN KEY (`site_id`) REFERENCES `site` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `measurement`
--
ALTER TABLE `measurement`
  ADD CONSTRAINT `Measurement_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `siteevaluation`
--
ALTER TABLE `siteevaluation`
  ADD CONSTRAINT `SiteEvaluation_site_id_fkey` FOREIGN KEY (`site_id`) REFERENCES `site` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
