CREATE TABLE `user` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `registration_date` timestamp,
  PRIMARY KEY (`id`)
);'
