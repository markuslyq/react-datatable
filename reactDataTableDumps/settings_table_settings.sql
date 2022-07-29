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
-- Table structure for table `table_settings`
--

DROP TABLE IF EXISTS `table_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table_settings` (
  `table_settings_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `table_name` varchar(45) NOT NULL,
  `column_order` longtext,
  `column_settings` longtext,
  `num_rows_per_page` int NOT NULL DEFAULT '10',
  PRIMARY KEY (`table_settings_id`),
  UNIQUE KEY `user_id` (`user_id`,`table_name`),
  UNIQUE KEY `user_id_2` (`user_id`,`table_name`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_settings`
--

LOCK TABLES `table_settings` WRITE;
/*!40000 ALTER TABLE `table_settings` DISABLE KEYS */;
INSERT INTO `table_settings` VALUES (22,3,'Employee List','[0,1,2,10,3,11,4,5,6,7,8,9,12,13]','[{\"name\":\"user_id\",\"label\":\"User ID\",\"dataType\":\"id\",\"options\":{\"display\":false}},{\"name\":\"name\",\"label\":\"Name\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"phone\",\"label\":\"Phone\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"email\",\"label\":\"Email\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"start_date\",\"label\":\"Start Date\",\"dataType\":\"date\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"end_date\",\"label\":\"End Date\",\"dataType\":\"date\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"deadline\",\"label\":\"Deadline\",\"dataType\":\"date\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"postal_code\",\"label\":\"Postal Zip\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"country\",\"label\":\"Country\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"age\",\"label\":\"Age\",\"dataType\":\"number\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"cars\",\"label\":\"Cars\",\"dataType\":\"array\",\"options\":{\"display\":true,\"sort\":false}},{\"name\":\"previous_company_info\",\"label\":\"Previous Companies\",\"subHeaders\":[\"Company\",\"Department\",\"Years\"],\"dataType\":\"group\",\"options\":{\"display\":true,\"sort\":false}},{\"name\":\"password\",\"label\":\"Password\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"notes\",\"label\":\"Notes\",\"dataType\":\"longString\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}}]',10),(23,2,'Employee List','[0,1,9,8,4,5,6,3,2,7,12,11,10,13]','[{\"name\":\"user_id\",\"label\":\"User ID\",\"dataType\":\"id\",\"options\":{\"display\":false}},{\"name\":\"name\",\"label\":\"Name\",\"dataType\":\"string\",\"options\":{\"display\":false,\"sortThirdClickReset\":true}},{\"name\":\"phone\",\"label\":\"Phone\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"email\",\"label\":\"Email\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"start_date\",\"label\":\"Start Date\",\"dataType\":\"date\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"end_date\",\"label\":\"End Date\",\"dataType\":\"date\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"deadline\",\"label\":\"Deadline\",\"dataType\":\"date\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"postal_code\",\"label\":\"Postal Zip\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"country\",\"label\":\"Country\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"age\",\"label\":\"Age\",\"dataType\":\"number\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"cars\",\"label\":\"Cars\",\"dataType\":\"array\",\"options\":{\"display\":true,\"sort\":false}},{\"name\":\"previous_company_info\",\"label\":\"Previous Companies\",\"subHeaders\":[\"Company\",\"Department\",\"Years\"],\"dataType\":\"group\",\"options\":{\"display\":true,\"sort\":false}},{\"name\":\"password\",\"label\":\"Password\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"notes\",\"label\":\"Notes\",\"dataType\":\"longString\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}}]',20),(24,1,'Employee List','[0,1,2,3,4,5,6,7,8,9,10,11,12,13]','[{\"name\":\"user_id\",\"label\":\"User ID\",\"dataType\":\"id\",\"options\":{\"display\":false}},{\"name\":\"name\",\"label\":\"Name\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"phone\",\"label\":\"Phone\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"email\",\"label\":\"Email\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"start_date\",\"label\":\"Start Date\",\"dataType\":\"date\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"end_date\",\"label\":\"End Date\",\"dataType\":\"date\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"deadline\",\"label\":\"Deadline\",\"dataType\":\"date\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"postal_code\",\"label\":\"Postal Zip\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"country\",\"label\":\"Country\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"age\",\"label\":\"Age\",\"dataType\":\"number\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"cars\",\"label\":\"Cars\",\"dataType\":\"array\",\"options\":{\"display\":true,\"sort\":false}},{\"name\":\"previous_company_info\",\"label\":\"Previous Companies\",\"subHeaders\":[\"Company\",\"Department\",\"Years\"],\"dataType\":\"group\",\"options\":{\"display\":true,\"sort\":false}},{\"name\":\"password\",\"label\":\"Password\",\"dataType\":\"string\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}},{\"name\":\"notes\",\"label\":\"Notes\",\"dataType\":\"longString\",\"options\":{\"display\":true,\"sortThirdClickReset\":true}}]',10);
/*!40000 ALTER TABLE `table_settings` ENABLE KEYS */;
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
