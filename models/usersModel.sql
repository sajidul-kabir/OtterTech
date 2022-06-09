CREATE TABLE `users` (
 `username` varchar(100) NOT NULL,
 `fullname` varchar(100) DEFAULT NULL,
 `email` varchar(100) DEFAULT NULL,
 `password` varchar(255) DEFAULT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`username`),
 UNIQUE KEY `username` (`username`)
) 