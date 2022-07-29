-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: localhost    Database: settings
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `filter_settings`
--

DROP TABLE IF EXISTS `filter_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filter_settings` (
  `filter_settings_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `table_name` varchar(45) NOT NULL,
  `filter_settings` longtext,
  PRIMARY KEY (`filter_settings_id`),
  UNIQUE KEY `user_id` (`user_id`,`table_name`),
  UNIQUE KEY `user_id_2` (`user_id`,`table_name`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filter_settings`
--

LOCK TABLES `filter_settings` WRITE;
/*!40000 ALTER TABLE `filter_settings` DISABLE KEYS */;
INSERT INTO `filter_settings` VALUES (9,3,'Employee List','[]'),(10,2,'Employee List','[{\"column\":\"start_date\",\"condition\":\"BETWEEN\",\"value\":{\"filterStartDate\":\"2022-07-09T10:25:47.000Z\",\"filterEndDate\":\"2024-07-08T10:25:51.000Z\"}},{\"column\":\"age\",\"condition\":\"LESS THAN\",\"value\":\"30\"},{\"column\":\"age\",\"condition\":\"LESS THAN\",\"value\":\"20\"}]'),(11,1,'Employee List','[{\"column\":\"start_date\",\"condition\":\"AFTER\",\"value\":\"2022-07-25T06:27:27.000Z\"},{\"column\":\"age\",\"condition\":\"MORE THAN\",\"value\":\"40\"}]');
/*!40000 ALTER TABLE `filter_settings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-29 10:39:52
