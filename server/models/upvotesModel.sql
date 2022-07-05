CREATE TABLE `upvotes` (
 `users_username` varchar(255) NOT NULL,
 `blog_id` int NOT NULL,
 PRIMARY KEY (`users_username`,`blog_id`),
 KEY `blog_id` (`blog_id`),
 CONSTRAINT `upvotes_ibfk_1` FOREIGN KEY (`users_username`) REFERENCES `users` (`username`),
 CONSTRAINT `upvotes_ibfk_2` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`)
) 