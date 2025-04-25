-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : mer. 26 mars 2025 à 09:28
-- Version du serveur : 9.2.0
-- Version de PHP : 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `liker_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_general_ci DEFAULT 'user',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('be00b978-0a3f-47c7-9b5e-ce75a63106ab', 'user', 'user', 'user@user.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'user', '2025-03-17 12:02:27', '2025-03-17 12:02:27'),
('c7cfe060-0327-11f0-bc6f-0242ac110002', 'admin', 'admin', 'admin@admin.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', 'admin', '2025-03-17 12:02:27', '2025-03-17 12:02:27');

-- --------------------------------------------------------

--
-- Structure de la table `vacations`
--

CREATE TABLE `vacations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `start_date`, `end_date`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Bali, Indonesia', 'Experience stunning beaches, lush rice terraces, and spiritual temples.', '2025-06-15', '2025-06-25', 1499.00, 'il.co.johnbryce.shaihey/68d74d21-08f6-4824-a461-3d84f0aa76b5.jpeg', '2025-03-10 14:37:49', '2025-03-26 09:02:14'),
('550e8400-e29b-41d4-a716-446655440002', 'Paris, France', 'Explore the City of Love with its iconic Eiffel Tower, museums, and cafes.', '2025-04-10', '2025-04-20', 1799.00, 'il.co.johnbryce.shaihey/04476895-cc2f-4343-ade1-8dc9f94dc3ec.jpeg', '2025-03-10 14:37:49', '2025-03-26 08:59:59'),
('550e8400-e29b-41d4-a716-446655440003', 'Tokyo, Japan', 'Discover the perfect blend of traditional culture and modern skyscrapers.', '2025-09-01', '2025-09-10', 2200.00, 'il.co.johnbryce.shaihey/b8d05d25-6a52-4ab5-aa7a-53560318ddb8.jpeg', '2025-03-10 14:37:49', '2025-03-26 09:02:43'),
('550e8400-e29b-41d4-a716-446655440004', 'New York, USA', 'Visit the Big Apple with its dazzling skyline, Broadway shows, and Central Park.', '2025-05-05', '2025-05-15', 1999.00, 'il.co.johnbryce.shaihey/328925a2-4345-43fc-94bd-6c5636fd6d95.jpeg', '2025-03-10 14:37:49', '2025-03-26 09:00:27'),
('550e8400-e29b-41d4-a716-446655440007', 'Rome, Italy', 'Step back in time with ancient ruins, stunning cathedrals, and delicious cuisine.', '2025-03-20', '2025-03-30', 1600.00, 'il.co.johnbryce.shaihey/fc3c0c49-7526-4c9c-b66a-8954993e2c0b.jpeg', '2025-03-10 14:37:49', '2025-03-26 08:58:46'),
('550e8400-e29b-41d4-a716-446655440011', 'Barcelona, Spain', 'Wander through Gaudí’s architectural wonders and enjoy Mediterranean beaches.', '2025-06-01', '2025-06-10', 1700.00, 'il.co.johnbryce.shaihey/b3270794-da90-443f-bf04-5cdabd6a2f24.jpeg', '2025-03-10 14:37:49', '2025-03-26 09:01:47'),
('550e8400-e29b-41d4-a716-446655440012', 'Reykjavik, Iceland', 'Chase the Northern Lights, explore glaciers, and relax in hot springs.', '2025-03-12', '2025-03-16', 3000.00, 'il.co.johnbryce.shaihey/bd188091-eda1-417e-b0be-4132b87f35d8.jpg', '2025-03-10 14:37:49', '2025-03-26 08:57:45'),
('550e8400-e29b-41d4-a716-446655440014', 'Cape Town, South Africa', 'Enjoy breathtaking views from Table Mountain and explore vibrant culture.', '2025-10-05', '2025-10-15', 1800.00, 'il.co.johnbryce.shaihey/c7780a3d-f5de-48d3-a4cb-717219969328.jpeg', '2025-03-17 10:00:00', '2025-03-26 09:03:57'),
('550e8400-e29b-41d4-a716-446655440015', 'Machu Picchu, Peru', 'Discover the ancient Incan city nestled in the Andes mountains.', '2025-09-15', '2025-09-25', 2300.00, 'il.co.johnbryce.shaihey/84846167-ea16-4f26-a811-3b1512dd4d5d.jpg', '2025-03-17 10:00:00', '2025-03-26 09:03:29'),
('550e8400-e29b-41d4-a716-446655440017', 'Rio de Janeiro, Brazil', 'Dance to samba beats, visit Christ the Redeemer, and relax on Copacabana.', '2025-02-15', '2025-02-25', 1900.00, 'il.co.johnbryce.shaihey/bec45a0c-d8ff-468b-ae0d-11b3ca5d8d01.jpg', '2025-03-17 10:00:00', '2025-03-26 08:56:11'),
('550e8400-e29b-41d4-a716-446655440018', 'Amsterdam, Netherlands', 'Cruise the canals, visit world-class museums, and cycle through the city.', '2025-05-10', '2025-05-18', 1600.00, 'il.co.johnbryce.shaihey/b7c98a62-a264-4934-a307-dc236065a75f.jpeg', '2025-03-17 10:00:00', '2025-03-26 09:00:55'),
('550e8400-e29b-41d4-a716-446655440021', 'Bangkok, Thailand', 'Experience vibrant street markets, stunning temples, and delicious cuisine.', '2025-04-05', '2025-04-15', 1300.00, 'il.co.johnbryce.shaihey/df6a8482-7038-416d-a96a-a172f343d1d3.jpeg', '2025-03-17 10:00:00', '2025-03-26 08:59:31');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`liker_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email` (`email`);

--
-- Index pour la table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`liker_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;