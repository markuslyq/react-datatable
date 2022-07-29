-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: localhost    Database: sample
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
-- Table structure for table `company_info`
--

DROP TABLE IF EXISTS `company_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_info` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `company` varchar(100) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `years` int DEFAULT NULL,
  PRIMARY KEY (`company_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_user_id_company_info` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_info`
--

LOCK TABLES `company_info` WRITE;
/*!40000 ALTER TABLE `company_info` DISABLE KEYS */;
INSERT INTO `company_info` VALUES (1,1,'Finale','Sales & Marketing',7),(2,1,'Microsoft','HR',6),(3,2,'Sibelius','Manager',23),(4,3,'Amazon','IT',3),(5,3,'Adobe','Tech',8),(6,5,'Finale','IT',3),(7,5,'Apple','IT',1),(8,5,'Yahoo','IT',8),(9,6,'Lavasoft','Sales',5),(10,6,'Sibelius','HR',1),(11,7,'Microsoft','Tech',1),(12,7,'Google','Tech',5),(13,8,'Sibelius','Media Relations',4),(14,8,'Chami','Research and Development',3),(15,8,'Amazon','Sales and Marketing',5),(16,9,'Apple','HR',6),(17,9,'Borland','Payroll',1),(18,9,'Microsoft','Sales and Marketing',9),(19,11,'Apple','',1),(20,11,'Borland','Media Relations',3),(21,11,'Cakewalk','',2),(22,11,'Amazon','Sales and Marketing',3),(23,12,'Chami','Quality Assurance',1),(24,12,'Borland','',3),(25,12,'Cakewalk','Accounting',8),(26,12,'Finale','',5),(27,13,'Amazon','HR',1),(28,13,'Lavasoft','Payroll',4),(29,13,'Chami','Janitor',9),(30,14,'Adobe','Tech',8),(31,14,'Yahoo','IT',2),(32,15,'Adobe','HR',10),(33,15,'Amazon','Legal Department',2),(34,16,'Adobe','Tech Support',1),(35,16,'Finale','Quality Assurance',2),(36,16,'Apple','',1),(37,16,'Amazon','Accounting',2),(38,16,'Chami','',NULL),(39,17,'Finale','',2),(40,18,'Lavasoft, Yahoo','Legal Department',1),(41,18,'Borland','',3),(42,18,'Google','Quality Assurance',1),(43,19,'Apple','Payroll',4),(44,19,'Lavasoft','Customer Service',2),(45,19,'Chami','Tester',1),(46,20,'Amazon','Delivery Driver',9),(47,20,'Adobe','Delivery Driver',1),(48,20,'Google','Delivery Manager',2),(49,21,'Apple','Manager',1),(50,21,'Lavasoft','Manager',9),(51,21,'Microsoft','Managing Director',6),(52,23,'Borland','Janitor',4),(53,24,'Cakewalk','Tech Support',7),(54,25,'Amazon','HR',6),(55,25,'Sibelius','HR',8),(56,25,'Chami','HR',5),(57,26,'Lavasoft','Intern',2),(58,26,'Yahoo','Tech Support',6),(59,27,'Chami','',NULL),(60,27,'Sibelius','Legal Department',2),(61,28,'Chami','Intern',2),(62,28,'Yahoo','Tech Support',5),(63,29,'Borland','Janitor',3),(64,29,'Yahoo','Cleaning Manager',1),(65,30,'Apple','Intern',1),(66,31,'Apple',NULL,1),(67,31,'Google','Tech',2),(68,32,'Cakewalk','',2),(69,33,'Adobe','Intern',2),(70,35,'Amazon','HR',1),(71,35,'Apple','Marketing',2),(72,35,'Finale','Legal',3),(73,35,'Cakewalk','Payroll',1);
/*!40000 ALTER TABLE `company_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-29 10:39:51
