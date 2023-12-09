-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2023 at 06:47 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `funandfestive`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`) VALUES
(1, 'Events'),
(2, 'Catering'),
(3, 'Makeup & Styling'),
(4, 'PHOTOGRAPGHY'),
(5, 'ENTERTAINMENT'),
(6, 'ALACARTE'),
(7, 'New Event'),
(8, 'New Event 2');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Rohitha', 'rohitha@gmail.com', 'sha1$db3314d7$1$71e0a0e267aabdffbc9b1562544c4219d4e2cdcb'),
(2, 'Satish', 'satishdnd9@gmail.com', 'sha1$6ff860fd$1$dd89ca99540086e6bea845f3fed6543630289bf3'),
(3, 'Alvin', 'alvin@gmail.com', 'sha1$c2dbab71$1$3d8b76323a04faad40f11c71ef5e4078f711080d'),
(4, 'Back', 'back@gmail.com', 'sha1$02f3cba1$1$200d597a55664b89b8815e52a85512d301d805bf'),
(5, 'Backup04092023', 'csa@gmail.com', 'sha1$d39c68c4$1$6a5bbfdf25a455b08dce6b395f6ae58ec86e8620'),
(6, 'Backup04092023', 'csa@gmail.com', 'sha1$68903e17$1$9dacd1294d5b97916c368161b1074d06ef0e2ffe'),
(7, 'Satish', 'teja.parapathi@gmail.com', 'sha1$d0bcfa88$1$03232af5df3df9ae55608c5ec61ca555c6b89018');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
