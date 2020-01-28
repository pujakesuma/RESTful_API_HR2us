-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 28, 2020 at 06:19 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hr2us`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `logo` varchar(500) DEFAULT NULL,
  `email` varchar(100) DEFAULT '',
  `location` varchar(500) NOT NULL DEFAULT '',
  `description` varchar(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `logo`, `email`, `location`, `description`) VALUES
('f182e150', 'Jual Lagi', 'logo-1580186164829.jpeg', 'admin@juallagi.id', 'Bogor', 'Jual semua perlengkapan rumahmu yang tak terpakai'),
('dbda7ded', 'Warung Abah', 'logo-1580186370525.jpeg', 'admin@warung.id', 'Jakarta', 'Makan sepuasnya, harga Maknyuss');

-- --------------------------------------------------------

--
-- Table structure for table `engineers`
--

CREATE TABLE `engineers` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `photo` varchar(300) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `skill` text NOT NULL DEFAULT '',
  `location` varchar(100) NOT NULL DEFAULT '',
  `date_of_birth` date DEFAULT NULL,
  `expected_salary` double DEFAULT 0,
  `email` varchar(100) DEFAULT '',
  `showcase` varchar(100) NOT NULL DEFAULT '',
  `date_created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `engineers`
--

INSERT INTO `engineers` (`id`, `name`, `photo`, `description`, `skill`, `location`, `date_of_birth`, `expected_salary`, `email`, `showcase`, `date_created`, `date_updated`) VALUES
('fe106549', 'Soultan Muhammad Albar', 'photo-1580184162649.jpg', 'Fresh Graduate', 'GraphQL, ReactJS, React Native', 'Yogyakarta', '1996-01-03', 6000000, 'soultan.muh@gmail.com', 'github.com/sofrosine', '2020-01-07 00:26:09', '2020-01-28 04:02:42'),
('ad370b9d', 'Alfin Sigit Prawito', 'photo-1580183193182.jpg', 'Fresh Graduate', 'NodeJS, ExpressJS, MySQL, ReactJS', 'Palembang', '1996-04-11', 6000000, 'massgt@gmail.com', 'medium.com/alfinsigit', '2020-01-11 06:26:50', '2020-01-28 03:46:33'),
('8c407c00', 'Mandra Setyo Wijaya', 'photo-1578852113401.jpg', 'Fresh Graduate', 'NodeJS, ExpressJS, MySQL, GraphQL', 'Palembang', '1996-08-11', 6000000, 'mandra@gmail.com', 'medium.com/mandra', '2020-01-11 07:06:12', '2020-01-12 18:01:53'),
('ccc74a46', 'Ahmad Ridwan', 'photo-1580184680014.jpg', 'Fresh Graduate', 'Javascript, Express, ReactJS, React Native', 'Bandung', '1996-07-31', 6000000, 'ridwan@gmail.com', 'github.com/pujakesuma', '2020-01-13 03:53:22', '2020-01-28 04:11:20'),
('e56adcd3', 'Ageng Setyo Nugroho', 'photo-1580184929736.jpg', 'Fresh Graduate', 'Javascript, Python, ReactJS, React Native', 'Palembang', '1996-04-15', 7000000, 'ageng@gmail.com', 'github.com/melankolia', '2020-01-13 03:57:51', '2020-01-28 04:15:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(200) NOT NULL,
  `idid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `idid`) VALUES
('fe106549', 'soultan.muh@gmail.com', '$2a$08$44rsa2t8QTw24JgDQKUGYeW46rUueFDT9rNLL4DHiMgUNODLt7kie', 'engineer', 5),
('f182e150', 'admin@juallagi.id', '$2a$08$mgFA2bg9XEXNX.y5M.OsqOuBUZtQU0zJuW921seGdDYQzrP1wkywG', 'company', 8),
('ad370b9d', 'massgt@gmail.com', '$2a$08$EaI7eK6E5RljPwYxZEBaKeu35jahI36pl8ITjmSMCsDGxs2mG0uC.', 'engineer', 10),
('8c407c00', 'mandra@gmail.com', '$2a$08$sSDT5AqaDOqIL1TcVsRJaOc9fX2yo1i0884Mj6.BWk5pKHF4TH1.S', 'engineer', 14),
('dbda7ded', 'admin@warung.id', '$2a$08$fvM7jqPxd4htmzrWfHfEC.B/2x49zPehwplc90vsuh1Hpn.rO6reG', 'company', 16),
('ccc74a46', 'ridwan@gmail.com', '$2a$08$VtbNQpkFwgctN5L6sWvPE.eVEiwQBcfAPuVzjiOaMxPlOQ1XuB9R.', 'engineer', 17),
('e56adcd3', 'ageng@gmail.com', '$2a$08$oTWLX2UG13f.Yc6yMo9BouVEPQB2Seoy4iXTX.35kFuatUaib.Wp6', 'engineer', 18);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
