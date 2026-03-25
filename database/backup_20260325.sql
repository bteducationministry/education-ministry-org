/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.22-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: prod-db-1    Database: bt_education_wp_prod
-- ------------------------------------------------------
-- Server version	10.11.15-MariaDB-ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `wp_actionscheduler_actions`
--

DROP TABLE IF EXISTS `wp_actionscheduler_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_actionscheduler_actions` (
  `action_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `hook` varchar(191) NOT NULL,
  `status` varchar(20) NOT NULL,
  `scheduled_date_gmt` datetime DEFAULT '0000-00-00 00:00:00',
  `scheduled_date_local` datetime DEFAULT '0000-00-00 00:00:00',
  `priority` tinyint(3) unsigned NOT NULL DEFAULT 10,
  `args` varchar(191) DEFAULT NULL,
  `schedule` longtext DEFAULT NULL,
  `group_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `attempts` int(11) NOT NULL DEFAULT 0,
  `last_attempt_gmt` datetime DEFAULT '0000-00-00 00:00:00',
  `last_attempt_local` datetime DEFAULT '0000-00-00 00:00:00',
  `claim_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `extended_args` varchar(8000) DEFAULT NULL,
  PRIMARY KEY (`action_id`),
  KEY `hook_status_scheduled_date_gmt` (`hook`(163),`status`,`scheduled_date_gmt`),
  KEY `status_scheduled_date_gmt` (`status`,`scheduled_date_gmt`),
  KEY `scheduled_date_gmt` (`scheduled_date_gmt`),
  KEY `args` (`args`),
  KEY `group_id` (`group_id`),
  KEY `last_attempt_gmt` (`last_attempt_gmt`),
  KEY `claim_id_status_scheduled_date_gmt` (`claim_id`,`status`,`scheduled_date_gmt`),
  KEY `claim_id_status_priority_scheduled_date_gmt` (`claim_id`,`status`,`priority`,`scheduled_date_gmt`),
  KEY `status_last_attempt_gmt` (`status`,`last_attempt_gmt`),
  KEY `status_claim_id` (`status`,`claim_id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_actionscheduler_actions`
--

LOCK TABLES `wp_actionscheduler_actions` WRITE;
/*!40000 ALTER TABLE `wp_actionscheduler_actions` DISABLE KEYS */;
INSERT INTO `wp_actionscheduler_actions` VALUES (26,'pmpro_schedule_quarter_hourly','complete','2026-03-24 03:31:38','2026-03-24 03:31:38',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774323098;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774323098;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 03:40:41','2026-03-24 03:40:41',6,NULL),(27,'pmpro_schedule_hourly','complete','2026-03-24 04:16:38','2026-03-24 04:16:38',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774325798;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774325798;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 04:38:25','2026-03-24 04:38:25',10,NULL),(28,'pmpro_schedule_daily','pending','2026-03-25 10:30:00','2026-03-25 10:30:00',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774434600;s:18:\"\0*\0first_timestamp\";i:1774434600;s:13:\"\0*\0recurrence\";i:86400;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774434600;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:86400;}',1,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,NULL),(29,'pmpro_schedule_weekly','pending','2026-03-29 08:00:00','2026-03-29 08:00:00',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774771200;s:18:\"\0*\0first_timestamp\";i:1774771200;s:13:\"\0*\0recurrence\";i:604800;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774771200;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:604800;}',1,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,NULL),(30,'pmpro_trigger_monthly','pending','2026-04-01 08:00:00','2026-04-01 08:00:00',10,'[]','O:30:\"ActionScheduler_SimpleSchedule\":2:{s:22:\"\0*\0scheduled_timestamp\";i:1775030400;s:41:\"\0ActionScheduler_SimpleSchedule\0timestamp\";i:1775030400;}',1,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,NULL),(31,'action_scheduler/migration_hook','complete','2026-03-24 03:17:38','2026-03-24 03:17:38',10,'[]','O:30:\"ActionScheduler_SimpleSchedule\":2:{s:22:\"\0*\0scheduled_timestamp\";i:1774322258;s:41:\"\0ActionScheduler_SimpleSchedule\0timestamp\";i:1774322258;}',2,1,'2026-03-24 03:24:48','2026-03-24 03:24:48',2,NULL),(32,'wpforms_process_forms_locator_scan','complete','2026-03-24 03:28:05','2026-03-24 03:28:05',10,'{\"tasks_meta_id\":1}','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774322885;s:18:\"\0*\0first_timestamp\";i:1774322885;s:13:\"\0*\0recurrence\";i:86400;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774322885;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:86400;}',3,1,'2026-03-24 03:28:05','2026-03-24 03:28:05',4,NULL),(33,'wpforms_process_purge_spam','complete','2026-03-24 03:28:05','2026-03-24 03:28:05',10,'{\"tasks_meta_id\":2}','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774322885;s:18:\"\0*\0first_timestamp\";i:1774322885;s:13:\"\0*\0recurrence\";i:86400;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774322885;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:86400;}',3,1,'2026-03-24 03:28:05','2026-03-24 03:28:05',4,NULL),(34,'wpforms_email_summaries_fetch_info_blocks','pending','2026-03-29 21:48:51','2026-03-29 21:48:51',10,'{\"tasks_meta_id\":null}','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774820931;s:18:\"\0*\0first_timestamp\";i:1774820931;s:13:\"\0*\0recurrence\";i:604800;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774820931;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:604800;}',3,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,NULL),(35,'wpforms_process_forms_locator_scan','pending','2026-03-25 03:28:05','2026-03-25 03:28:05',10,'{\"tasks_meta_id\":1}','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774409285;s:18:\"\0*\0first_timestamp\";i:1774322885;s:13:\"\0*\0recurrence\";i:86400;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774409285;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:86400;}',3,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,NULL),(36,'wpforms_process_purge_spam','pending','2026-03-25 03:28:05','2026-03-25 03:28:05',10,'{\"tasks_meta_id\":2}','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774409285;s:18:\"\0*\0first_timestamp\";i:1774322885;s:13:\"\0*\0recurrence\";i:86400;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774409285;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:86400;}',3,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,NULL),(37,'pmpro_schedule_quarter_hourly','complete','2026-03-24 03:55:41','2026-03-24 03:55:41',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774324541;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774324541;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 04:38:25','2026-03-24 04:38:25',10,NULL),(38,'pmpro_schedule_quarter_hourly','complete','2026-03-24 04:53:25','2026-03-24 04:53:25',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774328005;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774328005;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 05:45:44','2026-03-24 05:45:44',12,NULL),(39,'pmpro_schedule_hourly','complete','2026-03-24 05:38:25','2026-03-24 05:38:25',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774330705;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774330705;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 05:45:44','2026-03-24 05:45:44',12,NULL),(40,'pmpro_schedule_quarter_hourly','complete','2026-03-24 06:00:44','2026-03-24 06:00:44',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774332044;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774332044;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 06:01:56','2026-03-24 06:01:56',15,NULL),(41,'pmpro_schedule_hourly','complete','2026-03-24 06:45:44','2026-03-24 06:45:44',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774334744;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774334744;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 07:59:30','2026-03-24 07:59:30',19,NULL),(42,'pmpro_schedule_quarter_hourly','complete','2026-03-24 06:16:56','2026-03-24 06:16:56',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774333016;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774333016;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 07:59:30','2026-03-24 07:59:30',19,NULL),(43,'pmpro_schedule_quarter_hourly','complete','2026-03-24 08:14:30','2026-03-24 08:14:30',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774340070;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774340070;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 08:15:00','2026-03-24 08:15:00',24,NULL),(44,'pmpro_schedule_hourly','complete','2026-03-24 08:59:30','2026-03-24 08:59:30',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774342770;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774342770;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 09:19:00','2026-03-24 09:19:00',26,NULL),(45,'pmpro_schedule_quarter_hourly','complete','2026-03-24 08:30:00','2026-03-24 08:30:00',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774341000;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774341000;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 09:19:00','2026-03-24 09:19:00',26,NULL),(46,'pmpro_schedule_quarter_hourly','complete','2026-03-24 09:34:00','2026-03-24 09:34:00',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774344840;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774344840;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 09:38:18','2026-03-24 09:38:18',28,NULL),(47,'pmpro_schedule_hourly','complete','2026-03-24 10:19:00','2026-03-24 10:19:00',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774347540;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774347540;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 11:09:46','2026-03-24 11:09:46',31,NULL),(48,'pmpro_schedule_quarter_hourly','complete','2026-03-24 09:53:18','2026-03-24 09:53:18',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774345998;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774345998;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 11:09:46','2026-03-24 11:09:46',31,NULL),(49,'pmpro_schedule_quarter_hourly','complete','2026-03-24 11:24:46','2026-03-24 11:24:46',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774351486;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774351486;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 11:30:49','2026-03-24 11:30:49',33,NULL),(50,'pmpro_schedule_hourly','complete','2026-03-24 12:09:46','2026-03-24 12:09:46',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774354186;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774354186;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 12:14:25','2026-03-24 12:14:25',37,NULL),(51,'pmpro_schedule_quarter_hourly','complete','2026-03-24 11:45:49','2026-03-24 11:45:49',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774352749;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774352749;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 12:04:54','2026-03-24 12:04:54',35,NULL),(52,'pmpro_schedule_quarter_hourly','complete','2026-03-24 12:19:54','2026-03-24 12:19:54',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774354794;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774354794;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 12:35:55','2026-03-24 12:35:55',39,NULL),(53,'pmpro_schedule_hourly','complete','2026-03-24 13:14:25','2026-03-24 13:14:25',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774358065;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774358065;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 14:16:57','2026-03-24 14:16:57',42,NULL),(54,'pmpro_schedule_quarter_hourly','complete','2026-03-24 12:50:55','2026-03-24 12:50:55',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774356655;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774356655;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 14:16:57','2026-03-24 14:16:57',42,NULL),(55,'pmpro_schedule_quarter_hourly','complete','2026-03-24 14:31:57','2026-03-24 14:31:57',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774362717;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774362717;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 14:53:56','2026-03-24 14:53:56',50,NULL),(56,'pmpro_schedule_hourly','complete','2026-03-24 15:16:57','2026-03-24 15:16:57',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774365417;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774365417;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 15:19:36','2026-03-24 15:19:36',56,NULL),(57,'pmpro_schedule_quarter_hourly','complete','2026-03-24 15:08:56','2026-03-24 15:08:56',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774364936;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774364936;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 15:10:05','2026-03-24 15:10:05',53,NULL),(58,'pmpro_schedule_quarter_hourly','complete','2026-03-24 15:25:05','2026-03-24 15:25:05',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774365905;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774365905;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 16:27:06','2026-03-24 16:27:06',60,NULL),(59,'pmpro_schedule_hourly','complete','2026-03-24 16:19:36','2026-03-24 16:19:36',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774369176;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774369176;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 16:27:06','2026-03-24 16:27:06',60,NULL),(60,'action_scheduler_run_recurring_actions_schedule_hook','complete','2026-03-24 15:19:36','2026-03-24 15:19:36',20,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774365576;s:18:\"\0*\0first_timestamp\";i:1774365576;s:13:\"\0*\0recurrence\";i:86400;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774365576;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:86400;}',4,1,'2026-03-24 15:19:36','2026-03-24 15:19:36',58,NULL),(61,'action_scheduler_run_recurring_actions_schedule_hook','pending','2026-03-25 15:19:36','2026-03-25 15:19:36',20,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774451976;s:18:\"\0*\0first_timestamp\";i:1774365576;s:13:\"\0*\0recurrence\";i:86400;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774451976;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:86400;}',4,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,NULL),(62,'pmpro_schedule_quarter_hourly','complete','2026-03-24 16:42:06','2026-03-24 16:42:06',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774370526;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774370526;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 16:42:28','2026-03-24 16:42:28',62,NULL),(63,'pmpro_schedule_hourly','complete','2026-03-24 17:27:06','2026-03-24 17:27:06',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774373226;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774373226;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 18:07:52','2026-03-24 18:07:52',70,NULL),(64,'pmpro_schedule_quarter_hourly','complete','2026-03-24 16:57:28','2026-03-24 16:57:28',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774371448;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774371448;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 17:14:04','2026-03-24 17:14:04',64,NULL),(65,'pmpro_schedule_quarter_hourly','complete','2026-03-24 17:29:04','2026-03-24 17:29:04',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774373344;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774373344;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 18:07:52','2026-03-24 18:07:52',70,NULL),(66,'pmpro_schedule_hourly','complete','2026-03-24 19:07:52','2026-03-24 19:07:52',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774379272;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774379272;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 20:15:38','2026-03-24 20:15:38',74,NULL),(67,'pmpro_schedule_quarter_hourly','complete','2026-03-24 18:22:52','2026-03-24 18:22:52',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774376572;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774376572;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 18:31:55','2026-03-24 18:31:55',72,NULL),(68,'pmpro_schedule_quarter_hourly','complete','2026-03-24 18:46:55','2026-03-24 18:46:55',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774378015;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774378015;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 20:15:38','2026-03-24 20:15:38',74,NULL),(69,'pmpro_schedule_quarter_hourly','complete','2026-03-24 20:30:38','2026-03-24 20:30:38',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774384238;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774384238;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 20:36:48','2026-03-24 20:36:48',76,NULL),(70,'pmpro_schedule_hourly','complete','2026-03-24 21:15:38','2026-03-24 21:15:38',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774386938;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774386938;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 22:20:14','2026-03-24 22:20:14',80,NULL),(71,'pmpro_schedule_quarter_hourly','complete','2026-03-24 20:51:48','2026-03-24 20:51:48',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774385508;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774385508;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 21:10:21','2026-03-24 21:10:21',78,NULL),(72,'pmpro_schedule_quarter_hourly','complete','2026-03-24 21:25:21','2026-03-24 21:25:21',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774387521;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774387521;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 22:20:14','2026-03-24 22:20:14',80,NULL),(73,'pmpro_schedule_hourly','complete','2026-03-24 23:20:14','2026-03-24 23:20:14',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774394414;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774394414;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-24 23:25:18','2026-03-24 23:25:18',84,NULL),(74,'pmpro_schedule_quarter_hourly','complete','2026-03-24 22:35:14','2026-03-24 22:35:14',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774391714;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774391714;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 22:42:06','2026-03-24 22:42:06',82,NULL),(75,'pmpro_schedule_quarter_hourly','complete','2026-03-24 22:57:06','2026-03-24 22:57:06',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774393026;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774393026;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 23:25:18','2026-03-24 23:25:18',84,NULL),(76,'pmpro_schedule_quarter_hourly','complete','2026-03-24 23:40:18','2026-03-24 23:40:18',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774395618;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774395618;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-24 23:49:43','2026-03-24 23:49:43',86,NULL),(77,'pmpro_schedule_hourly','complete','2026-03-25 00:25:18','2026-03-25 00:25:18',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774398318;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774398318;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,1,'2026-03-25 00:25:59','2026-03-25 00:25:59',88,NULL),(78,'pmpro_schedule_quarter_hourly','complete','2026-03-25 00:04:43','2026-03-25 00:04:43',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774397083;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774397083;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,1,'2026-03-25 00:25:59','2026-03-25 00:25:59',88,NULL),(79,'pmpro_schedule_quarter_hourly','pending','2026-03-25 00:40:59','2026-03-25 00:40:59',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774399259;s:18:\"\0*\0first_timestamp\";i:1774323098;s:13:\"\0*\0recurrence\";i:900;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774399259;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:900;}',1,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,NULL),(80,'pmpro_schedule_hourly','pending','2026-03-25 01:25:59','2026-03-25 01:25:59',10,'[]','O:32:\"ActionScheduler_IntervalSchedule\":5:{s:22:\"\0*\0scheduled_timestamp\";i:1774401959;s:18:\"\0*\0first_timestamp\";i:1774325798;s:13:\"\0*\0recurrence\";i:3600;s:49:\"\0ActionScheduler_IntervalSchedule\0start_timestamp\";i:1774401959;s:53:\"\0ActionScheduler_IntervalSchedule\0interval_in_seconds\";i:3600;}',1,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',0,NULL);
/*!40000 ALTER TABLE `wp_actionscheduler_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_actionscheduler_claims`
--

DROP TABLE IF EXISTS `wp_actionscheduler_claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_actionscheduler_claims` (
  `claim_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `date_created_gmt` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`claim_id`),
  KEY `date_created_gmt` (`date_created_gmt`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_actionscheduler_claims`
--

LOCK TABLES `wp_actionscheduler_claims` WRITE;
/*!40000 ALTER TABLE `wp_actionscheduler_claims` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_actionscheduler_claims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_actionscheduler_groups`
--

DROP TABLE IF EXISTS `wp_actionscheduler_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_actionscheduler_groups` (
  `group_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`group_id`),
  KEY `slug` (`slug`(191))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_actionscheduler_groups`
--

LOCK TABLES `wp_actionscheduler_groups` WRITE;
/*!40000 ALTER TABLE `wp_actionscheduler_groups` DISABLE KEYS */;
INSERT INTO `wp_actionscheduler_groups` VALUES (1,'pmpro_recurring_tasks'),(2,'action-scheduler-migration'),(3,'wpforms'),(4,'ActionScheduler');
/*!40000 ALTER TABLE `wp_actionscheduler_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_actionscheduler_logs`
--

DROP TABLE IF EXISTS `wp_actionscheduler_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_actionscheduler_logs` (
  `log_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `action_id` bigint(20) unsigned NOT NULL,
  `message` text NOT NULL,
  `log_date_gmt` datetime DEFAULT '0000-00-00 00:00:00',
  `log_date_local` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`log_id`),
  KEY `action_id` (`action_id`),
  KEY `log_date_gmt` (`log_date_gmt`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_actionscheduler_logs`
--

LOCK TABLES `wp_actionscheduler_logs` WRITE;
/*!40000 ALTER TABLE `wp_actionscheduler_logs` DISABLE KEYS */;
INSERT INTO `wp_actionscheduler_logs` VALUES (1,26,'action created','2026-03-24 03:16:38','2026-03-24 03:16:38'),(2,27,'action created','2026-03-24 03:16:38','2026-03-24 03:16:38'),(3,28,'action created','2026-03-24 03:16:38','2026-03-24 03:16:38'),(4,29,'action created','2026-03-24 03:16:38','2026-03-24 03:16:38'),(5,30,'action created','2026-03-24 03:16:38','2026-03-24 03:16:38'),(6,31,'action created','2026-03-24 03:16:38','2026-03-24 03:16:38'),(7,31,'action started via WP Cron','2026-03-24 03:24:48','2026-03-24 03:24:48'),(8,31,'action complete via WP Cron','2026-03-24 03:24:48','2026-03-24 03:24:48'),(9,32,'action created','2026-03-24 03:28:05','2026-03-24 03:28:05'),(10,33,'action created','2026-03-24 03:28:05','2026-03-24 03:28:05'),(11,34,'action created','2026-03-24 03:28:05','2026-03-24 03:28:05'),(12,32,'action started via WP Cron','2026-03-24 03:28:05','2026-03-24 03:28:05'),(13,32,'action complete via WP Cron','2026-03-24 03:28:05','2026-03-24 03:28:05'),(14,35,'action created','2026-03-24 03:28:05','2026-03-24 03:28:05'),(15,33,'action started via WP Cron','2026-03-24 03:28:05','2026-03-24 03:28:05'),(16,33,'action complete via WP Cron','2026-03-24 03:28:05','2026-03-24 03:28:05'),(17,36,'action created','2026-03-24 03:28:05','2026-03-24 03:28:05'),(18,26,'action started via WP Cron','2026-03-24 03:40:41','2026-03-24 03:40:41'),(19,26,'action complete via WP Cron','2026-03-24 03:40:41','2026-03-24 03:40:41'),(20,37,'action created','2026-03-24 03:40:41','2026-03-24 03:40:41'),(21,37,'action started via WP Cron','2026-03-24 04:38:25','2026-03-24 04:38:25'),(22,37,'action complete via WP Cron','2026-03-24 04:38:25','2026-03-24 04:38:25'),(23,38,'action created','2026-03-24 04:38:25','2026-03-24 04:38:25'),(24,27,'action started via WP Cron','2026-03-24 04:38:25','2026-03-24 04:38:25'),(25,27,'action complete via WP Cron','2026-03-24 04:38:25','2026-03-24 04:38:25'),(26,39,'action created','2026-03-24 04:38:25','2026-03-24 04:38:25'),(27,38,'action started via WP Cron','2026-03-24 05:45:44','2026-03-24 05:45:44'),(28,38,'action complete via WP Cron','2026-03-24 05:45:44','2026-03-24 05:45:44'),(29,40,'action created','2026-03-24 05:45:44','2026-03-24 05:45:44'),(30,39,'action started via WP Cron','2026-03-24 05:45:44','2026-03-24 05:45:44'),(31,39,'action complete via WP Cron','2026-03-24 05:45:44','2026-03-24 05:45:44'),(32,41,'action created','2026-03-24 05:45:44','2026-03-24 05:45:44'),(33,40,'action started via WP Cron','2026-03-24 06:01:56','2026-03-24 06:01:56'),(34,40,'action complete via WP Cron','2026-03-24 06:01:56','2026-03-24 06:01:56'),(35,42,'action created','2026-03-24 06:01:56','2026-03-24 06:01:56'),(36,42,'action started via WP Cron','2026-03-24 07:59:30','2026-03-24 07:59:30'),(37,42,'action complete via WP Cron','2026-03-24 07:59:30','2026-03-24 07:59:30'),(38,43,'action created','2026-03-24 07:59:30','2026-03-24 07:59:30'),(39,41,'action started via WP Cron','2026-03-24 07:59:30','2026-03-24 07:59:30'),(40,41,'action complete via WP Cron','2026-03-24 07:59:30','2026-03-24 07:59:30'),(41,44,'action created','2026-03-24 07:59:30','2026-03-24 07:59:30'),(42,43,'action started via WP Cron','2026-03-24 08:15:00','2026-03-24 08:15:00'),(43,43,'action complete via WP Cron','2026-03-24 08:15:00','2026-03-24 08:15:00'),(44,45,'action created','2026-03-24 08:15:00','2026-03-24 08:15:00'),(45,45,'action started via WP Cron','2026-03-24 09:19:00','2026-03-24 09:19:00'),(46,45,'action complete via WP Cron','2026-03-24 09:19:00','2026-03-24 09:19:00'),(47,46,'action created','2026-03-24 09:19:00','2026-03-24 09:19:00'),(48,44,'action started via WP Cron','2026-03-24 09:19:00','2026-03-24 09:19:00'),(49,44,'action complete via WP Cron','2026-03-24 09:19:00','2026-03-24 09:19:00'),(50,47,'action created','2026-03-24 09:19:00','2026-03-24 09:19:00'),(51,46,'action started via WP Cron','2026-03-24 09:38:18','2026-03-24 09:38:18'),(52,46,'action complete via WP Cron','2026-03-24 09:38:18','2026-03-24 09:38:18'),(53,48,'action created','2026-03-24 09:38:18','2026-03-24 09:38:18'),(54,48,'action started via WP Cron','2026-03-24 11:09:46','2026-03-24 11:09:46'),(55,48,'action complete via WP Cron','2026-03-24 11:09:46','2026-03-24 11:09:46'),(56,49,'action created','2026-03-24 11:09:46','2026-03-24 11:09:46'),(57,47,'action started via WP Cron','2026-03-24 11:09:46','2026-03-24 11:09:46'),(58,47,'action complete via WP Cron','2026-03-24 11:09:46','2026-03-24 11:09:46'),(59,50,'action created','2026-03-24 11:09:46','2026-03-24 11:09:46'),(60,49,'action started via WP Cron','2026-03-24 11:30:49','2026-03-24 11:30:49'),(61,49,'action complete via WP Cron','2026-03-24 11:30:49','2026-03-24 11:30:49'),(62,51,'action created','2026-03-24 11:30:49','2026-03-24 11:30:49'),(63,51,'action started via WP Cron','2026-03-24 12:04:54','2026-03-24 12:04:54'),(64,51,'action complete via WP Cron','2026-03-24 12:04:54','2026-03-24 12:04:54'),(65,52,'action created','2026-03-24 12:04:54','2026-03-24 12:04:54'),(66,50,'action started via WP Cron','2026-03-24 12:14:25','2026-03-24 12:14:25'),(67,50,'action complete via WP Cron','2026-03-24 12:14:25','2026-03-24 12:14:25'),(68,53,'action created','2026-03-24 12:14:25','2026-03-24 12:14:25'),(69,52,'action started via WP Cron','2026-03-24 12:35:55','2026-03-24 12:35:55'),(70,52,'action complete via WP Cron','2026-03-24 12:35:55','2026-03-24 12:35:55'),(71,54,'action created','2026-03-24 12:35:55','2026-03-24 12:35:55'),(72,54,'action started via WP Cron','2026-03-24 14:16:57','2026-03-24 14:16:57'),(73,54,'action complete via WP Cron','2026-03-24 14:16:57','2026-03-24 14:16:57'),(74,55,'action created','2026-03-24 14:16:57','2026-03-24 14:16:57'),(75,53,'action started via WP Cron','2026-03-24 14:16:57','2026-03-24 14:16:57'),(76,53,'action complete via WP Cron','2026-03-24 14:16:57','2026-03-24 14:16:57'),(77,56,'action created','2026-03-24 14:16:57','2026-03-24 14:16:57'),(78,55,'action started via WP Cron','2026-03-24 14:53:56','2026-03-24 14:53:56'),(79,55,'action complete via WP Cron','2026-03-24 14:53:56','2026-03-24 14:53:56'),(80,57,'action created','2026-03-24 14:53:56','2026-03-24 14:53:56'),(81,57,'action started via WP Cron','2026-03-24 15:10:04','2026-03-24 15:10:04'),(82,57,'action complete via WP Cron','2026-03-24 15:10:05','2026-03-24 15:10:05'),(83,58,'action created','2026-03-24 15:10:05','2026-03-24 15:10:05'),(84,56,'action started via WP Cron','2026-03-24 15:19:36','2026-03-24 15:19:36'),(85,56,'action complete via WP Cron','2026-03-24 15:19:36','2026-03-24 15:19:36'),(86,59,'action created','2026-03-24 15:19:36','2026-03-24 15:19:36'),(87,60,'action created','2026-03-24 15:19:36','2026-03-24 15:19:36'),(88,60,'action started via Async Request','2026-03-24 15:19:36','2026-03-24 15:19:36'),(89,60,'action complete via Async Request','2026-03-24 15:19:36','2026-03-24 15:19:36'),(90,61,'action created','2026-03-24 15:19:36','2026-03-24 15:19:36'),(91,58,'action started via WP Cron','2026-03-24 16:27:06','2026-03-24 16:27:06'),(92,58,'action complete via WP Cron','2026-03-24 16:27:06','2026-03-24 16:27:06'),(93,62,'action created','2026-03-24 16:27:06','2026-03-24 16:27:06'),(94,59,'action started via WP Cron','2026-03-24 16:27:06','2026-03-24 16:27:06'),(95,59,'action complete via WP Cron','2026-03-24 16:27:06','2026-03-24 16:27:06'),(96,63,'action created','2026-03-24 16:27:06','2026-03-24 16:27:06'),(97,62,'action started via WP Cron','2026-03-24 16:42:28','2026-03-24 16:42:28'),(98,62,'action complete via WP Cron','2026-03-24 16:42:28','2026-03-24 16:42:28'),(99,64,'action created','2026-03-24 16:42:28','2026-03-24 16:42:28'),(100,64,'action started via WP Cron','2026-03-24 17:14:04','2026-03-24 17:14:04'),(101,64,'action complete via WP Cron','2026-03-24 17:14:04','2026-03-24 17:14:04'),(102,65,'action created','2026-03-24 17:14:04','2026-03-24 17:14:04'),(103,63,'action started via WP Cron','2026-03-24 18:07:52','2026-03-24 18:07:52'),(104,63,'action complete via WP Cron','2026-03-24 18:07:52','2026-03-24 18:07:52'),(105,66,'action created','2026-03-24 18:07:52','2026-03-24 18:07:52'),(106,65,'action started via WP Cron','2026-03-24 18:07:52','2026-03-24 18:07:52'),(107,65,'action complete via WP Cron','2026-03-24 18:07:52','2026-03-24 18:07:52'),(108,67,'action created','2026-03-24 18:07:52','2026-03-24 18:07:52'),(109,67,'action started via WP Cron','2026-03-24 18:31:55','2026-03-24 18:31:55'),(110,67,'action complete via WP Cron','2026-03-24 18:31:55','2026-03-24 18:31:55'),(111,68,'action created','2026-03-24 18:31:55','2026-03-24 18:31:55'),(112,68,'action started via WP Cron','2026-03-24 20:15:37','2026-03-24 20:15:37'),(113,68,'action complete via WP Cron','2026-03-24 20:15:38','2026-03-24 20:15:38'),(114,69,'action created','2026-03-24 20:15:38','2026-03-24 20:15:38'),(115,66,'action started via WP Cron','2026-03-24 20:15:38','2026-03-24 20:15:38'),(116,66,'action complete via WP Cron','2026-03-24 20:15:38','2026-03-24 20:15:38'),(117,70,'action created','2026-03-24 20:15:38','2026-03-24 20:15:38'),(118,69,'action started via WP Cron','2026-03-24 20:36:48','2026-03-24 20:36:48'),(119,69,'action complete via WP Cron','2026-03-24 20:36:48','2026-03-24 20:36:48'),(120,71,'action created','2026-03-24 20:36:48','2026-03-24 20:36:48'),(121,71,'action started via WP Cron','2026-03-24 21:10:21','2026-03-24 21:10:21'),(122,71,'action complete via WP Cron','2026-03-24 21:10:21','2026-03-24 21:10:21'),(123,72,'action created','2026-03-24 21:10:21','2026-03-24 21:10:21'),(124,70,'action started via WP Cron','2026-03-24 22:20:14','2026-03-24 22:20:14'),(125,70,'action complete via WP Cron','2026-03-24 22:20:14','2026-03-24 22:20:14'),(126,73,'action created','2026-03-24 22:20:14','2026-03-24 22:20:14'),(127,72,'action started via WP Cron','2026-03-24 22:20:14','2026-03-24 22:20:14'),(128,72,'action complete via WP Cron','2026-03-24 22:20:14','2026-03-24 22:20:14'),(129,74,'action created','2026-03-24 22:20:14','2026-03-24 22:20:14'),(130,74,'action started via WP Cron','2026-03-24 22:42:06','2026-03-24 22:42:06'),(131,74,'action complete via WP Cron','2026-03-24 22:42:06','2026-03-24 22:42:06'),(132,75,'action created','2026-03-24 22:42:06','2026-03-24 22:42:06'),(133,75,'action started via WP Cron','2026-03-24 23:25:18','2026-03-24 23:25:18'),(134,75,'action complete via WP Cron','2026-03-24 23:25:18','2026-03-24 23:25:18'),(135,76,'action created','2026-03-24 23:25:18','2026-03-24 23:25:18'),(136,73,'action started via WP Cron','2026-03-24 23:25:18','2026-03-24 23:25:18'),(137,73,'action complete via WP Cron','2026-03-24 23:25:18','2026-03-24 23:25:18'),(138,77,'action created','2026-03-24 23:25:18','2026-03-24 23:25:18'),(139,76,'action started via WP Cron','2026-03-24 23:49:43','2026-03-24 23:49:43'),(140,76,'action complete via WP Cron','2026-03-24 23:49:43','2026-03-24 23:49:43'),(141,78,'action created','2026-03-24 23:49:43','2026-03-24 23:49:43'),(142,78,'action started via WP Cron','2026-03-25 00:25:59','2026-03-25 00:25:59'),(143,78,'action complete via WP Cron','2026-03-25 00:25:59','2026-03-25 00:25:59'),(144,79,'action created','2026-03-25 00:25:59','2026-03-25 00:25:59'),(145,77,'action started via WP Cron','2026-03-25 00:25:59','2026-03-25 00:25:59'),(146,77,'action complete via WP Cron','2026-03-25 00:25:59','2026-03-25 00:25:59'),(147,80,'action created','2026-03-25 00:25:59','2026-03-25 00:25:59');
/*!40000 ALTER TABLE `wp_actionscheduler_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_commentmeta`
--

DROP TABLE IF EXISTS `wp_commentmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_commentmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`meta_id`),
  KEY `comment_id` (`comment_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_commentmeta`
--

LOCK TABLES `wp_commentmeta` WRITE;
/*!40000 ALTER TABLE `wp_commentmeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_commentmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_comments`
--

DROP TABLE IF EXISTS `wp_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_comments` (
  `comment_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_post_ID` bigint(20) unsigned NOT NULL DEFAULT 0,
  `comment_author` tinytext NOT NULL,
  `comment_author_email` varchar(100) NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text NOT NULL,
  `comment_karma` int(11) NOT NULL DEFAULT 0,
  `comment_approved` varchar(20) NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) NOT NULL DEFAULT '',
  `comment_type` varchar(20) NOT NULL DEFAULT 'comment',
  `comment_parent` bigint(20) unsigned NOT NULL DEFAULT 0,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`comment_ID`),
  KEY `comment_post_ID` (`comment_post_ID`),
  KEY `comment_approved_date_gmt` (`comment_approved`,`comment_date_gmt`),
  KEY `comment_date_gmt` (`comment_date_gmt`),
  KEY `comment_parent` (`comment_parent`),
  KEY `comment_author_email` (`comment_author_email`(10))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_comments`
--

LOCK TABLES `wp_comments` WRITE;
/*!40000 ALTER TABLE `wp_comments` DISABLE KEYS */;
INSERT INTO `wp_comments` VALUES (1,1,'A WordPress Commenter','wapuu@wordpress.example','https://wordpress.org/','','2026-03-24 03:14:26','2026-03-24 03:14:26','Hi, this is a comment.\nTo get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.\nCommenter avatars come from <a href=\"https://gravatar.com/\">Gravatar</a>.',0,'1','','comment',0,0);
/*!40000 ALTER TABLE `wp_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_kb_optimizer`
--

DROP TABLE IF EXISTS `wp_kb_optimizer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_kb_optimizer` (
  `path_hash` char(64) NOT NULL COMMENT 'SHA-256 hash of the relative path of the URL used as a unique key for fast lookups',
  `path` text NOT NULL COMMENT 'The relative path of the URL, stored for reference and debugging',
  `analysis` longtext NOT NULL COMMENT 'Serialized or JSON-encoded analysis data associated with the path',
  PRIMARY KEY (`path_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_kb_optimizer`
--

LOCK TABLES `wp_kb_optimizer` WRITE;
/*!40000 ALTER TABLE `wp_kb_optimizer` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_kb_optimizer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_kb_optimizer_viewport_hashes`
--

DROP TABLE IF EXISTS `wp_kb_optimizer_viewport_hashes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_kb_optimizer_viewport_hashes` (
  `path_hash` char(64) NOT NULL COMMENT 'SHA-256 hash of the path (via $wp->request), identifies the URL',
  `viewport` enum('desktop','mobile') NOT NULL COMMENT 'The viewport/device identifier',
  `html_hash` varchar(191) NOT NULL COMMENT 'A composite of hashes separated by | in a key:MD5 value of the HTML markup for this viewport',
  PRIMARY KEY (`path_hash`,`viewport`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_kb_optimizer_viewport_hashes`
--

LOCK TABLES `wp_kb_optimizer_viewport_hashes` WRITE;
/*!40000 ALTER TABLE `wp_kb_optimizer_viewport_hashes` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_kb_optimizer_viewport_hashes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_links`
--

DROP TABLE IF EXISTS `wp_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_links` (
  `link_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `link_url` varchar(255) NOT NULL DEFAULT '',
  `link_name` varchar(255) NOT NULL DEFAULT '',
  `link_image` varchar(255) NOT NULL DEFAULT '',
  `link_target` varchar(25) NOT NULL DEFAULT '',
  `link_description` varchar(255) NOT NULL DEFAULT '',
  `link_visible` varchar(20) NOT NULL DEFAULT 'Y',
  `link_owner` bigint(20) unsigned NOT NULL DEFAULT 1,
  `link_rating` int(11) NOT NULL DEFAULT 0,
  `link_updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `link_rel` varchar(255) NOT NULL DEFAULT '',
  `link_notes` mediumtext NOT NULL,
  `link_rss` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`link_id`),
  KEY `link_visible` (`link_visible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_links`
--

LOCK TABLES `wp_links` WRITE;
/*!40000 ALTER TABLE `wp_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_options`
--

DROP TABLE IF EXISTS `wp_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_options` (
  `option_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(191) NOT NULL DEFAULT '',
  `option_value` longtext NOT NULL,
  `autoload` varchar(20) NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `option_name` (`option_name`),
  KEY `autoload` (`autoload`)
) ENGINE=InnoDB AUTO_INCREMENT=317 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_options`
--

LOCK TABLES `wp_options` WRITE;
/*!40000 ALTER TABLE `wp_options` DISABLE KEYS */;
INSERT INTO `wp_options` VALUES (1,'cron','a:9:{i:1774399116;a:1:{s:26:\"action_scheduler_run_queue\";a:1:{s:32:\"0d04ed39571b55704c122d726248bbac\";a:3:{s:8:\"schedule\";s:12:\"every_minute\";s:4:\"args\";a:1:{i:0;s:7:\"WP Cron\";}s:8:\"interval\";i:60;}}}i:1774401266;a:1:{s:34:\"wp_privacy_delete_old_export_files\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:6:\"hourly\";s:4:\"args\";a:0:{}s:8:\"interval\";i:3600;}}}i:1774408466;a:2:{s:30:\"wp_site_health_scheduled_check\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:6:\"weekly\";s:4:\"args\";a:0:{}s:8:\"interval\";i:604800;}}s:32:\"recovery_mode_clean_expired_keys\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:5:\"daily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:86400;}}}i:1774408776;a:1:{s:21:\"wp_update_user_counts\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}}i:1774412066;a:1:{s:16:\"wp_version_check\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}}i:1774413866;a:1:{s:17:\"wp_update_plugins\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}}i:1774415666;a:1:{s:16:\"wp_update_themes\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:3:{s:8:\"schedule\";s:10:\"twicedaily\";s:4:\"args\";a:0:{}s:8:\"interval\";i:43200;}}}i:1774828800;a:2:{s:28:\"wpforms_email_summaries_cron\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:2:{s:8:\"schedule\";b:0;s:4:\"args\";a:0:{}}}s:33:\"wpforms_weekly_entries_count_cron\";a:1:{s:32:\"40cd750bba9870f18aada2478b24840a\";a:2:{s:8:\"schedule\";b:0;s:4:\"args\";a:0:{}}}}s:7:\"version\";i:2;}','on'),(2,'siteurl','https://educationministry.org','on'),(3,'home','https://educationministry.org','on'),(4,'blogname','BT Education Ministry','on'),(5,'blogdescription','Empowering Communities Through Education and Civic Engagement','on'),(6,'users_can_register','1','on'),(7,'admin_email','bteducationministry@gmail.com','on'),(8,'start_of_week','1','on'),(9,'use_balanceTags','0','on'),(10,'use_smilies','1','on'),(11,'require_name_email','1','on'),(12,'comments_notify','1','on'),(13,'posts_per_rss','10','on'),(14,'rss_use_excerpt','0','on'),(15,'mailserver_url','mail.example.com','on'),(16,'mailserver_login','login@example.com','on'),(17,'mailserver_pass','','on'),(18,'mailserver_port','110','on'),(19,'default_category','1','on'),(20,'default_comment_status','open','on'),(21,'default_ping_status','open','on'),(22,'default_pingback_flag','1','on'),(23,'posts_per_page','10','on'),(24,'date_format','F j, Y','on'),(25,'time_format','g:i a','on'),(26,'links_updated_date_format','F j, Y g:i a','on'),(27,'comment_moderation','0','on'),(28,'moderation_notify','1','on'),(29,'permalink_structure','/%postname%/','on'),(30,'rewrite_rules','a:95:{s:11:\"^wp-json/?$\";s:22:\"index.php?rest_route=/\";s:14:\"^wp-json/(.*)?\";s:33:\"index.php?rest_route=/$matches[1]\";s:21:\"^index.php/wp-json/?$\";s:22:\"index.php?rest_route=/\";s:24:\"^index.php/wp-json/(.*)?\";s:33:\"index.php?rest_route=/$matches[1]\";s:17:\"^wp-sitemap\\.xml$\";s:23:\"index.php?sitemap=index\";s:17:\"^wp-sitemap\\.xsl$\";s:36:\"index.php?sitemap-stylesheet=sitemap\";s:23:\"^wp-sitemap-index\\.xsl$\";s:34:\"index.php?sitemap-stylesheet=index\";s:48:\"^wp-sitemap-([a-z]+?)-([a-z\\d_-]+?)-(\\d+?)\\.xml$\";s:75:\"index.php?sitemap=$matches[1]&sitemap-subtype=$matches[2]&paged=$matches[3]\";s:34:\"^wp-sitemap-([a-z]+?)-(\\d+?)\\.xml$\";s:47:\"index.php?sitemap=$matches[1]&paged=$matches[2]\";s:47:\"category/(.+?)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:52:\"index.php?category_name=$matches[1]&feed=$matches[2]\";s:42:\"category/(.+?)/(feed|rdf|rss|rss2|atom)/?$\";s:52:\"index.php?category_name=$matches[1]&feed=$matches[2]\";s:23:\"category/(.+?)/embed/?$\";s:46:\"index.php?category_name=$matches[1]&embed=true\";s:35:\"category/(.+?)/page/?([0-9]{1,})/?$\";s:53:\"index.php?category_name=$matches[1]&paged=$matches[2]\";s:17:\"category/(.+?)/?$\";s:35:\"index.php?category_name=$matches[1]\";s:44:\"tag/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?tag=$matches[1]&feed=$matches[2]\";s:39:\"tag/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?tag=$matches[1]&feed=$matches[2]\";s:20:\"tag/([^/]+)/embed/?$\";s:36:\"index.php?tag=$matches[1]&embed=true\";s:32:\"tag/([^/]+)/page/?([0-9]{1,})/?$\";s:43:\"index.php?tag=$matches[1]&paged=$matches[2]\";s:14:\"tag/([^/]+)/?$\";s:25:\"index.php?tag=$matches[1]\";s:45:\"type/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?post_format=$matches[1]&feed=$matches[2]\";s:40:\"type/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?post_format=$matches[1]&feed=$matches[2]\";s:21:\"type/([^/]+)/embed/?$\";s:44:\"index.php?post_format=$matches[1]&embed=true\";s:33:\"type/([^/]+)/page/?([0-9]{1,})/?$\";s:51:\"index.php?post_format=$matches[1]&paged=$matches[2]\";s:15:\"type/([^/]+)/?$\";s:33:\"index.php?post_format=$matches[1]\";s:12:\"robots\\.txt$\";s:18:\"index.php?robots=1\";s:13:\"favicon\\.ico$\";s:19:\"index.php?favicon=1\";s:12:\"sitemap\\.xml\";s:23:\"index.php?sitemap=index\";s:48:\".*wp-(atom|rdf|rss|rss2|feed|commentsrss2)\\.php$\";s:18:\"index.php?feed=old\";s:20:\".*wp-app\\.php(/.*)?$\";s:19:\"index.php?error=403\";s:18:\".*wp-register.php$\";s:23:\"index.php?register=true\";s:32:\"feed/(feed|rdf|rss|rss2|atom)/?$\";s:27:\"index.php?&feed=$matches[1]\";s:27:\"(feed|rdf|rss|rss2|atom)/?$\";s:27:\"index.php?&feed=$matches[1]\";s:8:\"embed/?$\";s:21:\"index.php?&embed=true\";s:20:\"page/?([0-9]{1,})/?$\";s:28:\"index.php?&paged=$matches[1]\";s:27:\"comment-page-([0-9]{1,})/?$\";s:38:\"index.php?&page_id=5&cpage=$matches[1]\";s:41:\"comments/feed/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?&feed=$matches[1]&withcomments=1\";s:36:\"comments/(feed|rdf|rss|rss2|atom)/?$\";s:42:\"index.php?&feed=$matches[1]&withcomments=1\";s:17:\"comments/embed/?$\";s:21:\"index.php?&embed=true\";s:44:\"search/(.+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:40:\"index.php?s=$matches[1]&feed=$matches[2]\";s:39:\"search/(.+)/(feed|rdf|rss|rss2|atom)/?$\";s:40:\"index.php?s=$matches[1]&feed=$matches[2]\";s:20:\"search/(.+)/embed/?$\";s:34:\"index.php?s=$matches[1]&embed=true\";s:32:\"search/(.+)/page/?([0-9]{1,})/?$\";s:41:\"index.php?s=$matches[1]&paged=$matches[2]\";s:14:\"search/(.+)/?$\";s:23:\"index.php?s=$matches[1]\";s:47:\"author/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?author_name=$matches[1]&feed=$matches[2]\";s:42:\"author/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:50:\"index.php?author_name=$matches[1]&feed=$matches[2]\";s:23:\"author/([^/]+)/embed/?$\";s:44:\"index.php?author_name=$matches[1]&embed=true\";s:35:\"author/([^/]+)/page/?([0-9]{1,})/?$\";s:51:\"index.php?author_name=$matches[1]&paged=$matches[2]\";s:17:\"author/([^/]+)/?$\";s:33:\"index.php?author_name=$matches[1]\";s:69:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/feed/(feed|rdf|rss|rss2|atom)/?$\";s:80:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&feed=$matches[4]\";s:64:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/(feed|rdf|rss|rss2|atom)/?$\";s:80:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&feed=$matches[4]\";s:45:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/embed/?$\";s:74:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&embed=true\";s:57:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/page/?([0-9]{1,})/?$\";s:81:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]&paged=$matches[4]\";s:39:\"([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/?$\";s:63:\"index.php?year=$matches[1]&monthnum=$matches[2]&day=$matches[3]\";s:56:\"([0-9]{4})/([0-9]{1,2})/feed/(feed|rdf|rss|rss2|atom)/?$\";s:64:\"index.php?year=$matches[1]&monthnum=$matches[2]&feed=$matches[3]\";s:51:\"([0-9]{4})/([0-9]{1,2})/(feed|rdf|rss|rss2|atom)/?$\";s:64:\"index.php?year=$matches[1]&monthnum=$matches[2]&feed=$matches[3]\";s:32:\"([0-9]{4})/([0-9]{1,2})/embed/?$\";s:58:\"index.php?year=$matches[1]&monthnum=$matches[2]&embed=true\";s:44:\"([0-9]{4})/([0-9]{1,2})/page/?([0-9]{1,})/?$\";s:65:\"index.php?year=$matches[1]&monthnum=$matches[2]&paged=$matches[3]\";s:26:\"([0-9]{4})/([0-9]{1,2})/?$\";s:47:\"index.php?year=$matches[1]&monthnum=$matches[2]\";s:43:\"([0-9]{4})/feed/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?year=$matches[1]&feed=$matches[2]\";s:38:\"([0-9]{4})/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?year=$matches[1]&feed=$matches[2]\";s:19:\"([0-9]{4})/embed/?$\";s:37:\"index.php?year=$matches[1]&embed=true\";s:31:\"([0-9]{4})/page/?([0-9]{1,})/?$\";s:44:\"index.php?year=$matches[1]&paged=$matches[2]\";s:13:\"([0-9]{4})/?$\";s:26:\"index.php?year=$matches[1]\";s:27:\".?.+?/attachment/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:37:\".?.+?/attachment/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:57:\".?.+?/attachment/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:52:\".?.+?/attachment/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:52:\".?.+?/attachment/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:33:\".?.+?/attachment/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";s:16:\"(.?.+?)/embed/?$\";s:41:\"index.php?pagename=$matches[1]&embed=true\";s:20:\"(.?.+?)/trackback/?$\";s:35:\"index.php?pagename=$matches[1]&tb=1\";s:40:\"(.?.+?)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:47:\"index.php?pagename=$matches[1]&feed=$matches[2]\";s:35:\"(.?.+?)/(feed|rdf|rss|rss2|atom)/?$\";s:47:\"index.php?pagename=$matches[1]&feed=$matches[2]\";s:28:\"(.?.+?)/page/?([0-9]{1,})/?$\";s:48:\"index.php?pagename=$matches[1]&paged=$matches[2]\";s:35:\"(.?.+?)/comment-page-([0-9]{1,})/?$\";s:48:\"index.php?pagename=$matches[1]&cpage=$matches[2]\";s:24:\"(.?.+?)(?:/([0-9]+))?/?$\";s:47:\"index.php?pagename=$matches[1]&page=$matches[2]\";s:27:\"[^/]+/attachment/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:37:\"[^/]+/attachment/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:57:\"[^/]+/attachment/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:52:\"[^/]+/attachment/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:52:\"[^/]+/attachment/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:33:\"[^/]+/attachment/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";s:16:\"([^/]+)/embed/?$\";s:37:\"index.php?name=$matches[1]&embed=true\";s:20:\"([^/]+)/trackback/?$\";s:31:\"index.php?name=$matches[1]&tb=1\";s:40:\"([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?name=$matches[1]&feed=$matches[2]\";s:35:\"([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:43:\"index.php?name=$matches[1]&feed=$matches[2]\";s:28:\"([^/]+)/page/?([0-9]{1,})/?$\";s:44:\"index.php?name=$matches[1]&paged=$matches[2]\";s:35:\"([^/]+)/comment-page-([0-9]{1,})/?$\";s:44:\"index.php?name=$matches[1]&cpage=$matches[2]\";s:24:\"([^/]+)(?:/([0-9]+))?/?$\";s:43:\"index.php?name=$matches[1]&page=$matches[2]\";s:16:\"[^/]+/([^/]+)/?$\";s:32:\"index.php?attachment=$matches[1]\";s:26:\"[^/]+/([^/]+)/trackback/?$\";s:37:\"index.php?attachment=$matches[1]&tb=1\";s:46:\"[^/]+/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:41:\"[^/]+/([^/]+)/(feed|rdf|rss|rss2|atom)/?$\";s:49:\"index.php?attachment=$matches[1]&feed=$matches[2]\";s:41:\"[^/]+/([^/]+)/comment-page-([0-9]{1,})/?$\";s:50:\"index.php?attachment=$matches[1]&cpage=$matches[2]\";s:22:\"[^/]+/([^/]+)/embed/?$\";s:43:\"index.php?attachment=$matches[1]&embed=true\";}','on'),(31,'hack_file','0','on'),(32,'blog_charset','UTF-8','on'),(33,'moderation_keys','','off'),(34,'active_plugins','a:3:{i:0;s:33:\"kadence-blocks/kadence-blocks.php\";i:1;s:45:\"paid-memberships-pro/paid-memberships-pro.php\";i:2;s:24:\"wpforms-lite/wpforms.php\";}','on'),(35,'category_base','','on'),(36,'ping_sites','https://rpc.pingomatic.com/','on'),(37,'comment_max_links','2','on'),(38,'gmt_offset','0','on'),(39,'default_email_category','1','on'),(40,'recently_edited','','off'),(41,'template','bt-education-ministry','on'),(42,'stylesheet','bt-education-ministry','on'),(43,'comment_registration','0','on'),(44,'html_type','text/html','on'),(45,'use_trackback','0','on'),(46,'default_role','subscriber','on'),(47,'db_version','60717','on'),(48,'uploads_use_yearmonth_folders','1','on'),(49,'upload_path','','on'),(50,'blog_public','1','on'),(51,'default_link_category','2','on'),(52,'show_on_front','page','on'),(53,'tag_base','','on'),(54,'show_avatars','1','on'),(55,'avatar_rating','G','on'),(56,'upload_url_path','','on'),(57,'thumbnail_size_w','150','on'),(58,'thumbnail_size_h','150','on'),(59,'thumbnail_crop','1','on'),(60,'medium_size_w','300','on'),(61,'medium_size_h','300','on'),(62,'avatar_default','mystery','on'),(63,'large_size_w','1024','on'),(64,'large_size_h','1024','on'),(65,'image_default_link_type','none','on'),(66,'image_default_size','','on'),(67,'image_default_align','','on'),(68,'close_comments_for_old_posts','0','on'),(69,'close_comments_days_old','14','on'),(70,'thread_comments','1','on'),(71,'thread_comments_depth','5','on'),(72,'page_comments','0','on'),(73,'comments_per_page','50','on'),(74,'default_comments_page','newest','on'),(75,'comment_order','asc','on'),(76,'sticky_posts','a:0:{}','on'),(77,'widget_categories','a:0:{}','on'),(78,'widget_text','a:0:{}','on'),(79,'widget_rss','a:0:{}','on'),(80,'uninstall_plugins','a:0:{}','off'),(81,'timezone_string','','on'),(82,'page_for_posts','0','on'),(83,'page_on_front','5','on'),(84,'default_post_format','0','on'),(85,'link_manager_enabled','0','on'),(86,'finished_splitting_shared_terms','1','on'),(87,'site_icon','0','on'),(88,'medium_large_size_w','768','on'),(89,'medium_large_size_h','0','on'),(90,'wp_page_for_privacy_policy','3','on'),(91,'show_comments_cookies_opt_in','1','on'),(92,'admin_email_lifespan','1789874066','on'),(93,'disallowed_keys','','off'),(94,'comment_previously_approved','1','on'),(95,'auto_plugin_theme_update_emails','a:0:{}','off'),(96,'auto_update_core_dev','enabled','on'),(97,'auto_update_core_minor','enabled','on'),(98,'auto_update_core_major','enabled','on'),(99,'wp_force_deactivated_plugins','a:0:{}','on'),(100,'wp_attachment_pages_enabled','0','on'),(101,'wp_notes_notify','1','on'),(102,'initial_db_version','60717','on'),(103,'wp_user_roles','a:5:{s:13:\"administrator\";a:2:{s:4:\"name\";s:13:\"Administrator\";s:12:\"capabilities\";a:87:{s:13:\"switch_themes\";b:1;s:11:\"edit_themes\";b:1;s:16:\"activate_plugins\";b:1;s:12:\"edit_plugins\";b:1;s:10:\"edit_users\";b:1;s:10:\"edit_files\";b:1;s:14:\"manage_options\";b:1;s:17:\"moderate_comments\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:12:\"upload_files\";b:1;s:6:\"import\";b:1;s:15:\"unfiltered_html\";b:1;s:10:\"edit_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:10:\"edit_pages\";b:1;s:4:\"read\";b:1;s:8:\"level_10\";b:1;s:7:\"level_9\";b:1;s:7:\"level_8\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:17:\"edit_others_pages\";b:1;s:20:\"edit_published_pages\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_pages\";b:1;s:19:\"delete_others_pages\";b:1;s:22:\"delete_published_pages\";b:1;s:12:\"delete_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:22:\"delete_published_posts\";b:1;s:20:\"delete_private_posts\";b:1;s:18:\"edit_private_posts\";b:1;s:18:\"read_private_posts\";b:1;s:20:\"delete_private_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"read_private_pages\";b:1;s:12:\"delete_users\";b:1;s:12:\"create_users\";b:1;s:17:\"unfiltered_upload\";b:1;s:14:\"edit_dashboard\";b:1;s:14:\"update_plugins\";b:1;s:14:\"delete_plugins\";b:1;s:15:\"install_plugins\";b:1;s:13:\"update_themes\";b:1;s:14:\"install_themes\";b:1;s:11:\"update_core\";b:1;s:10:\"list_users\";b:1;s:12:\"remove_users\";b:1;s:13:\"promote_users\";b:1;s:18:\"edit_theme_options\";b:1;s:13:\"delete_themes\";b:1;s:6:\"export\";b:1;s:22:\"pmpro_memberships_menu\";b:1;s:15:\"pmpro_dashboard\";b:1;s:12:\"pmpro_wizard\";b:1;s:22:\"pmpro_membershiplevels\";b:1;s:18:\"pmpro_edit_members\";b:1;s:18:\"pmpro_pagesettings\";b:1;s:21:\"pmpro_paymentsettings\";b:1;s:17:\"pmpro_taxsettings\";b:1;s:22:\"pmpro_securitysettings\";b:1;s:19:\"pmpro_emailsettings\";b:1;s:20:\"pmpro_emailtemplates\";b:1;s:20:\"pmpro_designsettings\";b:1;s:22:\"pmpro_advancedsettings\";b:1;s:12:\"pmpro_addons\";b:1;s:15:\"pmpro_loginscsv\";b:1;s:17:\"pmpro_memberslist\";b:1;s:20:\"pmpro_memberslistcsv\";b:1;s:13:\"pmpro_reports\";b:1;s:16:\"pmpro_reportscsv\";b:1;s:12:\"pmpro_orders\";b:1;s:15:\"pmpro_orderscsv\";b:1;s:22:\"pmpro_sales_report_csv\";b:1;s:19:\"pmpro_discountcodes\";b:1;s:16:\"pmpro_userfields\";b:1;s:13:\"pmpro_updates\";b:1;s:23:\"pmpro_manage_pause_mode\";b:1;}}s:6:\"editor\";a:2:{s:4:\"name\";s:6:\"Editor\";s:12:\"capabilities\";a:34:{s:17:\"moderate_comments\";b:1;s:17:\"manage_categories\";b:1;s:12:\"manage_links\";b:1;s:12:\"upload_files\";b:1;s:15:\"unfiltered_html\";b:1;s:10:\"edit_posts\";b:1;s:17:\"edit_others_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:10:\"edit_pages\";b:1;s:4:\"read\";b:1;s:7:\"level_7\";b:1;s:7:\"level_6\";b:1;s:7:\"level_5\";b:1;s:7:\"level_4\";b:1;s:7:\"level_3\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:17:\"edit_others_pages\";b:1;s:20:\"edit_published_pages\";b:1;s:13:\"publish_pages\";b:1;s:12:\"delete_pages\";b:1;s:19:\"delete_others_pages\";b:1;s:22:\"delete_published_pages\";b:1;s:12:\"delete_posts\";b:1;s:19:\"delete_others_posts\";b:1;s:22:\"delete_published_posts\";b:1;s:20:\"delete_private_posts\";b:1;s:18:\"edit_private_posts\";b:1;s:18:\"read_private_posts\";b:1;s:20:\"delete_private_pages\";b:1;s:18:\"edit_private_pages\";b:1;s:18:\"read_private_pages\";b:1;}}s:6:\"author\";a:2:{s:4:\"name\";s:6:\"Author\";s:12:\"capabilities\";a:10:{s:12:\"upload_files\";b:1;s:10:\"edit_posts\";b:1;s:20:\"edit_published_posts\";b:1;s:13:\"publish_posts\";b:1;s:4:\"read\";b:1;s:7:\"level_2\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:12:\"delete_posts\";b:1;s:22:\"delete_published_posts\";b:1;}}s:11:\"contributor\";a:2:{s:4:\"name\";s:11:\"Contributor\";s:12:\"capabilities\";a:5:{s:10:\"edit_posts\";b:1;s:4:\"read\";b:1;s:7:\"level_1\";b:1;s:7:\"level_0\";b:1;s:12:\"delete_posts\";b:1;}}s:10:\"subscriber\";a:2:{s:4:\"name\";s:10:\"Subscriber\";s:12:\"capabilities\";a:2:{s:4:\"read\";b:1;s:7:\"level_0\";b:1;}}}','on'),(104,'fresh_site','0','off'),(105,'user_count','1','off'),(106,'widget_block','a:6:{i:2;a:1:{s:7:\"content\";s:19:\"<!-- wp:search /-->\";}i:3;a:1:{s:7:\"content\";s:154:\"<!-- wp:group --><div class=\"wp-block-group\"><!-- wp:heading --><h2>Recent Posts</h2><!-- /wp:heading --><!-- wp:latest-posts /--></div><!-- /wp:group -->\";}i:4;a:1:{s:7:\"content\";s:227:\"<!-- wp:group --><div class=\"wp-block-group\"><!-- wp:heading --><h2>Recent Comments</h2><!-- /wp:heading --><!-- wp:latest-comments {\"displayAvatar\":false,\"displayDate\":false,\"displayExcerpt\":false} /--></div><!-- /wp:group -->\";}i:5;a:1:{s:7:\"content\";s:146:\"<!-- wp:group --><div class=\"wp-block-group\"><!-- wp:heading --><h2>Archives</h2><!-- /wp:heading --><!-- wp:archives /--></div><!-- /wp:group -->\";}i:6;a:1:{s:7:\"content\";s:150:\"<!-- wp:group --><div class=\"wp-block-group\"><!-- wp:heading --><h2>Categories</h2><!-- /wp:heading --><!-- wp:categories /--></div><!-- /wp:group -->\";}s:12:\"_multiwidget\";i:1;}','auto'),(107,'sidebars_widgets','a:6:{s:19:\"wp_inactive_widgets\";a:0:{}s:8:\"footer-1\";a:0:{}s:8:\"footer-2\";a:0:{}s:9:\"sidebar-1\";a:5:{i:0;s:7:\"block-2\";i:1;s:7:\"block-3\";i:2;s:7:\"block-4\";i:3;s:7:\"block-5\";i:4;s:7:\"block-6\";}s:6:\"member\";a:0:{}s:13:\"array_version\";i:3;}','auto'),(108,'widget_pages','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(109,'widget_calendar','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(110,'widget_archives','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(111,'widget_media_audio','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(112,'widget_media_image','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(113,'widget_media_gallery','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(114,'widget_media_video','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(115,'widget_meta','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(116,'widget_search','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(117,'widget_recent-posts','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(118,'widget_recent-comments','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(119,'widget_tag_cloud','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(120,'widget_nav_menu','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(121,'widget_custom_html','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(122,'_transient_wp_core_block_css_files','a:2:{s:7:\"version\";s:5:\"6.9.4\";s:5:\"files\";a:584:{i:0;s:31:\"accordion-heading/style-rtl.css\";i:1;s:35:\"accordion-heading/style-rtl.min.css\";i:2;s:27:\"accordion-heading/style.css\";i:3;s:31:\"accordion-heading/style.min.css\";i:4;s:28:\"accordion-item/style-rtl.css\";i:5;s:32:\"accordion-item/style-rtl.min.css\";i:6;s:24:\"accordion-item/style.css\";i:7;s:28:\"accordion-item/style.min.css\";i:8;s:29:\"accordion-panel/style-rtl.css\";i:9;s:33:\"accordion-panel/style-rtl.min.css\";i:10;s:25:\"accordion-panel/style.css\";i:11;s:29:\"accordion-panel/style.min.css\";i:12;s:23:\"accordion/style-rtl.css\";i:13;s:27:\"accordion/style-rtl.min.css\";i:14;s:19:\"accordion/style.css\";i:15;s:23:\"accordion/style.min.css\";i:16;s:23:\"archives/editor-rtl.css\";i:17;s:27:\"archives/editor-rtl.min.css\";i:18;s:19:\"archives/editor.css\";i:19;s:23:\"archives/editor.min.css\";i:20;s:22:\"archives/style-rtl.css\";i:21;s:26:\"archives/style-rtl.min.css\";i:22;s:18:\"archives/style.css\";i:23;s:22:\"archives/style.min.css\";i:24;s:20:\"audio/editor-rtl.css\";i:25;s:24:\"audio/editor-rtl.min.css\";i:26;s:16:\"audio/editor.css\";i:27;s:20:\"audio/editor.min.css\";i:28;s:19:\"audio/style-rtl.css\";i:29;s:23:\"audio/style-rtl.min.css\";i:30;s:15:\"audio/style.css\";i:31;s:19:\"audio/style.min.css\";i:32;s:19:\"audio/theme-rtl.css\";i:33;s:23:\"audio/theme-rtl.min.css\";i:34;s:15:\"audio/theme.css\";i:35;s:19:\"audio/theme.min.css\";i:36;s:21:\"avatar/editor-rtl.css\";i:37;s:25:\"avatar/editor-rtl.min.css\";i:38;s:17:\"avatar/editor.css\";i:39;s:21:\"avatar/editor.min.css\";i:40;s:20:\"avatar/style-rtl.css\";i:41;s:24:\"avatar/style-rtl.min.css\";i:42;s:16:\"avatar/style.css\";i:43;s:20:\"avatar/style.min.css\";i:44;s:21:\"button/editor-rtl.css\";i:45;s:25:\"button/editor-rtl.min.css\";i:46;s:17:\"button/editor.css\";i:47;s:21:\"button/editor.min.css\";i:48;s:20:\"button/style-rtl.css\";i:49;s:24:\"button/style-rtl.min.css\";i:50;s:16:\"button/style.css\";i:51;s:20:\"button/style.min.css\";i:52;s:22:\"buttons/editor-rtl.css\";i:53;s:26:\"buttons/editor-rtl.min.css\";i:54;s:18:\"buttons/editor.css\";i:55;s:22:\"buttons/editor.min.css\";i:56;s:21:\"buttons/style-rtl.css\";i:57;s:25:\"buttons/style-rtl.min.css\";i:58;s:17:\"buttons/style.css\";i:59;s:21:\"buttons/style.min.css\";i:60;s:22:\"calendar/style-rtl.css\";i:61;s:26:\"calendar/style-rtl.min.css\";i:62;s:18:\"calendar/style.css\";i:63;s:22:\"calendar/style.min.css\";i:64;s:25:\"categories/editor-rtl.css\";i:65;s:29:\"categories/editor-rtl.min.css\";i:66;s:21:\"categories/editor.css\";i:67;s:25:\"categories/editor.min.css\";i:68;s:24:\"categories/style-rtl.css\";i:69;s:28:\"categories/style-rtl.min.css\";i:70;s:20:\"categories/style.css\";i:71;s:24:\"categories/style.min.css\";i:72;s:19:\"code/editor-rtl.css\";i:73;s:23:\"code/editor-rtl.min.css\";i:74;s:15:\"code/editor.css\";i:75;s:19:\"code/editor.min.css\";i:76;s:18:\"code/style-rtl.css\";i:77;s:22:\"code/style-rtl.min.css\";i:78;s:14:\"code/style.css\";i:79;s:18:\"code/style.min.css\";i:80;s:18:\"code/theme-rtl.css\";i:81;s:22:\"code/theme-rtl.min.css\";i:82;s:14:\"code/theme.css\";i:83;s:18:\"code/theme.min.css\";i:84;s:22:\"columns/editor-rtl.css\";i:85;s:26:\"columns/editor-rtl.min.css\";i:86;s:18:\"columns/editor.css\";i:87;s:22:\"columns/editor.min.css\";i:88;s:21:\"columns/style-rtl.css\";i:89;s:25:\"columns/style-rtl.min.css\";i:90;s:17:\"columns/style.css\";i:91;s:21:\"columns/style.min.css\";i:92;s:33:\"comment-author-name/style-rtl.css\";i:93;s:37:\"comment-author-name/style-rtl.min.css\";i:94;s:29:\"comment-author-name/style.css\";i:95;s:33:\"comment-author-name/style.min.css\";i:96;s:29:\"comment-content/style-rtl.css\";i:97;s:33:\"comment-content/style-rtl.min.css\";i:98;s:25:\"comment-content/style.css\";i:99;s:29:\"comment-content/style.min.css\";i:100;s:26:\"comment-date/style-rtl.css\";i:101;s:30:\"comment-date/style-rtl.min.css\";i:102;s:22:\"comment-date/style.css\";i:103;s:26:\"comment-date/style.min.css\";i:104;s:31:\"comment-edit-link/style-rtl.css\";i:105;s:35:\"comment-edit-link/style-rtl.min.css\";i:106;s:27:\"comment-edit-link/style.css\";i:107;s:31:\"comment-edit-link/style.min.css\";i:108;s:32:\"comment-reply-link/style-rtl.css\";i:109;s:36:\"comment-reply-link/style-rtl.min.css\";i:110;s:28:\"comment-reply-link/style.css\";i:111;s:32:\"comment-reply-link/style.min.css\";i:112;s:30:\"comment-template/style-rtl.css\";i:113;s:34:\"comment-template/style-rtl.min.css\";i:114;s:26:\"comment-template/style.css\";i:115;s:30:\"comment-template/style.min.css\";i:116;s:42:\"comments-pagination-numbers/editor-rtl.css\";i:117;s:46:\"comments-pagination-numbers/editor-rtl.min.css\";i:118;s:38:\"comments-pagination-numbers/editor.css\";i:119;s:42:\"comments-pagination-numbers/editor.min.css\";i:120;s:34:\"comments-pagination/editor-rtl.css\";i:121;s:38:\"comments-pagination/editor-rtl.min.css\";i:122;s:30:\"comments-pagination/editor.css\";i:123;s:34:\"comments-pagination/editor.min.css\";i:124;s:33:\"comments-pagination/style-rtl.css\";i:125;s:37:\"comments-pagination/style-rtl.min.css\";i:126;s:29:\"comments-pagination/style.css\";i:127;s:33:\"comments-pagination/style.min.css\";i:128;s:29:\"comments-title/editor-rtl.css\";i:129;s:33:\"comments-title/editor-rtl.min.css\";i:130;s:25:\"comments-title/editor.css\";i:131;s:29:\"comments-title/editor.min.css\";i:132;s:23:\"comments/editor-rtl.css\";i:133;s:27:\"comments/editor-rtl.min.css\";i:134;s:19:\"comments/editor.css\";i:135;s:23:\"comments/editor.min.css\";i:136;s:22:\"comments/style-rtl.css\";i:137;s:26:\"comments/style-rtl.min.css\";i:138;s:18:\"comments/style.css\";i:139;s:22:\"comments/style.min.css\";i:140;s:20:\"cover/editor-rtl.css\";i:141;s:24:\"cover/editor-rtl.min.css\";i:142;s:16:\"cover/editor.css\";i:143;s:20:\"cover/editor.min.css\";i:144;s:19:\"cover/style-rtl.css\";i:145;s:23:\"cover/style-rtl.min.css\";i:146;s:15:\"cover/style.css\";i:147;s:19:\"cover/style.min.css\";i:148;s:22:\"details/editor-rtl.css\";i:149;s:26:\"details/editor-rtl.min.css\";i:150;s:18:\"details/editor.css\";i:151;s:22:\"details/editor.min.css\";i:152;s:21:\"details/style-rtl.css\";i:153;s:25:\"details/style-rtl.min.css\";i:154;s:17:\"details/style.css\";i:155;s:21:\"details/style.min.css\";i:156;s:20:\"embed/editor-rtl.css\";i:157;s:24:\"embed/editor-rtl.min.css\";i:158;s:16:\"embed/editor.css\";i:159;s:20:\"embed/editor.min.css\";i:160;s:19:\"embed/style-rtl.css\";i:161;s:23:\"embed/style-rtl.min.css\";i:162;s:15:\"embed/style.css\";i:163;s:19:\"embed/style.min.css\";i:164;s:19:\"embed/theme-rtl.css\";i:165;s:23:\"embed/theme-rtl.min.css\";i:166;s:15:\"embed/theme.css\";i:167;s:19:\"embed/theme.min.css\";i:168;s:19:\"file/editor-rtl.css\";i:169;s:23:\"file/editor-rtl.min.css\";i:170;s:15:\"file/editor.css\";i:171;s:19:\"file/editor.min.css\";i:172;s:18:\"file/style-rtl.css\";i:173;s:22:\"file/style-rtl.min.css\";i:174;s:14:\"file/style.css\";i:175;s:18:\"file/style.min.css\";i:176;s:23:\"footnotes/style-rtl.css\";i:177;s:27:\"footnotes/style-rtl.min.css\";i:178;s:19:\"footnotes/style.css\";i:179;s:23:\"footnotes/style.min.css\";i:180;s:23:\"freeform/editor-rtl.css\";i:181;s:27:\"freeform/editor-rtl.min.css\";i:182;s:19:\"freeform/editor.css\";i:183;s:23:\"freeform/editor.min.css\";i:184;s:22:\"gallery/editor-rtl.css\";i:185;s:26:\"gallery/editor-rtl.min.css\";i:186;s:18:\"gallery/editor.css\";i:187;s:22:\"gallery/editor.min.css\";i:188;s:21:\"gallery/style-rtl.css\";i:189;s:25:\"gallery/style-rtl.min.css\";i:190;s:17:\"gallery/style.css\";i:191;s:21:\"gallery/style.min.css\";i:192;s:21:\"gallery/theme-rtl.css\";i:193;s:25:\"gallery/theme-rtl.min.css\";i:194;s:17:\"gallery/theme.css\";i:195;s:21:\"gallery/theme.min.css\";i:196;s:20:\"group/editor-rtl.css\";i:197;s:24:\"group/editor-rtl.min.css\";i:198;s:16:\"group/editor.css\";i:199;s:20:\"group/editor.min.css\";i:200;s:19:\"group/style-rtl.css\";i:201;s:23:\"group/style-rtl.min.css\";i:202;s:15:\"group/style.css\";i:203;s:19:\"group/style.min.css\";i:204;s:19:\"group/theme-rtl.css\";i:205;s:23:\"group/theme-rtl.min.css\";i:206;s:15:\"group/theme.css\";i:207;s:19:\"group/theme.min.css\";i:208;s:21:\"heading/style-rtl.css\";i:209;s:25:\"heading/style-rtl.min.css\";i:210;s:17:\"heading/style.css\";i:211;s:21:\"heading/style.min.css\";i:212;s:19:\"html/editor-rtl.css\";i:213;s:23:\"html/editor-rtl.min.css\";i:214;s:15:\"html/editor.css\";i:215;s:19:\"html/editor.min.css\";i:216;s:20:\"image/editor-rtl.css\";i:217;s:24:\"image/editor-rtl.min.css\";i:218;s:16:\"image/editor.css\";i:219;s:20:\"image/editor.min.css\";i:220;s:19:\"image/style-rtl.css\";i:221;s:23:\"image/style-rtl.min.css\";i:222;s:15:\"image/style.css\";i:223;s:19:\"image/style.min.css\";i:224;s:19:\"image/theme-rtl.css\";i:225;s:23:\"image/theme-rtl.min.css\";i:226;s:15:\"image/theme.css\";i:227;s:19:\"image/theme.min.css\";i:228;s:29:\"latest-comments/style-rtl.css\";i:229;s:33:\"latest-comments/style-rtl.min.css\";i:230;s:25:\"latest-comments/style.css\";i:231;s:29:\"latest-comments/style.min.css\";i:232;s:27:\"latest-posts/editor-rtl.css\";i:233;s:31:\"latest-posts/editor-rtl.min.css\";i:234;s:23:\"latest-posts/editor.css\";i:235;s:27:\"latest-posts/editor.min.css\";i:236;s:26:\"latest-posts/style-rtl.css\";i:237;s:30:\"latest-posts/style-rtl.min.css\";i:238;s:22:\"latest-posts/style.css\";i:239;s:26:\"latest-posts/style.min.css\";i:240;s:18:\"list/style-rtl.css\";i:241;s:22:\"list/style-rtl.min.css\";i:242;s:14:\"list/style.css\";i:243;s:18:\"list/style.min.css\";i:244;s:22:\"loginout/style-rtl.css\";i:245;s:26:\"loginout/style-rtl.min.css\";i:246;s:18:\"loginout/style.css\";i:247;s:22:\"loginout/style.min.css\";i:248;s:19:\"math/editor-rtl.css\";i:249;s:23:\"math/editor-rtl.min.css\";i:250;s:15:\"math/editor.css\";i:251;s:19:\"math/editor.min.css\";i:252;s:18:\"math/style-rtl.css\";i:253;s:22:\"math/style-rtl.min.css\";i:254;s:14:\"math/style.css\";i:255;s:18:\"math/style.min.css\";i:256;s:25:\"media-text/editor-rtl.css\";i:257;s:29:\"media-text/editor-rtl.min.css\";i:258;s:21:\"media-text/editor.css\";i:259;s:25:\"media-text/editor.min.css\";i:260;s:24:\"media-text/style-rtl.css\";i:261;s:28:\"media-text/style-rtl.min.css\";i:262;s:20:\"media-text/style.css\";i:263;s:24:\"media-text/style.min.css\";i:264;s:19:\"more/editor-rtl.css\";i:265;s:23:\"more/editor-rtl.min.css\";i:266;s:15:\"more/editor.css\";i:267;s:19:\"more/editor.min.css\";i:268;s:30:\"navigation-link/editor-rtl.css\";i:269;s:34:\"navigation-link/editor-rtl.min.css\";i:270;s:26:\"navigation-link/editor.css\";i:271;s:30:\"navigation-link/editor.min.css\";i:272;s:29:\"navigation-link/style-rtl.css\";i:273;s:33:\"navigation-link/style-rtl.min.css\";i:274;s:25:\"navigation-link/style.css\";i:275;s:29:\"navigation-link/style.min.css\";i:276;s:33:\"navigation-submenu/editor-rtl.css\";i:277;s:37:\"navigation-submenu/editor-rtl.min.css\";i:278;s:29:\"navigation-submenu/editor.css\";i:279;s:33:\"navigation-submenu/editor.min.css\";i:280;s:25:\"navigation/editor-rtl.css\";i:281;s:29:\"navigation/editor-rtl.min.css\";i:282;s:21:\"navigation/editor.css\";i:283;s:25:\"navigation/editor.min.css\";i:284;s:24:\"navigation/style-rtl.css\";i:285;s:28:\"navigation/style-rtl.min.css\";i:286;s:20:\"navigation/style.css\";i:287;s:24:\"navigation/style.min.css\";i:288;s:23:\"nextpage/editor-rtl.css\";i:289;s:27:\"nextpage/editor-rtl.min.css\";i:290;s:19:\"nextpage/editor.css\";i:291;s:23:\"nextpage/editor.min.css\";i:292;s:24:\"page-list/editor-rtl.css\";i:293;s:28:\"page-list/editor-rtl.min.css\";i:294;s:20:\"page-list/editor.css\";i:295;s:24:\"page-list/editor.min.css\";i:296;s:23:\"page-list/style-rtl.css\";i:297;s:27:\"page-list/style-rtl.min.css\";i:298;s:19:\"page-list/style.css\";i:299;s:23:\"page-list/style.min.css\";i:300;s:24:\"paragraph/editor-rtl.css\";i:301;s:28:\"paragraph/editor-rtl.min.css\";i:302;s:20:\"paragraph/editor.css\";i:303;s:24:\"paragraph/editor.min.css\";i:304;s:23:\"paragraph/style-rtl.css\";i:305;s:27:\"paragraph/style-rtl.min.css\";i:306;s:19:\"paragraph/style.css\";i:307;s:23:\"paragraph/style.min.css\";i:308;s:35:\"post-author-biography/style-rtl.css\";i:309;s:39:\"post-author-biography/style-rtl.min.css\";i:310;s:31:\"post-author-biography/style.css\";i:311;s:35:\"post-author-biography/style.min.css\";i:312;s:30:\"post-author-name/style-rtl.css\";i:313;s:34:\"post-author-name/style-rtl.min.css\";i:314;s:26:\"post-author-name/style.css\";i:315;s:30:\"post-author-name/style.min.css\";i:316;s:25:\"post-author/style-rtl.css\";i:317;s:29:\"post-author/style-rtl.min.css\";i:318;s:21:\"post-author/style.css\";i:319;s:25:\"post-author/style.min.css\";i:320;s:33:\"post-comments-count/style-rtl.css\";i:321;s:37:\"post-comments-count/style-rtl.min.css\";i:322;s:29:\"post-comments-count/style.css\";i:323;s:33:\"post-comments-count/style.min.css\";i:324;s:33:\"post-comments-form/editor-rtl.css\";i:325;s:37:\"post-comments-form/editor-rtl.min.css\";i:326;s:29:\"post-comments-form/editor.css\";i:327;s:33:\"post-comments-form/editor.min.css\";i:328;s:32:\"post-comments-form/style-rtl.css\";i:329;s:36:\"post-comments-form/style-rtl.min.css\";i:330;s:28:\"post-comments-form/style.css\";i:331;s:32:\"post-comments-form/style.min.css\";i:332;s:32:\"post-comments-link/style-rtl.css\";i:333;s:36:\"post-comments-link/style-rtl.min.css\";i:334;s:28:\"post-comments-link/style.css\";i:335;s:32:\"post-comments-link/style.min.css\";i:336;s:26:\"post-content/style-rtl.css\";i:337;s:30:\"post-content/style-rtl.min.css\";i:338;s:22:\"post-content/style.css\";i:339;s:26:\"post-content/style.min.css\";i:340;s:23:\"post-date/style-rtl.css\";i:341;s:27:\"post-date/style-rtl.min.css\";i:342;s:19:\"post-date/style.css\";i:343;s:23:\"post-date/style.min.css\";i:344;s:27:\"post-excerpt/editor-rtl.css\";i:345;s:31:\"post-excerpt/editor-rtl.min.css\";i:346;s:23:\"post-excerpt/editor.css\";i:347;s:27:\"post-excerpt/editor.min.css\";i:348;s:26:\"post-excerpt/style-rtl.css\";i:349;s:30:\"post-excerpt/style-rtl.min.css\";i:350;s:22:\"post-excerpt/style.css\";i:351;s:26:\"post-excerpt/style.min.css\";i:352;s:34:\"post-featured-image/editor-rtl.css\";i:353;s:38:\"post-featured-image/editor-rtl.min.css\";i:354;s:30:\"post-featured-image/editor.css\";i:355;s:34:\"post-featured-image/editor.min.css\";i:356;s:33:\"post-featured-image/style-rtl.css\";i:357;s:37:\"post-featured-image/style-rtl.min.css\";i:358;s:29:\"post-featured-image/style.css\";i:359;s:33:\"post-featured-image/style.min.css\";i:360;s:34:\"post-navigation-link/style-rtl.css\";i:361;s:38:\"post-navigation-link/style-rtl.min.css\";i:362;s:30:\"post-navigation-link/style.css\";i:363;s:34:\"post-navigation-link/style.min.css\";i:364;s:27:\"post-template/style-rtl.css\";i:365;s:31:\"post-template/style-rtl.min.css\";i:366;s:23:\"post-template/style.css\";i:367;s:27:\"post-template/style.min.css\";i:368;s:24:\"post-terms/style-rtl.css\";i:369;s:28:\"post-terms/style-rtl.min.css\";i:370;s:20:\"post-terms/style.css\";i:371;s:24:\"post-terms/style.min.css\";i:372;s:31:\"post-time-to-read/style-rtl.css\";i:373;s:35:\"post-time-to-read/style-rtl.min.css\";i:374;s:27:\"post-time-to-read/style.css\";i:375;s:31:\"post-time-to-read/style.min.css\";i:376;s:24:\"post-title/style-rtl.css\";i:377;s:28:\"post-title/style-rtl.min.css\";i:378;s:20:\"post-title/style.css\";i:379;s:24:\"post-title/style.min.css\";i:380;s:26:\"preformatted/style-rtl.css\";i:381;s:30:\"preformatted/style-rtl.min.css\";i:382;s:22:\"preformatted/style.css\";i:383;s:26:\"preformatted/style.min.css\";i:384;s:24:\"pullquote/editor-rtl.css\";i:385;s:28:\"pullquote/editor-rtl.min.css\";i:386;s:20:\"pullquote/editor.css\";i:387;s:24:\"pullquote/editor.min.css\";i:388;s:23:\"pullquote/style-rtl.css\";i:389;s:27:\"pullquote/style-rtl.min.css\";i:390;s:19:\"pullquote/style.css\";i:391;s:23:\"pullquote/style.min.css\";i:392;s:23:\"pullquote/theme-rtl.css\";i:393;s:27:\"pullquote/theme-rtl.min.css\";i:394;s:19:\"pullquote/theme.css\";i:395;s:23:\"pullquote/theme.min.css\";i:396;s:39:\"query-pagination-numbers/editor-rtl.css\";i:397;s:43:\"query-pagination-numbers/editor-rtl.min.css\";i:398;s:35:\"query-pagination-numbers/editor.css\";i:399;s:39:\"query-pagination-numbers/editor.min.css\";i:400;s:31:\"query-pagination/editor-rtl.css\";i:401;s:35:\"query-pagination/editor-rtl.min.css\";i:402;s:27:\"query-pagination/editor.css\";i:403;s:31:\"query-pagination/editor.min.css\";i:404;s:30:\"query-pagination/style-rtl.css\";i:405;s:34:\"query-pagination/style-rtl.min.css\";i:406;s:26:\"query-pagination/style.css\";i:407;s:30:\"query-pagination/style.min.css\";i:408;s:25:\"query-title/style-rtl.css\";i:409;s:29:\"query-title/style-rtl.min.css\";i:410;s:21:\"query-title/style.css\";i:411;s:25:\"query-title/style.min.css\";i:412;s:25:\"query-total/style-rtl.css\";i:413;s:29:\"query-total/style-rtl.min.css\";i:414;s:21:\"query-total/style.css\";i:415;s:25:\"query-total/style.min.css\";i:416;s:20:\"query/editor-rtl.css\";i:417;s:24:\"query/editor-rtl.min.css\";i:418;s:16:\"query/editor.css\";i:419;s:20:\"query/editor.min.css\";i:420;s:19:\"quote/style-rtl.css\";i:421;s:23:\"quote/style-rtl.min.css\";i:422;s:15:\"quote/style.css\";i:423;s:19:\"quote/style.min.css\";i:424;s:19:\"quote/theme-rtl.css\";i:425;s:23:\"quote/theme-rtl.min.css\";i:426;s:15:\"quote/theme.css\";i:427;s:19:\"quote/theme.min.css\";i:428;s:23:\"read-more/style-rtl.css\";i:429;s:27:\"read-more/style-rtl.min.css\";i:430;s:19:\"read-more/style.css\";i:431;s:23:\"read-more/style.min.css\";i:432;s:18:\"rss/editor-rtl.css\";i:433;s:22:\"rss/editor-rtl.min.css\";i:434;s:14:\"rss/editor.css\";i:435;s:18:\"rss/editor.min.css\";i:436;s:17:\"rss/style-rtl.css\";i:437;s:21:\"rss/style-rtl.min.css\";i:438;s:13:\"rss/style.css\";i:439;s:17:\"rss/style.min.css\";i:440;s:21:\"search/editor-rtl.css\";i:441;s:25:\"search/editor-rtl.min.css\";i:442;s:17:\"search/editor.css\";i:443;s:21:\"search/editor.min.css\";i:444;s:20:\"search/style-rtl.css\";i:445;s:24:\"search/style-rtl.min.css\";i:446;s:16:\"search/style.css\";i:447;s:20:\"search/style.min.css\";i:448;s:20:\"search/theme-rtl.css\";i:449;s:24:\"search/theme-rtl.min.css\";i:450;s:16:\"search/theme.css\";i:451;s:20:\"search/theme.min.css\";i:452;s:24:\"separator/editor-rtl.css\";i:453;s:28:\"separator/editor-rtl.min.css\";i:454;s:20:\"separator/editor.css\";i:455;s:24:\"separator/editor.min.css\";i:456;s:23:\"separator/style-rtl.css\";i:457;s:27:\"separator/style-rtl.min.css\";i:458;s:19:\"separator/style.css\";i:459;s:23:\"separator/style.min.css\";i:460;s:23:\"separator/theme-rtl.css\";i:461;s:27:\"separator/theme-rtl.min.css\";i:462;s:19:\"separator/theme.css\";i:463;s:23:\"separator/theme.min.css\";i:464;s:24:\"shortcode/editor-rtl.css\";i:465;s:28:\"shortcode/editor-rtl.min.css\";i:466;s:20:\"shortcode/editor.css\";i:467;s:24:\"shortcode/editor.min.css\";i:468;s:24:\"site-logo/editor-rtl.css\";i:469;s:28:\"site-logo/editor-rtl.min.css\";i:470;s:20:\"site-logo/editor.css\";i:471;s:24:\"site-logo/editor.min.css\";i:472;s:23:\"site-logo/style-rtl.css\";i:473;s:27:\"site-logo/style-rtl.min.css\";i:474;s:19:\"site-logo/style.css\";i:475;s:23:\"site-logo/style.min.css\";i:476;s:27:\"site-tagline/editor-rtl.css\";i:477;s:31:\"site-tagline/editor-rtl.min.css\";i:478;s:23:\"site-tagline/editor.css\";i:479;s:27:\"site-tagline/editor.min.css\";i:480;s:26:\"site-tagline/style-rtl.css\";i:481;s:30:\"site-tagline/style-rtl.min.css\";i:482;s:22:\"site-tagline/style.css\";i:483;s:26:\"site-tagline/style.min.css\";i:484;s:25:\"site-title/editor-rtl.css\";i:485;s:29:\"site-title/editor-rtl.min.css\";i:486;s:21:\"site-title/editor.css\";i:487;s:25:\"site-title/editor.min.css\";i:488;s:24:\"site-title/style-rtl.css\";i:489;s:28:\"site-title/style-rtl.min.css\";i:490;s:20:\"site-title/style.css\";i:491;s:24:\"site-title/style.min.css\";i:492;s:26:\"social-link/editor-rtl.css\";i:493;s:30:\"social-link/editor-rtl.min.css\";i:494;s:22:\"social-link/editor.css\";i:495;s:26:\"social-link/editor.min.css\";i:496;s:27:\"social-links/editor-rtl.css\";i:497;s:31:\"social-links/editor-rtl.min.css\";i:498;s:23:\"social-links/editor.css\";i:499;s:27:\"social-links/editor.min.css\";i:500;s:26:\"social-links/style-rtl.css\";i:501;s:30:\"social-links/style-rtl.min.css\";i:502;s:22:\"social-links/style.css\";i:503;s:26:\"social-links/style.min.css\";i:504;s:21:\"spacer/editor-rtl.css\";i:505;s:25:\"spacer/editor-rtl.min.css\";i:506;s:17:\"spacer/editor.css\";i:507;s:21:\"spacer/editor.min.css\";i:508;s:20:\"spacer/style-rtl.css\";i:509;s:24:\"spacer/style-rtl.min.css\";i:510;s:16:\"spacer/style.css\";i:511;s:20:\"spacer/style.min.css\";i:512;s:20:\"table/editor-rtl.css\";i:513;s:24:\"table/editor-rtl.min.css\";i:514;s:16:\"table/editor.css\";i:515;s:20:\"table/editor.min.css\";i:516;s:19:\"table/style-rtl.css\";i:517;s:23:\"table/style-rtl.min.css\";i:518;s:15:\"table/style.css\";i:519;s:19:\"table/style.min.css\";i:520;s:19:\"table/theme-rtl.css\";i:521;s:23:\"table/theme-rtl.min.css\";i:522;s:15:\"table/theme.css\";i:523;s:19:\"table/theme.min.css\";i:524;s:24:\"tag-cloud/editor-rtl.css\";i:525;s:28:\"tag-cloud/editor-rtl.min.css\";i:526;s:20:\"tag-cloud/editor.css\";i:527;s:24:\"tag-cloud/editor.min.css\";i:528;s:23:\"tag-cloud/style-rtl.css\";i:529;s:27:\"tag-cloud/style-rtl.min.css\";i:530;s:19:\"tag-cloud/style.css\";i:531;s:23:\"tag-cloud/style.min.css\";i:532;s:28:\"template-part/editor-rtl.css\";i:533;s:32:\"template-part/editor-rtl.min.css\";i:534;s:24:\"template-part/editor.css\";i:535;s:28:\"template-part/editor.min.css\";i:536;s:27:\"template-part/theme-rtl.css\";i:537;s:31:\"template-part/theme-rtl.min.css\";i:538;s:23:\"template-part/theme.css\";i:539;s:27:\"template-part/theme.min.css\";i:540;s:24:\"term-count/style-rtl.css\";i:541;s:28:\"term-count/style-rtl.min.css\";i:542;s:20:\"term-count/style.css\";i:543;s:24:\"term-count/style.min.css\";i:544;s:30:\"term-description/style-rtl.css\";i:545;s:34:\"term-description/style-rtl.min.css\";i:546;s:26:\"term-description/style.css\";i:547;s:30:\"term-description/style.min.css\";i:548;s:23:\"term-name/style-rtl.css\";i:549;s:27:\"term-name/style-rtl.min.css\";i:550;s:19:\"term-name/style.css\";i:551;s:23:\"term-name/style.min.css\";i:552;s:28:\"term-template/editor-rtl.css\";i:553;s:32:\"term-template/editor-rtl.min.css\";i:554;s:24:\"term-template/editor.css\";i:555;s:28:\"term-template/editor.min.css\";i:556;s:27:\"term-template/style-rtl.css\";i:557;s:31:\"term-template/style-rtl.min.css\";i:558;s:23:\"term-template/style.css\";i:559;s:27:\"term-template/style.min.css\";i:560;s:27:\"text-columns/editor-rtl.css\";i:561;s:31:\"text-columns/editor-rtl.min.css\";i:562;s:23:\"text-columns/editor.css\";i:563;s:27:\"text-columns/editor.min.css\";i:564;s:26:\"text-columns/style-rtl.css\";i:565;s:30:\"text-columns/style-rtl.min.css\";i:566;s:22:\"text-columns/style.css\";i:567;s:26:\"text-columns/style.min.css\";i:568;s:19:\"verse/style-rtl.css\";i:569;s:23:\"verse/style-rtl.min.css\";i:570;s:15:\"verse/style.css\";i:571;s:19:\"verse/style.min.css\";i:572;s:20:\"video/editor-rtl.css\";i:573;s:24:\"video/editor-rtl.min.css\";i:574;s:16:\"video/editor.css\";i:575;s:20:\"video/editor.min.css\";i:576;s:19:\"video/style-rtl.css\";i:577;s:23:\"video/style-rtl.min.css\";i:578;s:15:\"video/style.css\";i:579;s:19:\"video/style.min.css\";i:580;s:19:\"video/theme-rtl.css\";i:581;s:23:\"video/theme-rtl.min.css\";i:582;s:15:\"video/theme.css\";i:583;s:19:\"video/theme.min.css\";}}','on'),(126,'recovery_keys','a:0:{}','off'),(127,'theme_mods_twentytwentyfive','a:2:{s:18:\"custom_css_post_id\";i:-1;s:16:\"sidebars_widgets\";a:2:{s:4:\"time\";i:1774322185;s:4:\"data\";a:3:{s:19:\"wp_inactive_widgets\";a:0:{}s:9:\"sidebar-1\";a:3:{i:0;s:7:\"block-2\";i:1;s:7:\"block-3\";i:2;s:7:\"block-4\";}s:9:\"sidebar-2\";a:2:{i:0;s:7:\"block-5\";i:1;s:7:\"block-6\";}}}}','off'),(128,'_transient_wp_styles_for_blocks','a:2:{s:4:\"hash\";s:32:\"31064ef4a85fee2d0cdb1ccd773b2c93\";s:6:\"blocks\";a:7:{s:11:\"core/button\";s:0:\"\";s:14:\"core/site-logo\";s:0:\"\";s:18:\"core/post-template\";s:0:\"\";s:18:\"core/term-template\";s:0:\"\";s:12:\"core/columns\";s:0:\"\";s:14:\"core/pullquote\";s:69:\":root :where(.wp-block-pullquote){font-size: 1.5em;line-height: 1.6;}\";s:10:\"core/group\";s:70:\":root :where(.wp-block-group){padding-right: 24px;padding-left: 24px;}\";}}','on'),(131,'current_theme','BT Education Ministry','auto'),(132,'theme_mods_bt-education-ministry','a:3:{s:19:\"wp_classic_sidebars\";a:0:{}s:18:\"nav_menu_locations\";a:1:{s:7:\"primary\";i:2;}s:18:\"custom_css_post_id\";i:-1;}','on'),(133,'theme_switched','','auto'),(136,'action_scheduler_hybrid_store_demarkation','25','auto'),(137,'schema-ActionScheduler_StoreSchema','8.0.1774322199','auto'),(138,'schema-ActionScheduler_LoggerSchema','3.0.1774322196','auto'),(139,'_transient_timeout_as-post-store-dependencies-met','1774408596','off'),(140,'_transient_as-post-store-dependencies-met','yes','off'),(141,'pmpro_wizard_redirect','1','auto'),(142,'pmpro_gateway_environment','sandbox','auto'),(143,'pmpro_currency','USD','auto'),(145,'pmpro_from_email','wordpress@educationministry.org','auto'),(146,'pmpro_from_name','WordPress','auto'),(147,'pmpro_email_admin_checkout','1','auto'),(148,'pmpro_email_admin_changes','1','auto'),(149,'pmpro_email_admin_cancels','1','auto'),(150,'pmpro_email_admin_billing','1','auto'),(151,'pmpro_tospage','','auto'),(152,'pmpro_dismissed_wp_pointers','a:1:{i:0;s:19:\"pmpro_v2_menu_moved\";}','auto'),(153,'pmpro_nag_paused','1774926996','off'),(154,'pmpro_wisdom_opt_out','0','auto'),(155,'pmpro_db_version','3.53','off'),(156,'pmpro_filterqueries','1','auto'),(157,'pmpro_last_known_url','b64:aHR0cHM6Ly9lZHVjYXRpb25taW5pc3RyeS5vcmc=','auto'),(158,'pmpro_restricted_files_random_string','68d6b5b73a','auto'),(160,'widget_pmpro-member-login','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(161,'wpforms_version','1.10.0.1','auto'),(162,'wpforms_version_lite','1.10.0.1','auto'),(163,'wpforms_activated','a:1:{s:4:\"lite\";i:1774322198;}','auto'),(164,'_transient_timeout_wpforms_just_activated','1774322258','off'),(165,'_transient_wpforms_just_activated','lite','off'),(166,'_transient_timeout_wpforms_activation_redirect','1774322228','off'),(167,'_transient_wpforms_activation_redirect','1','off'),(168,'pmpro_library_conflicts','a:1:{s:16:\"action-scheduler\";a:1:{s:99:\"/var/www/educationministry.org/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/\";a:2:{s:7:\"version\";s:5:\"3.9.3\";s:9:\"timestamp\";s:19:\"2026-03-25 00:38:02\";}}}','off'),(169,'wpforms_versions_lite','a:16:{s:8:\"1.10.0.1\";i:1774322199;s:5:\"1.5.9\";i:0;s:7:\"1.6.7.2\";i:0;s:5:\"1.6.8\";i:0;s:5:\"1.7.5\";i:0;s:7:\"1.7.5.1\";i:0;s:5:\"1.7.7\";i:0;s:5:\"1.8.2\";i:0;s:5:\"1.8.3\";i:0;s:5:\"1.8.4\";i:0;s:5:\"1.8.6\";i:0;s:5:\"1.8.7\";i:0;s:5:\"1.9.1\";i:0;s:5:\"1.9.2\";i:0;s:5:\"1.9.7\";i:0;s:7:\"1.9.8.6\";i:0;}','auto'),(170,'wpforms_constant_contact_version','3','auto'),(171,'widget_wpforms-widget','a:1:{s:12:\"_multiwidget\";i:1;}','auto'),(172,'wpforms_settings','a:3:{s:13:\"modern-markup\";s:1:\"1\";s:20:\"modern-markup-is-set\";b:1;s:26:\"modern-markup-hide-setting\";b:1;}','auto'),(174,'stellar_schema_version_viewport_hashes','1.0.5','auto'),(175,'stellar_schema_version_optimizer','2.0.5','auto'),(176,'kadence_blocks_schema_version','1','auto'),(177,'stellarwp_telemetry_last_send','','auto'),(178,'stellarwp_telemetry','a:1:{s:7:\"plugins\";a:1:{s:14:\"kadence-blocks\";a:2:{s:7:\"wp_slug\";s:33:\"kadence-blocks/kadence-blocks.php\";s:5:\"optin\";b:0;}}}','auto'),(179,'stellarwp_telemetry_kadence-blocks_show_optin','1','auto'),(181,'action_scheduler_migration_status','complete','auto'),(182,'as_has_wp_comment_logs','no','on'),(183,'pmpro_visits','a:9:{s:5:\"today\";i:39;s:8:\"thisdate\";s:10:\"2026-24-03\";s:4:\"week\";i:39;s:8:\"thisweek\";s:2:\"13\";s:5:\"month\";i:39;s:9:\"thismonth\";s:1:\"3\";s:3:\"ytd\";i:39;s:8:\"thisyear\";s:4:\"2026\";s:7:\"alltime\";i:39;}','auto'),(185,'wpforms_process_forms_locator_status','completed','auto'),(190,'pmpro_views','a:9:{s:5:\"today\";i:7;s:8:\"thisdate\";s:10:\"2026-25-03\";s:4:\"week\";i:31;s:8:\"thisweek\";s:2:\"13\";s:5:\"month\";i:31;s:9:\"thismonth\";s:1:\"3\";s:3:\"ytd\";i:31;s:8:\"thisyear\";s:4:\"2026\";s:7:\"alltime\";i:31;}','auto'),(195,'_site_transient_update_core','O:8:\"stdClass\":4:{s:7:\"updates\";a:1:{i:0;O:8:\"stdClass\":10:{s:8:\"response\";s:6:\"latest\";s:8:\"download\";s:59:\"https://downloads.wordpress.org/release/wordpress-6.9.4.zip\";s:6:\"locale\";s:5:\"en_US\";s:8:\"packages\";O:8:\"stdClass\":5:{s:4:\"full\";s:59:\"https://downloads.wordpress.org/release/wordpress-6.9.4.zip\";s:10:\"no_content\";s:70:\"https://downloads.wordpress.org/release/wordpress-6.9.4-no-content.zip\";s:11:\"new_bundled\";s:71:\"https://downloads.wordpress.org/release/wordpress-6.9.4-new-bundled.zip\";s:7:\"partial\";s:0:\"\";s:8:\"rollback\";s:0:\"\";}s:7:\"current\";s:5:\"6.9.4\";s:7:\"version\";s:5:\"6.9.4\";s:11:\"php_version\";s:6:\"7.2.24\";s:13:\"mysql_version\";s:5:\"5.5.5\";s:11:\"new_bundled\";s:3:\"6.7\";s:15:\"partial_version\";s:0:\"\";}}s:12:\"last_checked\";i:1774369626;s:15:\"version_checked\";s:5:\"6.9.4\";s:12:\"translations\";a:0:{}}','off'),(197,'_site_transient_update_plugins','O:8:\"stdClass\":5:{s:12:\"last_checked\";i:1774369626;s:8:\"response\";a:0:{}s:12:\"translations\";a:0:{}s:9:\"no_update\";a:4:{s:33:\"kadence-blocks/kadence-blocks.php\";O:8:\"stdClass\":10:{s:2:\"id\";s:28:\"w.org/plugins/kadence-blocks\";s:4:\"slug\";s:14:\"kadence-blocks\";s:6:\"plugin\";s:33:\"kadence-blocks/kadence-blocks.php\";s:11:\"new_version\";s:5:\"3.6.6\";s:3:\"url\";s:45:\"https://wordpress.org/plugins/kadence-blocks/\";s:7:\"package\";s:63:\"https://downloads.wordpress.org/plugin/kadence-blocks.3.6.6.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:67:\"https://ps.w.org/kadence-blocks/assets/icon-256x256.png?rev=3178382\";s:2:\"1x\";s:67:\"https://ps.w.org/kadence-blocks/assets/icon-128x128.png?rev=3178382\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:70:\"https://ps.w.org/kadence-blocks/assets/banner-1544x500.jpg?rev=3178382\";s:2:\"1x\";s:69:\"https://ps.w.org/kadence-blocks/assets/banner-772x250.jpg?rev=3178382\";}s:11:\"banners_rtl\";a:0:{}s:8:\"requires\";s:3:\"6.6\";}s:24:\"wpforms-lite/wpforms.php\";O:8:\"stdClass\":10:{s:2:\"id\";s:26:\"w.org/plugins/wpforms-lite\";s:4:\"slug\";s:12:\"wpforms-lite\";s:6:\"plugin\";s:24:\"wpforms-lite/wpforms.php\";s:11:\"new_version\";s:8:\"1.10.0.1\";s:3:\"url\";s:43:\"https://wordpress.org/plugins/wpforms-lite/\";s:7:\"package\";s:64:\"https://downloads.wordpress.org/plugin/wpforms-lite.1.10.0.1.zip\";s:5:\"icons\";a:2:{s:2:\"1x\";s:57:\"https://ps.w.org/wpforms-lite/assets/icon.svg?rev=3254748\";s:3:\"svg\";s:57:\"https://ps.w.org/wpforms-lite/assets/icon.svg?rev=3254748\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:68:\"https://ps.w.org/wpforms-lite/assets/banner-1544x500.png?rev=3091364\";s:2:\"1x\";s:67:\"https://ps.w.org/wpforms-lite/assets/banner-772x250.png?rev=3091364\";}s:11:\"banners_rtl\";a:2:{s:2:\"2x\";s:72:\"https://ps.w.org/wpforms-lite/assets/banner-1544x500-rtl.png?rev=3254748\";s:2:\"1x\";s:71:\"https://ps.w.org/wpforms-lite/assets/banner-772x250-rtl.png?rev=3254748\";}s:8:\"requires\";s:3:\"5.5\";}s:29:\"wp-mail-smtp/wp_mail_smtp.php\";O:8:\"stdClass\":10:{s:2:\"id\";s:26:\"w.org/plugins/wp-mail-smtp\";s:4:\"slug\";s:12:\"wp-mail-smtp\";s:6:\"plugin\";s:29:\"wp-mail-smtp/wp_mail_smtp.php\";s:11:\"new_version\";s:5:\"4.7.1\";s:3:\"url\";s:43:\"https://wordpress.org/plugins/wp-mail-smtp/\";s:7:\"package\";s:61:\"https://downloads.wordpress.org/plugin/wp-mail-smtp.4.7.1.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:65:\"https://ps.w.org/wp-mail-smtp/assets/icon-256x256.png?rev=1755440\";s:2:\"1x\";s:65:\"https://ps.w.org/wp-mail-smtp/assets/icon-128x128.png?rev=1755440\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:68:\"https://ps.w.org/wp-mail-smtp/assets/banner-1544x500.png?rev=3206423\";s:2:\"1x\";s:67:\"https://ps.w.org/wp-mail-smtp/assets/banner-772x250.png?rev=3206423\";}s:11:\"banners_rtl\";a:0:{}s:8:\"requires\";s:3:\"5.5\";}s:27:\"wp-super-cache/wp-cache.php\";O:8:\"stdClass\":10:{s:2:\"id\";s:28:\"w.org/plugins/wp-super-cache\";s:4:\"slug\";s:14:\"wp-super-cache\";s:6:\"plugin\";s:27:\"wp-super-cache/wp-cache.php\";s:11:\"new_version\";s:5:\"3.0.3\";s:3:\"url\";s:45:\"https://wordpress.org/plugins/wp-super-cache/\";s:7:\"package\";s:63:\"https://downloads.wordpress.org/plugin/wp-super-cache.3.0.3.zip\";s:5:\"icons\";a:2:{s:2:\"2x\";s:67:\"https://ps.w.org/wp-super-cache/assets/icon-256x256.png?rev=1095422\";s:2:\"1x\";s:67:\"https://ps.w.org/wp-super-cache/assets/icon-128x128.png?rev=1095422\";}s:7:\"banners\";a:2:{s:2:\"2x\";s:70:\"https://ps.w.org/wp-super-cache/assets/banner-1544x500.png?rev=1082414\";s:2:\"1x\";s:69:\"https://ps.w.org/wp-super-cache/assets/banner-772x250.png?rev=1082414\";}s:11:\"banners_rtl\";a:0:{}s:8:\"requires\";s:3:\"6.7\";}}s:7:\"checked\";a:5:{s:33:\"kadence-blocks/kadence-blocks.php\";s:5:\"3.6.6\";s:45:\"paid-memberships-pro/paid-memberships-pro.php\";s:5:\"3.6.6\";s:24:\"wpforms-lite/wpforms.php\";s:8:\"1.10.0.1\";s:29:\"wp-mail-smtp/wp_mail_smtp.php\";s:5:\"4.7.1\";s:27:\"wp-super-cache/wp-cache.php\";s:5:\"3.0.3\";}}','off'),(200,'_site_transient_update_themes','O:8:\"stdClass\":5:{s:12:\"last_checked\";i:1774369627;s:7:\"checked\";a:2:{s:21:\"bt-education-ministry\";s:5:\"1.0.0\";s:16:\"twentytwentyfive\";s:3:\"1.4\";}s:8:\"response\";a:0:{}s:9:\"no_update\";a:1:{s:16:\"twentytwentyfive\";a:6:{s:5:\"theme\";s:16:\"twentytwentyfive\";s:11:\"new_version\";s:3:\"1.4\";s:3:\"url\";s:46:\"https://wordpress.org/themes/twentytwentyfive/\";s:7:\"package\";s:62:\"https://downloads.wordpress.org/theme/twentytwentyfive.1.4.zip\";s:8:\"requires\";s:3:\"6.7\";s:12:\"requires_php\";s:3:\"7.2\";}}s:12:\"translations\";a:0:{}}','off'),(212,'_transient_timeout_pmpro_spam_activity_5.194.148.173','1774340069','off'),(213,'_transient_pmpro_spam_activity_5.194.148.173','a:1:{i:0;i:1774339169;}','off'),(215,'_transient_timeout_pmpro_spam_activity_49.43.90.45','1774340546','off'),(216,'_transient_pmpro_spam_activity_49.43.90.45','a:1:{i:0;i:1774339646;}','off'),(230,'_transient_timeout_pmpro_spam_activity_34.73.234.248','1774352761','off'),(231,'_transient_pmpro_spam_activity_34.73.234.248','a:10:{i:0;i:1774351861;i:1;i:1774351861;i:2;i:1774351861;i:3;i:1774351860;i:4;i:1774351860;i:5;i:1774351860;i:6;i:1774351860;i:7;i:1774351859;i:8;i:1774351859;i:9;i:1774351859;}','off'),(239,'_transient_timeout_pmpro_spam_activity_8.229.77.16','1774356671','off'),(240,'_transient_pmpro_spam_activity_8.229.77.16','a:10:{i:0;i:1774355771;i:1;i:1774355771;i:2;i:1774355771;i:3;i:1774355771;i:4;i:1774355770;i:5;i:1774355770;i:6;i:1774355769;i:7;i:1774355769;i:8;i:1774355769;i:9;i:1774355769;}','off'),(245,'_transient_timeout_pmpro_spam_activity_152.42.162.234','1774363007','off'),(246,'_transient_pmpro_spam_activity_152.42.162.234','a:10:{i:0;i:1774362107;i:1;i:1774362107;i:2;i:1774362107;i:3;i:1774362106;i:4;i:1774362106;i:5;i:1774362105;i:6;i:1774362105;i:7;i:1774362105;i:8;i:1774362104;i:9;i:1774362104;}','off'),(260,'action_scheduler_lock_async-request-runner','69c2ab88b6a6e7.31080214|1774365636','no'),(261,'wisdom_notification_times','a:1:{s:20:\"paid-memberships-pro\";i:1774365576;}','auto'),(262,'kadenceblocks_data_settings','a:4:{s:10:\"db_version\";i:0;s:15:\"version_history\";a:1:{i:0;s:3:\"new\";}s:13:\"prior_version\";s:3:\"new\";s:15:\"current_version\";s:5:\"3.6.6\";}','auto'),(268,'finished_updating_comment_type','1','auto'),(277,'_site_transient_timeout_theme_roots','1774374287','off'),(278,'_site_transient_theme_roots','a:2:{s:21:\"bt-education-ministry\";s:7:\"/themes\";s:16:\"twentytwentyfive\";s:7:\"/themes\";}','off'),(280,'_transient_timeout_pmpro_spam_activity_34.44.236.237','1774373875','off'),(281,'_transient_pmpro_spam_activity_34.44.236.237','a:10:{i:0;i:1774372975;i:1;i:1774372975;i:2;i:1774372975;i:3;i:1774372975;i:4;i:1774372974;i:5;i:1774372974;i:6;i:1774372973;i:7;i:1774372973;i:8;i:1774372973;i:9;i:1774372972;}','off'),(283,'_transient_timeout_pmpro_spam_activity_104.197.17.246','1774374046','off'),(284,'_transient_pmpro_spam_activity_104.197.17.246','a:10:{i:0;i:1774373146;i:1;i:1774373146;i:2;i:1774373145;i:3;i:1774373145;i:4;i:1774373145;i:5;i:1774373145;i:6;i:1774373145;i:7;i:1774373144;i:8;i:1774373144;i:9;i:1774373144;}','off'),(300,'_transient_timeout_pmpro_spam_activity_137.184.103.212','1774391714','off'),(302,'_transient_pmpro_spam_activity_137.184.103.212','a:1:{i:0;i:1774390814;}','off'),(310,'_site_transient_timeout_wp_theme_files_patterns-9a054fb94683da60bd737540e29a1583','1774400159','off'),(311,'_site_transient_wp_theme_files_patterns-9a054fb94683da60bd737540e29a1583','a:2:{s:7:\"version\";s:5:\"1.0.0\";s:8:\"patterns\";a:0:{}}','off');
/*!40000 ALTER TABLE `wp_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_discount_codes`
--

DROP TABLE IF EXISTS `wp_pmpro_discount_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_discount_codes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(32) NOT NULL,
  `starts` date NOT NULL,
  `expires` date NOT NULL,
  `uses` int(11) NOT NULL,
  `one_use_per_user` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `starts` (`starts`),
  KEY `expires` (`expires`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_discount_codes`
--

LOCK TABLES `wp_pmpro_discount_codes` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_discount_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_discount_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_discount_codes_levels`
--

DROP TABLE IF EXISTS `wp_pmpro_discount_codes_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_discount_codes_levels` (
  `code_id` bigint(20) unsigned NOT NULL,
  `level_id` int(11) unsigned NOT NULL,
  `initial_payment` decimal(18,8) NOT NULL DEFAULT 0.00000000,
  `billing_amount` decimal(18,8) NOT NULL DEFAULT 0.00000000,
  `cycle_number` int(11) NOT NULL DEFAULT 0,
  `cycle_period` varchar(10) DEFAULT 'Month',
  `billing_limit` int(11) NOT NULL COMMENT 'After how many cycles should billing stop?',
  `trial_amount` decimal(18,8) NOT NULL DEFAULT 0.00000000,
  `trial_limit` int(11) NOT NULL DEFAULT 0,
  `expiration_number` int(10) unsigned NOT NULL,
  `expiration_period` varchar(10) NOT NULL,
  PRIMARY KEY (`code_id`,`level_id`),
  KEY `initial_payment` (`initial_payment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_discount_codes_levels`
--

LOCK TABLES `wp_pmpro_discount_codes_levels` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_discount_codes_levels` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_discount_codes_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_discount_codes_uses`
--

DROP TABLE IF EXISTS `wp_pmpro_discount_codes_uses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_discount_codes_uses` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `order_id` bigint(20) unsigned NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_discount_codes_uses`
--

LOCK TABLES `wp_pmpro_discount_codes_uses` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_discount_codes_uses` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_discount_codes_uses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_groups`
--

DROP TABLE IF EXISTS `wp_pmpro_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `allow_multiple_selections` tinyint(4) NOT NULL DEFAULT 1,
  `displayorder` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_groups`
--

LOCK TABLES `wp_pmpro_groups` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_membership_levelmeta`
--

DROP TABLE IF EXISTS `wp_pmpro_membership_levelmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_membership_levelmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pmpro_membership_level_id` int(11) unsigned NOT NULL,
  `meta_key` varchar(255) NOT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`meta_id`),
  KEY `pmpro_membership_level_id` (`pmpro_membership_level_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_membership_levelmeta`
--

LOCK TABLES `wp_pmpro_membership_levelmeta` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_membership_levelmeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_membership_levelmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_membership_levels`
--

DROP TABLE IF EXISTS `wp_pmpro_membership_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_membership_levels` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `confirmation` longtext NOT NULL,
  `initial_payment` decimal(18,8) NOT NULL DEFAULT 0.00000000,
  `billing_amount` decimal(18,8) NOT NULL DEFAULT 0.00000000,
  `cycle_number` int(11) NOT NULL DEFAULT 0,
  `cycle_period` varchar(10) DEFAULT 'Month',
  `billing_limit` int(11) NOT NULL COMMENT 'After how many cycles should billing stop?',
  `trial_amount` decimal(18,8) NOT NULL DEFAULT 0.00000000,
  `trial_limit` int(11) NOT NULL DEFAULT 0,
  `allow_signups` tinyint(4) NOT NULL DEFAULT 1,
  `expiration_number` int(10) unsigned NOT NULL,
  `expiration_period` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `allow_signups` (`allow_signups`),
  KEY `initial_payment` (`initial_payment`),
  KEY `name` (`name`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_membership_levels`
--

LOCK TABLES `wp_pmpro_membership_levels` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_membership_levels` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_membership_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_membership_levels_groups`
--

DROP TABLE IF EXISTS `wp_pmpro_membership_levels_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_membership_levels_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `level` int(10) unsigned NOT NULL DEFAULT 0,
  `group` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `level` (`level`),
  KEY `group` (`group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_membership_levels_groups`
--

LOCK TABLES `wp_pmpro_membership_levels_groups` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_membership_levels_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_membership_levels_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_membership_ordermeta`
--

DROP TABLE IF EXISTS `wp_pmpro_membership_ordermeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_membership_ordermeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pmpro_membership_order_id` bigint(20) unsigned NOT NULL,
  `meta_key` varchar(255) NOT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`meta_id`),
  KEY `pmpro_membership_order_id` (`pmpro_membership_order_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_membership_ordermeta`
--

LOCK TABLES `wp_pmpro_membership_ordermeta` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_membership_ordermeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_membership_ordermeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_membership_orders`
--

DROP TABLE IF EXISTS `wp_pmpro_membership_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_membership_orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(32) NOT NULL,
  `session_id` varchar(64) NOT NULL DEFAULT '',
  `user_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `membership_id` int(11) unsigned NOT NULL DEFAULT 0,
  `paypal_token` varchar(64) NOT NULL DEFAULT '',
  `billing_name` varchar(128) NOT NULL DEFAULT '',
  `billing_street` varchar(128) NOT NULL DEFAULT '',
  `billing_street2` varchar(128) NOT NULL DEFAULT '',
  `billing_city` varchar(128) NOT NULL DEFAULT '',
  `billing_state` varchar(32) NOT NULL DEFAULT '',
  `billing_zip` varchar(16) NOT NULL DEFAULT '',
  `billing_country` varchar(128) NOT NULL,
  `billing_phone` varchar(32) NOT NULL,
  `subtotal` varchar(16) NOT NULL DEFAULT '',
  `tax` varchar(16) NOT NULL DEFAULT '',
  `checkout_id` bigint(20) NOT NULL DEFAULT 0,
  `total` varchar(16) NOT NULL DEFAULT '',
  `payment_type` varchar(64) NOT NULL DEFAULT '',
  `cardtype` varchar(32) NOT NULL DEFAULT '',
  `accountnumber` varchar(32) NOT NULL DEFAULT '',
  `expirationmonth` char(2) NOT NULL DEFAULT '',
  `expirationyear` varchar(4) NOT NULL DEFAULT '',
  `status` varchar(32) NOT NULL DEFAULT '',
  `gateway` varchar(64) NOT NULL,
  `gateway_environment` varchar(64) NOT NULL,
  `payment_transaction_id` varchar(64) NOT NULL,
  `subscription_transaction_id` varchar(64) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `affiliate_id` varchar(32) NOT NULL,
  `affiliate_subid` varchar(32) NOT NULL,
  `notes` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `session_id` (`session_id`),
  KEY `user_id` (`user_id`),
  KEY `membership_id` (`membership_id`),
  KEY `status` (`status`),
  KEY `timestamp` (`timestamp`),
  KEY `gateway` (`gateway`),
  KEY `gateway_environment` (`gateway_environment`),
  KEY `payment_transaction_id` (`payment_transaction_id`),
  KEY `subscription_transaction_id` (`subscription_transaction_id`),
  KEY `affiliate_id` (`affiliate_id`),
  KEY `affiliate_subid` (`affiliate_subid`),
  KEY `checkout_id` (`checkout_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_membership_orders`
--

LOCK TABLES `wp_pmpro_membership_orders` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_membership_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_membership_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_memberships_categories`
--

DROP TABLE IF EXISTS `wp_pmpro_memberships_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_memberships_categories` (
  `membership_id` int(11) unsigned NOT NULL,
  `category_id` bigint(20) unsigned NOT NULL,
  `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`membership_id`,`category_id`),
  UNIQUE KEY `category_membership` (`category_id`,`membership_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_memberships_categories`
--

LOCK TABLES `wp_pmpro_memberships_categories` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_memberships_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_memberships_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_memberships_pages`
--

DROP TABLE IF EXISTS `wp_pmpro_memberships_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_memberships_pages` (
  `membership_id` int(11) unsigned NOT NULL,
  `page_id` bigint(20) unsigned NOT NULL,
  `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`page_id`,`membership_id`),
  UNIQUE KEY `membership_page` (`membership_id`,`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_memberships_pages`
--

LOCK TABLES `wp_pmpro_memberships_pages` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_memberships_pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_memberships_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_memberships_users`
--

DROP TABLE IF EXISTS `wp_pmpro_memberships_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_memberships_users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `membership_id` int(11) unsigned NOT NULL,
  `code_id` bigint(20) unsigned NOT NULL,
  `initial_payment` decimal(18,8) NOT NULL,
  `billing_amount` decimal(18,8) NOT NULL,
  `cycle_number` int(11) NOT NULL,
  `cycle_period` varchar(10) NOT NULL DEFAULT 'Month',
  `billing_limit` int(11) NOT NULL,
  `trial_amount` decimal(18,8) NOT NULL,
  `trial_limit` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `startdate` datetime NOT NULL,
  `enddate` datetime DEFAULT NULL,
  `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `membership_id` (`membership_id`),
  KEY `modified` (`modified`),
  KEY `code_id` (`code_id`),
  KEY `enddate` (`enddate`),
  KEY `user_id` (`user_id`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_memberships_users`
--

LOCK TABLES `wp_pmpro_memberships_users` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_memberships_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_memberships_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_subscriptionmeta`
--

DROP TABLE IF EXISTS `wp_pmpro_subscriptionmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_subscriptionmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pmpro_subscription_id` bigint(20) unsigned NOT NULL,
  `meta_key` varchar(255) NOT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`meta_id`),
  KEY `pmpro_subscription_id` (`pmpro_subscription_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_subscriptionmeta`
--

LOCK TABLES `wp_pmpro_subscriptionmeta` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_subscriptionmeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_subscriptionmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_pmpro_subscriptions`
--

DROP TABLE IF EXISTS `wp_pmpro_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_pmpro_subscriptions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `membership_level_id` int(11) unsigned NOT NULL,
  `gateway` varchar(64) NOT NULL,
  `gateway_environment` varchar(64) NOT NULL,
  `subscription_transaction_id` varchar(64) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `startdate` datetime DEFAULT NULL,
  `enddate` datetime DEFAULT NULL,
  `next_payment_date` datetime DEFAULT NULL,
  `billing_amount` decimal(18,8) NOT NULL DEFAULT 0.00000000,
  `cycle_number` int(11) NOT NULL DEFAULT 0,
  `cycle_period` varchar(10) NOT NULL DEFAULT 'Month',
  `billing_limit` int(11) NOT NULL DEFAULT 0,
  `trial_amount` decimal(18,8) NOT NULL DEFAULT 0.00000000,
  `trial_limit` int(11) NOT NULL DEFAULT 0,
  `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `subscription_link` (`subscription_transaction_id`,`gateway_environment`,`gateway`),
  KEY `user_id` (`user_id`),
  KEY `next_payment_date` (`next_payment_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_pmpro_subscriptions`
--

LOCK TABLES `wp_pmpro_subscriptions` WRITE;
/*!40000 ALTER TABLE `wp_pmpro_subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_pmpro_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_postmeta`
--

DROP TABLE IF EXISTS `wp_postmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_postmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`meta_id`),
  KEY `post_id` (`post_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_postmeta`
--

LOCK TABLES `wp_postmeta` WRITE;
/*!40000 ALTER TABLE `wp_postmeta` DISABLE KEYS */;
INSERT INTO `wp_postmeta` VALUES (1,2,'_wp_page_template','default'),(2,3,'_wp_page_template','default'),(3,18,'_wp_page_template','template-btpma-dashboard.php'),(4,19,'_wp_page_template','template-btpma-trust-services.php'),(5,20,'_wp_page_template','template-btpma-active-projects.php'),(6,21,'_wp_page_template','template-btpma-document-vault.php'),(7,22,'_wp_page_template','template-btpma-governance-center.php'),(8,23,'_wp_page_template','template-btpma-head-steward-ai.php'),(9,24,'_wp_page_template','template-btpma-account-settings.php'),(10,25,'_menu_item_type','post_type'),(11,25,'_menu_item_menu_item_parent','0'),(12,25,'_menu_item_object_id','5'),(13,25,'_menu_item_object','page'),(14,25,'_menu_item_target',''),(15,25,'_menu_item_classes','a:1:{i:0;s:0:\"\";}'),(16,25,'_menu_item_xfn',''),(17,25,'_menu_item_url',''),(18,26,'_menu_item_type','post_type'),(19,26,'_menu_item_menu_item_parent','0'),(20,26,'_menu_item_object_id','6'),(21,26,'_menu_item_object','page'),(22,26,'_menu_item_target',''),(23,26,'_menu_item_classes','a:1:{i:0;s:0:\"\";}'),(24,26,'_menu_item_xfn',''),(25,26,'_menu_item_url',''),(26,27,'_menu_item_type','post_type'),(27,27,'_menu_item_menu_item_parent','0'),(28,27,'_menu_item_object_id','7'),(29,27,'_menu_item_object','page'),(30,27,'_menu_item_target',''),(31,27,'_menu_item_classes','a:1:{i:0;s:0:\"\";}'),(32,27,'_menu_item_xfn',''),(33,27,'_menu_item_url',''),(34,28,'_menu_item_type','post_type'),(35,28,'_menu_item_menu_item_parent','0'),(36,28,'_menu_item_object_id','8'),(37,28,'_menu_item_object','page'),(38,28,'_menu_item_target',''),(39,28,'_menu_item_classes','a:1:{i:0;s:0:\"\";}'),(40,28,'_menu_item_xfn',''),(41,28,'_menu_item_url',''),(42,29,'_menu_item_type','post_type'),(43,29,'_menu_item_menu_item_parent','0'),(44,29,'_menu_item_object_id','9'),(45,29,'_menu_item_object','page'),(46,29,'_menu_item_target',''),(47,29,'_menu_item_classes','a:1:{i:0;s:0:\"\";}'),(48,29,'_menu_item_xfn',''),(49,29,'_menu_item_url',''),(50,30,'_menu_item_type','post_type'),(51,30,'_menu_item_menu_item_parent','0'),(52,30,'_menu_item_object_id','10'),(53,30,'_menu_item_object','page'),(54,30,'_menu_item_target',''),(55,30,'_menu_item_classes','a:1:{i:0;s:0:\"\";}'),(56,30,'_menu_item_xfn',''),(57,30,'_menu_item_url','');
/*!40000 ALTER TABLE `wp_postmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_posts`
--

DROP TABLE IF EXISTS `wp_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_posts` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_author` bigint(20) unsigned NOT NULL DEFAULT 0,
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext NOT NULL,
  `post_title` text NOT NULL,
  `post_excerpt` text NOT NULL,
  `post_status` varchar(20) NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) NOT NULL DEFAULT 'open',
  `post_password` varchar(255) NOT NULL DEFAULT '',
  `post_name` varchar(200) NOT NULL DEFAULT '',
  `to_ping` text NOT NULL,
  `pinged` text NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` longtext NOT NULL,
  `post_parent` bigint(20) unsigned NOT NULL DEFAULT 0,
  `guid` varchar(255) NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT 0,
  `post_type` varchar(20) NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  KEY `post_name` (`post_name`(191)),
  KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  KEY `post_parent` (`post_parent`),
  KEY `post_author` (`post_author`),
  KEY `type_status_author` (`post_type`,`post_status`,`post_author`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_posts`
--

LOCK TABLES `wp_posts` WRITE;
/*!40000 ALTER TABLE `wp_posts` DISABLE KEYS */;
INSERT INTO `wp_posts` VALUES (1,1,'2026-03-24 03:14:26','2026-03-24 03:14:26','<!-- wp:paragraph -->\n<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n<!-- /wp:paragraph -->','Hello world!','','publish','open','open','','hello-world','','','2026-03-24 03:14:26','2026-03-24 03:14:26','',0,'https://educationministry.org/?p=1',0,'post','',1),(2,1,'2026-03-24 03:14:26','2026-03-24 03:14:26','<!-- wp:paragraph -->\n<p>This is an example page. It\'s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:quote -->\n<blockquote class=\"wp-block-quote\">\n<!-- wp:paragraph -->\n<p>Hi there! I\'m a bike messenger by day, aspiring actor by night, and this is my website. I live in Los Angeles, have a great dog named Jack, and I like pi&#241;a coladas. (And gettin\' caught in the rain.)</p>\n<!-- /wp:paragraph -->\n</blockquote>\n<!-- /wp:quote -->\n\n<!-- wp:paragraph -->\n<p>...or something like this:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:quote -->\n<blockquote class=\"wp-block-quote\">\n<!-- wp:paragraph -->\n<p>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.</p>\n<!-- /wp:paragraph -->\n</blockquote>\n<!-- /wp:quote -->\n\n<!-- wp:paragraph -->\n<p>As a new WordPress user, you should go to <a href=\"https://educationministry.org/wp-admin/\">your dashboard</a> to delete this page and create new pages for your content. Have fun!</p>\n<!-- /wp:paragraph -->','Sample Page','','publish','closed','open','','sample-page','','','2026-03-24 03:14:26','2026-03-24 03:14:26','',0,'https://educationministry.org/?page_id=2',0,'page','',0),(3,1,'2026-03-24 03:14:26','2026-03-24 03:14:26','<!-- wp:heading -->\n<h2 class=\"wp-block-heading\">Who we are</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p><strong class=\"privacy-policy-tutorial\">Suggested text: </strong>Our website address is: https://educationministry.org.</p>\n<!-- /wp:paragraph -->\n<!-- wp:heading -->\n<h2 class=\"wp-block-heading\">Comments</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p><strong class=\"privacy-policy-tutorial\">Suggested text: </strong>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor&#8217;s IP address and browser user agent string to help spam detection.</p>\n<!-- /wp:paragraph -->\n<!-- wp:paragraph -->\n<p>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p>\n<!-- /wp:paragraph -->\n<!-- wp:heading -->\n<h2 class=\"wp-block-heading\">Media</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p><strong class=\"privacy-policy-tutorial\">Suggested text: </strong>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p>\n<!-- /wp:paragraph -->\n<!-- wp:heading -->\n<h2 class=\"wp-block-heading\">Cookies</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p><strong class=\"privacy-policy-tutorial\">Suggested text: </strong>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p>\n<!-- /wp:paragraph -->\n<!-- wp:paragraph -->\n<p>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>\n<!-- /wp:paragraph -->\n<!-- wp:paragraph -->\n<p>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select &quot;Remember Me&quot;, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p>\n<!-- /wp:paragraph -->\n<!-- wp:paragraph -->\n<p>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p>\n<!-- /wp:paragraph -->\n<!-- wp:heading -->\n<h2 class=\"wp-block-heading\">Embedded content from other websites</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p><strong class=\"privacy-policy-tutorial\">Suggested text: </strong>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>\n<!-- /wp:paragraph -->\n<!-- wp:paragraph -->\n<p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p>\n<!-- /wp:paragraph -->\n<!-- wp:heading -->\n<h2 class=\"wp-block-heading\">Who we share your data with</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p><strong class=\"privacy-policy-tutorial\">Suggested text: </strong>If you request a password reset, your IP address will be included in the reset email.</p>\n<!-- /wp:paragraph -->\n<!-- wp:heading -->\n<h2 class=\"wp-block-heading\">How long we retain your data</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p><strong class=\"privacy-policy-tutorial\">Suggested text: </strong>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p>\n<!-- /wp:paragraph -->\n<!-- wp:paragraph -->\n<p>For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p>\n<!-- /wp:paragraph -->\n<!-- wp:heading -->\n<h2 class=\"wp-block-heading\">What rights you have over your data</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p><strong class=\"privacy-policy-tutorial\">Suggested text: </strong>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p>\n<!-- /wp:paragraph -->\n<!-- wp:heading -->\n<h2 class=\"wp-block-heading\">Where your data is sent</h2>\n<!-- /wp:heading -->\n<!-- wp:paragraph -->\n<p><strong class=\"privacy-policy-tutorial\">Suggested text: </strong>Visitor comments may be checked through an automated spam detection service.</p>\n<!-- /wp:paragraph -->\n','Privacy Policy','','draft','closed','open','','privacy-policy','','','2026-03-24 03:14:26','2026-03-24 03:14:26','',0,'https://educationministry.org/?page_id=3',0,'page','',0),(4,0,'2026-03-24 03:14:26','2026-03-24 03:14:26','<!-- wp:page-list /-->','Navigation','','publish','closed','closed','','navigation','','','2026-03-24 03:14:26','2026-03-24 03:14:26','',0,'https://educationministry.org/2026/03/24/navigation/',0,'wp_navigation','',0),(5,0,'2026-03-24 03:16:26','2026-03-24 03:16:26','','Home','','publish','closed','closed','','home','','','2026-03-24 03:16:26','2026-03-24 03:16:26','',0,'https://educationministry.org/home/',0,'page','',0),(6,0,'2026-03-24 03:16:26','2026-03-24 03:16:26','','About','','publish','closed','closed','','about','','','2026-03-24 03:16:26','2026-03-24 03:16:26','',0,'https://educationministry.org/about/',0,'page','',0),(7,0,'2026-03-24 03:16:26','2026-03-24 03:16:26','','Programs','','publish','closed','closed','','programs','','','2026-03-24 03:16:26','2026-03-24 03:16:26','',0,'https://educationministry.org/programs/',0,'page','',0),(8,0,'2026-03-24 03:16:26','2026-03-24 03:16:26','','Membership','','publish','closed','closed','','membership','','','2026-03-24 03:16:26','2026-03-24 03:16:26','',0,'https://educationministry.org/membership/',0,'page','',0),(9,0,'2026-03-24 03:16:27','2026-03-24 03:16:27','','Civic Library','','publish','closed','closed','','civic-library','','','2026-03-24 03:16:27','2026-03-24 03:16:27','',0,'https://educationministry.org/civic-library/',0,'page','',0),(10,0,'2026-03-24 03:16:27','2026-03-24 03:16:27','','Donate','','publish','closed','closed','','donate','','','2026-03-24 03:16:27','2026-03-24 03:16:27','',0,'https://educationministry.org/donate/',0,'page','',0),(11,0,'2026-03-24 03:16:27','2026-03-24 03:16:27','','Start','','publish','closed','closed','','start','','','2026-03-24 03:16:27','2026-03-24 03:16:27','',0,'https://educationministry.org/start/',0,'page','',0),(12,0,'2026-03-24 03:16:28','2026-03-24 03:16:28','','Learn','','publish','closed','closed','','learn','','','2026-03-24 03:16:28','2026-03-24 03:16:28','',0,'https://educationministry.org/learn/',0,'page','',0),(13,0,'2026-03-24 03:16:28','2026-03-24 03:16:28','','Signup','','publish','closed','closed','','signup','','','2026-03-24 03:16:28','2026-03-24 03:16:28','',0,'https://educationministry.org/signup/',0,'page','',0),(14,0,'2026-03-24 03:16:28','2026-03-24 03:16:28','','Welcome','','publish','closed','closed','','welcome','','','2026-03-24 03:16:28','2026-03-24 03:16:28','',0,'https://educationministry.org/welcome/',0,'page','',0),(15,0,'2026-03-24 03:16:29','2026-03-24 03:16:29','','Capstone','','publish','closed','closed','','capstone','','','2026-03-24 03:16:29','2026-03-24 03:16:29','',0,'https://educationministry.org/capstone/',0,'page','',0),(16,0,'2026-03-24 03:16:29','2026-03-24 03:16:29','','Apply','','publish','closed','closed','','apply','','','2026-03-24 03:16:29','2026-03-24 03:16:29','',0,'https://educationministry.org/apply/',0,'page','',0),(17,0,'2026-03-24 03:16:29','2026-03-24 03:16:29','','Book Call','','publish','closed','closed','','book-call','','','2026-03-24 03:16:29','2026-03-24 03:16:29','',0,'https://educationministry.org/book-call/',0,'page','',0),(18,0,'2026-03-24 03:16:30','2026-03-24 03:16:30','','Dashboard','','publish','closed','closed','','dashboard','','','2026-03-24 03:16:30','2026-03-24 03:16:30','',0,'https://educationministry.org/dashboard/',0,'page','',0),(19,0,'2026-03-24 03:16:30','2026-03-24 03:16:30','','Trust Services','','publish','closed','closed','','trust-services','','','2026-03-24 03:16:30','2026-03-24 03:16:30','',0,'https://educationministry.org/trust-services/',0,'page','',0),(20,0,'2026-03-24 03:16:31','2026-03-24 03:16:31','','Active Projects','','publish','closed','closed','','active-projects','','','2026-03-24 03:16:31','2026-03-24 03:16:31','',0,'https://educationministry.org/active-projects/',0,'page','',0),(21,0,'2026-03-24 03:16:31','2026-03-24 03:16:31','','Document Vault','','publish','closed','closed','','document-vault','','','2026-03-24 03:16:31','2026-03-24 03:16:31','',0,'https://educationministry.org/document-vault/',0,'page','',0),(22,0,'2026-03-24 03:16:32','2026-03-24 03:16:32','','Governance Center','','publish','closed','closed','','governance-center','','','2026-03-24 03:16:32','2026-03-24 03:16:32','',0,'https://educationministry.org/governance-center/',0,'page','',0),(23,0,'2026-03-24 03:16:33','2026-03-24 03:16:33','','Head Steward AI','','publish','closed','closed','','head-steward-ai','','','2026-03-24 03:16:33','2026-03-24 03:16:33','',0,'https://educationministry.org/head-steward-ai/',0,'page','',0),(24,0,'2026-03-24 03:16:33','2026-03-24 03:16:33','','Account','','publish','closed','closed','','account','','','2026-03-24 03:16:33','2026-03-24 03:16:33','',0,'https://educationministry.org/account/',0,'page','',0),(25,0,'2026-03-24 03:16:40','2026-03-24 03:16:40',' ','','','publish','closed','closed','','25','','','2026-03-24 03:16:40','2026-03-24 03:16:40','',0,'https://educationministry.org/25/',0,'nav_menu_item','',0),(26,0,'2026-03-24 03:16:41','2026-03-24 03:16:41',' ','','','publish','closed','closed','','26','','','2026-03-24 03:16:41','2026-03-24 03:16:41','',0,'https://educationministry.org/26/',2,'nav_menu_item','',0),(27,0,'2026-03-24 03:16:41','2026-03-24 03:16:41',' ','','','publish','closed','closed','','27','','','2026-03-24 03:16:41','2026-03-24 03:16:41','',0,'https://educationministry.org/27/',3,'nav_menu_item','',0),(28,0,'2026-03-24 03:16:42','2026-03-24 03:16:42',' ','','','publish','closed','closed','','28','','','2026-03-24 03:16:42','2026-03-24 03:16:42','',0,'https://educationministry.org/28/',4,'nav_menu_item','',0),(29,0,'2026-03-24 03:16:43','2026-03-24 03:16:43',' ','','','publish','closed','closed','','29','','','2026-03-24 03:16:43','2026-03-24 03:16:43','',0,'https://educationministry.org/29/',5,'nav_menu_item','',0),(30,0,'2026-03-24 03:16:43','2026-03-24 03:16:43',' ','','','publish','closed','closed','','30','','','2026-03-24 03:16:43','2026-03-24 03:16:43','',0,'https://educationministry.org/30/',6,'nav_menu_item','',0);
/*!40000 ALTER TABLE `wp_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_term_relationships`
--

DROP TABLE IF EXISTS `wp_term_relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_term_relationships` (
  `object_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `term_taxonomy_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `term_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`object_id`,`term_taxonomy_id`),
  KEY `term_taxonomy_id` (`term_taxonomy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_term_relationships`
--

LOCK TABLES `wp_term_relationships` WRITE;
/*!40000 ALTER TABLE `wp_term_relationships` DISABLE KEYS */;
INSERT INTO `wp_term_relationships` VALUES (1,1,0),(25,2,0),(26,2,0),(27,2,0),(28,2,0),(29,2,0),(30,2,0);
/*!40000 ALTER TABLE `wp_term_relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_term_taxonomy`
--

DROP TABLE IF EXISTS `wp_term_taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_term_taxonomy` (
  `term_taxonomy_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `taxonomy` varchar(32) NOT NULL DEFAULT '',
  `description` longtext NOT NULL,
  `parent` bigint(20) unsigned NOT NULL DEFAULT 0,
  `count` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`term_taxonomy_id`),
  UNIQUE KEY `term_id_taxonomy` (`term_id`,`taxonomy`),
  KEY `taxonomy` (`taxonomy`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_term_taxonomy`
--

LOCK TABLES `wp_term_taxonomy` WRITE;
/*!40000 ALTER TABLE `wp_term_taxonomy` DISABLE KEYS */;
INSERT INTO `wp_term_taxonomy` VALUES (1,1,'category','',0,1),(2,2,'nav_menu','',0,6);
/*!40000 ALTER TABLE `wp_term_taxonomy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_termmeta`
--

DROP TABLE IF EXISTS `wp_termmeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_termmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`meta_id`),
  KEY `term_id` (`term_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_termmeta`
--

LOCK TABLES `wp_termmeta` WRITE;
/*!40000 ALTER TABLE `wp_termmeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_termmeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_terms`
--

DROP TABLE IF EXISTS `wp_terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_terms` (
  `term_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
  `slug` varchar(200) NOT NULL DEFAULT '',
  `term_group` bigint(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (`term_id`),
  KEY `slug` (`slug`(191)),
  KEY `name` (`name`(191))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_terms`
--

LOCK TABLES `wp_terms` WRITE;
/*!40000 ALTER TABLE `wp_terms` DISABLE KEYS */;
INSERT INTO `wp_terms` VALUES (1,'Uncategorized','uncategorized',0),(2,'Main Menu','main-menu',0);
/*!40000 ALTER TABLE `wp_terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_usermeta`
--

DROP TABLE IF EXISTS `wp_usermeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_usermeta` (
  `umeta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`umeta_id`),
  KEY `user_id` (`user_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_usermeta`
--

LOCK TABLES `wp_usermeta` WRITE;
/*!40000 ALTER TABLE `wp_usermeta` DISABLE KEYS */;
INSERT INTO `wp_usermeta` VALUES (1,1,'nickname','Talmid'),(2,1,'first_name',''),(3,1,'last_name',''),(4,1,'description',''),(5,1,'rich_editing','true'),(6,1,'syntax_highlighting','true'),(7,1,'comment_shortcuts','false'),(8,1,'admin_color','fresh'),(9,1,'use_ssl','0'),(10,1,'show_admin_bar_front','true'),(11,1,'locale',''),(12,1,'wp_capabilities','a:1:{s:13:\"administrator\";b:1;}'),(13,1,'wp_user_level','10'),(14,1,'dismissed_wp_pointers',''),(15,1,'show_welcome_panel','1');
/*!40000 ALTER TABLE `wp_usermeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_users`
--

DROP TABLE IF EXISTS `wp_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_users` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) NOT NULL DEFAULT '',
  `user_pass` varchar(255) NOT NULL DEFAULT '',
  `user_nicename` varchar(50) NOT NULL DEFAULT '',
  `user_email` varchar(100) NOT NULL DEFAULT '',
  `user_url` varchar(100) NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(255) NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT 0,
  `display_name` varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `user_login_key` (`user_login`),
  KEY `user_nicename` (`user_nicename`),
  KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_users`
--

LOCK TABLES `wp_users` WRITE;
/*!40000 ALTER TABLE `wp_users` DISABLE KEYS */;
INSERT INTO `wp_users` VALUES (1,'Talmid','$wp$2y$10$MzQPmXRA6HwoUOKew7qKh.6Omn0zJ4C80ARCfL5mc7vTlXJ3.ZpSi','talmid','bteducationministry@gmail.com','https://educationministry.org','2026-03-24 03:14:26','',0,'Talmid');
/*!40000 ALTER TABLE `wp_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wpforms_logs`
--

DROP TABLE IF EXISTS `wp_wpforms_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_wpforms_logs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `message` longtext NOT NULL,
  `types` varchar(255) NOT NULL,
  `create_at` datetime NOT NULL,
  `form_id` bigint(20) DEFAULT NULL,
  `entry_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wpforms_logs`
--

LOCK TABLES `wp_wpforms_logs` WRITE;
/*!40000 ALTER TABLE `wp_wpforms_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wpforms_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wpforms_payment_meta`
--

DROP TABLE IF EXISTS `wp_wpforms_payment_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_wpforms_payment_meta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `payment_id` bigint(20) NOT NULL,
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_id` (`payment_id`),
  KEY `meta_key` (`meta_key`(191)),
  KEY `meta_value` (`meta_value`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wpforms_payment_meta`
--

LOCK TABLES `wp_wpforms_payment_meta` WRITE;
/*!40000 ALTER TABLE `wp_wpforms_payment_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wpforms_payment_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wpforms_payments`
--

DROP TABLE IF EXISTS `wp_wpforms_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_wpforms_payments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `form_id` bigint(20) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT '',
  `subtotal_amount` decimal(26,8) NOT NULL DEFAULT 0.00000000,
  `discount_amount` decimal(26,8) NOT NULL DEFAULT 0.00000000,
  `total_amount` decimal(26,8) NOT NULL DEFAULT 0.00000000,
  `currency` varchar(3) NOT NULL DEFAULT '',
  `entry_id` bigint(20) NOT NULL DEFAULT 0,
  `gateway` varchar(20) NOT NULL DEFAULT '',
  `type` varchar(12) NOT NULL DEFAULT '',
  `mode` varchar(4) NOT NULL DEFAULT '',
  `transaction_id` varchar(40) NOT NULL DEFAULT '',
  `customer_id` varchar(40) NOT NULL DEFAULT '',
  `subscription_id` varchar(40) NOT NULL DEFAULT '',
  `subscription_status` varchar(10) NOT NULL DEFAULT '',
  `title` varchar(255) NOT NULL DEFAULT '',
  `date_created_gmt` datetime NOT NULL,
  `date_updated_gmt` datetime NOT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `form_id` (`form_id`),
  KEY `status` (`status`(8)),
  KEY `total_amount` (`total_amount`),
  KEY `type` (`type`(8)),
  KEY `transaction_id` (`transaction_id`(32)),
  KEY `customer_id` (`customer_id`(32)),
  KEY `subscription_id` (`subscription_id`(32)),
  KEY `subscription_status` (`subscription_status`(8)),
  KEY `title` (`title`(64))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wpforms_payments`
--

LOCK TABLES `wp_wpforms_payments` WRITE;
/*!40000 ALTER TABLE `wp_wpforms_payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `wp_wpforms_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wp_wpforms_tasks_meta`
--

DROP TABLE IF EXISTS `wp_wpforms_tasks_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wp_wpforms_tasks_meta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `action` varchar(255) NOT NULL,
  `data` longtext NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wp_wpforms_tasks_meta`
--

LOCK TABLES `wp_wpforms_tasks_meta` WRITE;
/*!40000 ALTER TABLE `wp_wpforms_tasks_meta` DISABLE KEYS */;
INSERT INTO `wp_wpforms_tasks_meta` VALUES (1,'wpforms_process_forms_locator_scan','W10=','2026-03-24 03:28:05'),(2,'wpforms_process_purge_spam','W10=','2026-03-24 03:28:05');
/*!40000 ALTER TABLE `wp_wpforms_tasks_meta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-25  0:38:28
