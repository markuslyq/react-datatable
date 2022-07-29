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
-- Table structure for table `car_info`
--

DROP TABLE IF EXISTS `car_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_info` (
  `car_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `car` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`car_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_user_id_car_info` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_info`
--

LOCK TABLES `car_info` WRITE;
/*!40000 ALTER TABLE `car_info` DISABLE KEYS */;
INSERT INTO `car_info` VALUES (1,1,'Nissan'),(2,2,'Renault'),(3,3,'Volvo'),(4,4,'Chevrolet'),(5,6,'Mercedes-Benz'),(6,6,'RAM Trucks'),(7,9,'Honda'),(8,9,'Chrysler'),(9,10,'JLR'),(10,12,'Kenworth'),(11,12,'Buick'),(12,13,'Mitsubishi Motors'),(13,14,'Ford'),(14,15,'Tata Motors'),(15,16,'Acura'),(16,16,'Audi'),(17,19,'Maruti Suzuki'),(18,19,'RAM Trucks'),(19,20,'Daihatsu'),(20,21,'Dacia'),(21,21,'Dongfeng Motor'),(22,22,'Maruti Suzuki'),(23,24,'Jeep'),(24,24,'Vauxhall'),(25,25,'Toyota'),(26,25,'MINI'),(27,26,'JLR'),(28,29,'Seat'),(29,30,'Maruti Suzuki'),(30,30,'Chevrolet'),(31,31,'Chevrolet'),(32,31,'Toyota'),(33,32,'Jeep'),(34,35,'Smart');
/*!40000 ALTER TABLE `car_info` ENABLE KEYS */;
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
