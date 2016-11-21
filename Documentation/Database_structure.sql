-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 21, 2016 at 09:33 PM
-- Server version: 5.7.16
-- PHP Version: 7.1.0RC6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `orsumIchnographiae`
--

-- --------------------------------------------------------

--
-- Table structure for table `bewegung`
--

CREATE TABLE `bewegung` (
  `ID` int(11) NOT NULL,
  `eventIDFS` int(11) DEFAULT NULL,
  `ortIDFS` int(11) DEFAULT NULL,
  `moveIndex` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `ID` int(11) NOT NULL,
  `monatIDFS` int(11) DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jahre`
--

CREATE TABLE `jahre` (
  `ID` int(11) NOT NULL,
  `jahr` year(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `monat`
--

CREATE TABLE `monat` (
  `ID` int(11) NOT NULL,
  `jahrIDFS` int(11) DEFAULT NULL,
  `monat` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ort`
--

CREATE TABLE `ort` (
  `ID` int(11) NOT NULL,
  `name` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `x` double NOT NULL,
  `y` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bewegung`
--
ALTER TABLE `bewegung`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`),
  ADD KEY `ID_2` (`ID`),
  ADD KEY `eventIDFS` (`eventIDFS`),
  ADD KEY `ortIDFS` (`ortIDFS`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`),
  ADD KEY `monatIDFS` (`monatIDFS`);

--
-- Indexes for table `jahre`
--
ALTER TABLE `jahre`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`),
  ADD KEY `ID_2` (`ID`);

--
-- Indexes for table `monat`
--
ALTER TABLE `monat`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`),
  ADD KEY `jahrIDFS` (`jahrIDFS`);

--
-- Indexes for table `ort`
--
ALTER TABLE `ort`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`);
ALTER TABLE `ort` ADD FULLTEXT KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bewegung`
--
ALTER TABLE `bewegung`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `jahre`
--
ALTER TABLE `jahre`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `monat`
--
ALTER TABLE `monat`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT for table `ort`
--
ALTER TABLE `ort`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bewegung`
--
ALTER TABLE `bewegung`
  ADD CONSTRAINT `bewegung_ibfk_1` FOREIGN KEY (`eventIDFS`) REFERENCES `events` (`ID`),
  ADD CONSTRAINT `bewegung_ibfk_2` FOREIGN KEY (`ortIDFS`) REFERENCES `ort` (`ID`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`monatIDFS`) REFERENCES `monat` (`ID`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `jahre`
--
ALTER TABLE `jahre`
  ADD CONSTRAINT `jahre_monat` FOREIGN KEY (`ID`) REFERENCES `monat` (`jahrIDFS`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
