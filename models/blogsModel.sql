CREATE TABLE `blogs` (
`id` int NOT NULL AUTO_INCREMENT,
 `title` varchar(100) DEFAULT NULL,
 `blog` text,
 `cover_photo` varchar(255) DEFAULT NULL,
 `user_username` varchar(255) NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 KEY `user_username` (`user_username`),
 CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`user_username`) REFERENCES `users` (`username`)
) 