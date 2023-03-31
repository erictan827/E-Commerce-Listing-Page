-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mlion
CREATE DATABASE IF NOT EXISTS `mlion` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mlion`;

-- Dumping structure for table mlion.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mlion.products: ~10 rows (approximately)
INSERT INTO `products` (`id`, `name`, `description`, `price`, `category`, `images`, `created_at`) VALUES
	(1, 'Lakers Kobe Bryant 24', 'Mamba Mentality', '248', 'Clothing', 'kobe_bryant_jersey.jpg', '2023-02-22 05:42:31'),
	(2, 'iPhone 12', '2020 made in china', '3499', 'Electronics', 'iphone_12.png', '2023-02-20 18:01:10'),
	(3, 'Huawei Watch Fit 2', 'Huawei China', '414', 'Electronics', 'huawei_watch_fit_2.jpg', '2023-02-15 11:22:45'),
	(4, 'BZEBI 18k Gold Plated', 'Korean Women Girls Gift', '389', 'Jewelry', 'Jewelry_Bzebi.jpg', '2023-02-17 19:54:23'),
	(5, 'AirPod 3', 'Apple Earphone', '789', 'Electronics', 'airpod_3.jpg', '2023-02-23 12:47:11'),
	(6, 'Denim shorts women', 'Boho, Minimalist, Retro, Sexy', '42', 'Clothing', 'shorts_women.jpg', '2023-02-23 12:48:59'),
	(7, 'Kobee 6 Protro Green', 'Nike Kobe 6 Protro - \'Green Apple\'', '2159', 'Shoe', 'kobe_sneakers.jpg', '2023-02-23 12:51:20'),
	(8, 'Fulllove Basketball Clothes', 'Women\'s Loose-Fit Mock', '20', 'Clothing', 'basketball_girl_cloth.jpg', '2023-02-23 12:52:38'),
	(9, 'MacBook Pro 2021', '14-inch, M1 Pro chip with 10‑core CPU and  16‑core GPU, 16GB RAM, 1TB SSD', '6499', 'Electronics', 'macbook_pro.jpg', '2023-02-23 12:54:22'),
	(10, 'Fiba Basketball', 'National Basketball Assiocation Verificed', '59', 'Sports', 'fiba_basketball.jpg', '2023-02-23 12:55:44');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
