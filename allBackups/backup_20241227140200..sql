-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: ToyRentalManagementSystem
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clerks`
--

DROP TABLE IF EXISTS `clerks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clerks` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `cname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clerks`
--

LOCK TABLES `clerks` WRITE;
/*!40000 ALTER TABLE `clerks` DISABLE KEYS */;
INSERT INTO `clerks` VALUES (1,'职员名 1','2024-12-13 15:51:08','2024-12-13 15:51:08'),(2,'职员名 2','2024-12-13 15:51:08','2024-12-13 15:51:08'),(3,'职员名 3','2024-12-13 15:51:08','2024-12-13 15:51:08'),(4,'职员名 4','2024-12-13 15:51:08','2024-12-13 15:51:08'),(5,'职员名 5','2024-12-13 15:51:08','2024-12-13 15:51:08'),(6,'职员名 6','2024-12-13 15:51:08','2024-12-13 15:51:08'),(7,'职员名 7','2024-12-13 15:51:08','2024-12-13 15:51:08'),(10,'阿斯蒂芬123','2024-12-13 15:51:08','2024-12-26 15:27:37');
/*!40000 ALTER TABLE `clerks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `mname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `registerTime` datetime NOT NULL,
  `deposit` int unsigned NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (3,'会员 3','电话号码 3','2024-12-13 00:00:00',10,'2024-12-13 15:42:18','2024-12-26 15:23:01'),(4,'会员 4','电话号码 4','2024-12-13 15:42:18',37,'2024-12-13 15:42:18','2024-12-13 15:42:18'),(5,'会员 5','电话号码 5','2024-12-13 15:42:18',55,'2024-12-13 15:42:18','2024-12-13 15:42:18'),(6,'会员 6','电话号码 6','2024-12-13 15:42:18',65,'2024-12-13 15:42:18','2024-12-27 00:39:58'),(7,'会员 7','电话号码 7','2024-12-13 15:42:18',34,'2024-12-13 15:42:18','2024-12-13 15:42:18'),(8,'会员 8','电话号码 8','2024-12-13 15:42:18',63,'2024-12-13 15:42:18','2024-12-13 15:42:18'),(9,'会员 9','电话号码 9','2024-12-13 15:42:18',88,'2024-12-13 15:42:18','2024-12-13 15:42:18'),(10,'会员 10','电话号码 10','2024-12-13 15:42:18',12,'2024-12-13 15:42:18','2024-12-13 15:42:18'),(11,'会员 11','电话号码 11','2024-12-13 15:42:18',52,'2024-12-13 15:42:18','2024-12-13 15:42:18'),(12,'会员 12','电话号码 12','2024-12-13 15:42:18',88,'2024-12-13 15:42:18','2024-12-27 11:55:24'),(13,'会员 13','电话号码 13','2024-12-13 15:42:18',71,'2024-12-13 15:42:18','2024-12-13 15:42:18'),(14,'会员 14','电话号码 14','2024-12-13 15:42:18',69,'2024-12-13 15:42:18','2024-12-13 15:42:18'),(15,'会员 15','电话号码 15','2024-12-13 15:42:18',65,'2024-12-13 15:42:18','2024-12-13 15:42:18'),(17,'sadf','eeeeeeee','2024-02-02 00:00:00',100,'2024-12-14 16:17:11','2024-12-26 15:19:25'),(22,'shabi','11111111111','2024-12-10 00:00:00',0,'2024-12-27 00:25:50','2024-12-27 11:31:50');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `rentaldetail_view`
--

DROP TABLE IF EXISTS `rentaldetail_view`;
/*!50001 DROP VIEW IF EXISTS `rentaldetail_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `rentaldetail_view` AS SELECT 
 1 AS `玩具id`,
 1 AS `玩具名`,
 1 AS `价格`,
 1 AS `会员id`,
 1 AS `会员名`,
 1 AS `出租日期`,
 1 AS `归还日期`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `rentallists`
--

DROP TABLE IF EXISTS `rentallists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rentallists` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `toyId` int unsigned NOT NULL,
  `memberId` int unsigned NOT NULL,
  `clerkId` int unsigned NOT NULL,
  `rentDate` datetime NOT NULL,
  `returnDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rental_lists_toy_id` (`toyId`),
  KEY `rental_lists_member_id` (`memberId`),
  KEY `rental_lists_clerk_id` (`clerkId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentallists`
--

LOCK TABLES `rentallists` WRITE;
/*!40000 ALTER TABLE `rentallists` DISABLE KEYS */;
INSERT INTO `rentallists` VALUES (1,1,1,1,'2024-12-26 23:08:24','2024-12-26 23:08:24','2024-12-26 23:08:24','2024-12-26 23:08:24'),(2,3,2,5,'2024-12-26 23:08:24',NULL,'2024-12-26 23:08:24','2024-12-26 23:08:24'),(3,6,4,8,'2024-12-26 23:08:24',NULL,'2024-12-26 23:08:24','2024-12-26 23:08:24'),(4,8,8,8,'2024-12-26 23:08:24',NULL,'2024-12-26 23:08:24','2024-12-26 23:08:24'),(5,7,9,10,'2024-12-26 23:08:24',NULL,'2024-12-26 23:08:24','2024-12-26 23:08:24'),(7,57,5,5,'2024-12-27 00:00:00',NULL,'2024-12-26 23:12:47','2024-12-26 23:12:47'),(8,50,6,3,'2024-12-24 00:00:00','2025-01-04 00:00:00','2024-12-27 00:12:15','2024-12-27 00:39:58'),(9,66,12,4,'2024-12-20 00:00:00','2024-12-26 00:00:00','2024-12-27 00:22:26','2024-12-27 11:41:11');
/*!40000 ALTER TABLE `rentallists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20241211143028-create-toy.js'),('20241212133705-create-member.js'),('20241212133837-create-clerk.js'),('20241212134207-create-rental-list.js'),('20241212134241-create-work.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `toys`
--

DROP TABLE IF EXISTS `toys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `toys` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int unsigned NOT NULL,
  `attachmentNum` int unsigned NOT NULL,
  `purchaseDate` datetime NOT NULL,
  `isRented` int unsigned NOT NULL DEFAULT '0',
  `damageCondition` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `toys`
--

LOCK TABLES `toys` WRITE;
/*!40000 ALTER TABLE `toys` DISABLE KEYS */;
INSERT INTO `toys` VALUES (41,'玩具名 41',42,5,'2024-12-13 15:25:43',1,NULL,'2024-12-13 15:25:43','2024-12-13 15:25:43'),(42,'玩具名 42',69,1,'2024-12-13 15:25:43',0,NULL,'2024-12-13 15:25:43','2024-12-13 15:25:43'),(43,'玩具名 43',66,9,'2024-12-13 15:25:43',0,NULL,'2024-12-13 15:25:43','2024-12-13 15:25:43'),(44,'玩具名 44',20,4,'2024-12-13 15:25:43',0,NULL,'2024-12-13 15:25:43','2024-12-13 15:25:43'),(45,'玩具名 45',35,5,'2024-12-13 15:25:43',1,NULL,'2024-12-13 15:25:43','2024-12-13 15:25:43'),(46,'玩具名 46',66,8,'2024-12-13 15:25:43',0,NULL,'2024-12-13 15:25:43','2024-12-13 15:25:43'),(47,'玩具名 47',18,6,'2024-12-13 15:25:43',0,NULL,'2024-12-13 15:25:43','2024-12-13 15:25:43'),(48,'玩具名 48',96,6,'2024-12-13 15:25:43',0,NULL,'2024-12-13 15:25:43','2024-12-13 15:25:43'),(49,'玩具名 49',34,2,'2024-12-13 15:25:43',1,NULL,'2024-12-13 15:25:43','2024-12-13 15:25:43'),(50,'玩具名 50',6,4,'2024-12-13 15:25:43',0,NULL,'2024-12-13 15:25:43','2024-12-27 00:39:58'),(51,'测试啊啊啊',22,2,'0443-12-31 23:54:17',1,'全烂了','2024-12-13 17:40:13','2024-12-13 17:43:26'),(54,'啊啊',1,2,'2024-12-03 00:00:00',1,'是的奥德赛发的啊发多少的是的奥德赛发的啊发多少的是的奥德赛发的啊发多少的是的奥德赛发的啊发多少的是的奥德赛发的啊发多少的','2024-12-25 15:59:46','2024-12-25 15:59:46'),(55,'傻逼',33,0,'2024-12-20 00:00:00',1,'','2024-12-25 16:03:29','2024-12-25 16:03:29'),(56,'是的翻到算法',34,4,'2024-12-01 00:00:00',0,'但是','2024-12-25 16:05:04','2024-12-27 00:33:33'),(57,'的地方',21,12,'2024-12-02 00:00:00',1,'','2024-12-25 16:06:32','2024-12-26 23:12:48'),(58,'啊恶无非',2,3,'2024-11-25 00:00:00',1,'','2024-12-25 16:07:38','2024-12-25 16:07:38'),(59,'阿道夫',5,6,'2024-12-05 00:00:00',1,'','2024-12-25 16:08:24','2024-12-25 16:08:24'),(62,'45',45,4545,'2024-12-02 00:00:00',1,'渣都不剩','2024-12-25 16:12:03','2024-12-25 17:05:04'),(64,'阿斯蒂芬萨达',3,4,'2024-12-12 00:00:00',1,'分隔','2024-12-25 16:51:02','2024-12-25 16:51:02'),(66,'的啊',2,3,'2024-11-27 00:00:00',0,'','2024-12-26 14:42:56','2024-12-27 11:55:24');
/*!40000 ALTER TABLE `toys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `works`
--

DROP TABLE IF EXISTS `works`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `works` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `clerkId` int unsigned NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `works_clerk_id` (`clerkId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `works`
--

LOCK TABLES `works` WRITE;
/*!40000 ALTER TABLE `works` DISABLE KEYS */;
INSERT INTO `works` VALUES (1,1,'2024-12-26 23:08:18','2024-12-26 23:08:18','2024-12-26 23:08:18','2024-12-26 23:08:18'),(2,2,'2024-12-26 23:08:18','2024-12-26 23:08:18','2024-12-26 23:08:18','2024-12-26 23:08:18'),(3,3,'2024-12-26 23:08:18','2024-12-26 23:08:18','2024-12-26 23:08:18','2024-12-26 23:08:18'),(4,4,'2024-12-26 23:08:18','2024-12-26 23:08:18','2024-12-26 23:08:18','2024-12-26 23:08:18');
/*!40000 ALTER TABLE `works` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `rentaldetail_view`
--

/*!50001 DROP VIEW IF EXISTS `rentaldetail_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `rentaldetail_view` AS select `rentallists`.`toyId` AS `玩具id`,`toys`.`tname` AS `玩具名`,`toys`.`price` AS `价格`,`rentallists`.`memberId` AS `会员id`,`members`.`mname` AS `会员名`,`rentallists`.`rentDate` AS `出租日期`,`rentallists`.`returnDate` AS `归还日期` from ((`rentallists` join `toys`) join `members`) where ((`toys`.`id` = `rentallists`.`toyId`) and (`members`.`id` = `rentallists`.`memberId`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-27 22:02:00
