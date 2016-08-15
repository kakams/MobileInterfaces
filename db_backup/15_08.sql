-- phpMyAdmin SQL Dump
-- version home.pl
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas wygenerowania: 15 Sie 2016, 14:17
-- Wersja serwera: 5.5.50-38.0-log
-- Wersja PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza danych: `20454239_1`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Category`
--

CREATE TABLE IF NOT EXISTS `Category` (
  `idCategory` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idCategory`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

--
-- Zrzut danych tabeli `Category`
--

INSERT INTO `Category` (`idCategory`, `name`, `description`) VALUES
(0, 'root', NULL),
(1, 'Elektronika', NULL),
(2, 'Moda', NULL),
(3, 'Dom', NULL),
(4, 'Sport', NULL),
(5, 'Motoryzacja', NULL),
(6, 'Kultura', NULL),
(11, 'RTV', NULL),
(12, 'AGD', NULL),
(13, 'Komputery', NULL),
(21, 'Męska', NULL),
(22, 'Damska', NULL),
(23, 'Dziecięca', NULL),
(31, 'Meble', NULL),
(32, 'Budownictwo', NULL),
(33, 'Ogród', NULL),
(41, 'Siłownia', NULL),
(42, 'Rowery', NULL),
(43, 'Inne', NULL),
(51, 'Samochody', NULL),
(52, 'Motocykle', NULL),
(53, 'Maszyny rolnicze', NULL),
(61, 'Filmy', NULL),
(62, 'Muzyka', NULL),
(63, 'Książki', NULL),
(111, 'TV', 'Telewizor'),
(112, 'Video', 'Sprzęt wideo'),
(113, 'Audio', 'Sprzęt audio'),
(121, 'Zmywarki', 'Zmywarka'),
(122, 'Pralki', 'Pralka'),
(123, 'Lodówki', 'Lodówka'),
(131, 'Stacjionarne', 'Komputer stacjonarny'),
(132, 'Laptopy', 'Laptop'),
(133, 'Monitory', 'Monitor'),
(211, 'Spodnie', 'Spodnie męskie'),
(212, 'Koszulki', 'Koszulka meska'),
(213, 'Bluzy', 'Bluza męska'),
(221, 'Spódnice', 'Spódnica'),
(222, 'Bluzki', 'Bluzka damska'),
(223, 'Spodnie', 'Spodnie damskie'),
(231, 'Spodnie', 'Spodenki dziecięce'),
(232, 'Bluzy', 'Bluzka dziecięca'),
(233, 'Buty', 'Buty dziecięce'),
(311, 'Sypialnia', 'Meble do sypialni'),
(312, 'Jadalnia', 'Meble do kuchni'),
(313, 'Salon', 'Meble do salonu'),
(321, 'Drzwi', 'Drzwi'),
(322, 'Farby', 'Farba'),
(323, 'Podłogi', 'Podłoga'),
(331, 'Grill', 'Grill'),
(332, 'Narzędzia', 'Narzędzie'),
(333, 'Sadzonki', 'Sadzonka'),
(411, 'Ciężary', 'Siłownia/ciężary'),
(412, 'Maszyny', 'Siłownia/maszyny'),
(413, 'Akcesoria', 'Akcesoria na siłownię'),
(421, 'Górskie', 'Rower górski'),
(422, 'Szosowe', 'Rower szosowy'),
(423, 'Dla dzieci', 'Rower dla dzieci'),
(431, 'Koszykówka', 'Artykuły do koszykówki'),
(432, 'Piłka nożna', 'Artykuły do piłki nożnej'),
(433, 'Hokej', 'Artykuły do hokeja'),
(511, 'Osobowe', 'Samochód osobowy'),
(512, 'Transportowe', 'Samochód transportowy'),
(513, 'Części', 'Części samochodowe'),
(521, 'Sportowe', 'Motocykl sportowy'),
(522, 'Cross', 'Motocykl cross'),
(523, 'Chopper', 'Motocykl Chopper'),
(531, 'Traktory', 'Traktor'),
(532, 'Naczepy', 'Naczepa do traktora'),
(533, 'Inne', 'Maszyna rolnicza'),
(611, 'Akcji', 'Film akcji'),
(612, 'Romantyczne', 'Film romantyczny'),
(613, 'Komedie', 'Film komediowy'),
(621, 'Rock', 'Album muzyki Rock'),
(622, 'Rap', 'Album muzyki Rap'),
(623, 'Pop', 'Album muzyki Pop'),
(631, 'Kryminał', 'Książka kryminał'),
(632, 'Horror', 'Książka horror'),
(633, 'Naukowe', 'Książka naukowa');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Client`
--

CREATE TABLE IF NOT EXISTS `Client` (
  `idClient` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `device` varchar(45) DEFAULT NULL,
  `browser` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idClient`),
  UNIQUE KEY `idClient_UNIQUE` (`idClient`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Client_Product`
--

CREATE TABLE IF NOT EXISTS `Client_Product` (
  `idClient` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  KEY `idx_Klient_Produkt_idKlient` (`idClient`),
  KEY `idx_Klient_Produkt_idProdukt` (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Client_Task`
--

CREATE TABLE IF NOT EXISTS `Client_Task` (
  `idClient` int(11) NOT NULL,
  `idTask` int(11) NOT NULL,
  `isComplete` tinyint(4) NOT NULL,
  `idInterface` int(11) NOT NULL,
  `time` int(11) DEFAULT NULL,
  `clickCounter` int(11) DEFAULT NULL,
  KEY `client_key` (`idClient`),
  KEY `task_key` (`idTask`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Interface`
--

CREATE TABLE IF NOT EXISTS `Interface` (
  `idInterface` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idInterface`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Product`
--

CREATE TABLE IF NOT EXISTS `Product` (
  `idProdukt` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `price` float NOT NULL,
  `idCategory` int(11) NOT NULL,
  `isPromotion` tinyint(4) NOT NULL,
  `imageId` varchar(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idProdukt`),
  KEY `idx_Produkt_name` (`name`),
  KEY `category_idx` (`idCategory`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin2 AUTO_INCREMENT=364 ;

--
-- Zrzut danych tabeli `Product`
--

INSERT INTO `Product` (`idProdukt`, `name`, `description`, `price`, `idCategory`, `isPromotion`, `imageId`) VALUES
(1, 'LG LED 49UF695V', '', 2799, 111, 1, '1'),
(2, 'SONY LED KDL-48WD650BAEP', '', 2389, 111, 0, '2'),
(3, 'LG LED 55UH6507', '', 3999, 111, 0, '3'),
(4, 'SONY LED KDL-50W756C', '', 3999, 111, 0, '4'),
(5, 'LG 32LF5610', '', 970, 111, 0, '5'),
(6, 'Samsung UE32K5500AWXXH', '', 1438, 111, 0, '6'),
(7, 'Samsung UE40JU6400', '', 2075, 111, 1, '7'),
(8, 'Sony KDL48WD655B', '', 2499, 111, 1, '8'),
(9, 'Samsung UE55H6400 AKXXH', '', 3299, 111, 1, '9'),
(10, 'Samsung UE50H6400 3D 400Hz', '', 2629, 111, 1, '10'),
(12, 'Samsung UBD-K8500', '', 1999, 112, 0, '1'),
(13, 'Samsung BD-J4500', '', 269, 112, 0, '2'),
(14, 'Samsung BD-J7500', '', 649, 112, 0, '3'),
(15, 'Samsung BD-H6500', '', 599, 112, 0, '4'),
(16, 'Sony BDP-S6500', '', 529, 112, 1, '5'),
(17, 'Pioneer BDP-100-K', '', 599, 112, 0, '6'),
(18, 'Yamaha BD-S477', '', 899, 112, 0, '7'),
(19, 'Yamaha BD-S677', '', 1399, 112, 0, '8'),
(20, 'Pioneer BDP-180-K', '', 969, 112, 1, '9'),
(21, 'Panasonic DMP-BDT380', '', 629, 112, 0, '10'),
(22, 'Wzmacniacz Pioneer A-10-K', '', 749, 113, 0, '1'),
(23, 'Wzmacniacz Yamaha A-S201', '', 770, 113, 0, '2'),
(24, 'Wzmacniacz Denon PMA-720AE', '', 1199, 113, 0, '3'),
(25, 'Gramofon Audio-Technika AT-LP120 USB HC ', '', 1129, 113, 1, '4'),
(26, 'Gramofon Pioneer PL-30-K', '', 1499, 113, 0, '5'),
(27, 'Gramofon Lenco L-3807', '', 1049, 113, 0, '6'),
(28, 'Pure Acoustics Supernova 5 Bookshelf', '', 299, 113, 1, '7'),
(29, 'Yamaha NS-50', '', 1999, 113, 0, '8'),
(30, 'Magnat Quantum 677', '', 1990, 113, 0, '9'),
(31, 'Kruger & Matz Destiny KM0505', '', 1999, 113, 0, '10'),
(32, 'Bosch SPS53M88EU', '', 1599, 121, 0, '1'),
(33, 'Hotpoint-Ariston LFF 8M121 CX EU', '', 1399, 121, 0, '2'),
(34, 'Bosch Serie 4 SPS53E18EU', '', 1999, 121, 0, '3'),
(35, 'Bosch SMS50D38EU', '', 1299, 121, 1, '4'),
(36, 'Bosch SMS54M48EU', '', 1549, 121, 0, '5'),
(37, 'Amica ZWM 436 SD', '', 1147, 121, 1, '6'),
(38, 'Candy CDP 5740X', '', 1299, 121, 0, '7'),
(39, 'Amica ZWM 436 WD', '', 1099, 121, 0, '8'),
(40, 'Indesit DSR 57M19 AS EU', '', 1099, 121, 0, '9'),
(41, 'Bosch SMS53L68EU', '', 1699, 121, 0, '10'),
(42, 'Indesit IWSC 51052 C ECO PL', '', 799, 122, 0, '1'),
(43, 'Samsung WF70F5E0W2W', '', 1299, 122, 0, '2'),
(44, 'Amica Navigator AWX612D', '', 999, 122, 1, '3'),
(45, 'Bosch Serie 6 VarioPerfect WLK24260PL', '', 1399, 122, 0, '4'),
(46, 'Indesit Eco Time IWD 61052 C ECO PL', '', 799, 122, 0, '5'),
(47, 'Electrolux EWS1266CI', '', 1549, 122, 0, '6'),
(48, 'Samsung WW60J3283LW', '', 1039, 122, 0, '7'),
(49, 'Bosch Serie 4 Maxx WLG2426KPL', '', 1325, 122, 0, '8'),
(50, 'Samsung WF60F4EFW2W', '', 1300, 122, 1, '9'),
(51, 'Electrolux EWT1266TLW', '', 1349, 122, 0, '10'),
(52, 'Samsung RB31FERNBSS', '', 2249, 123, 0, '1'),
(53, 'Samsung RB29FSRNDSA', '', 1499, 123, 0, '2'),
(54, 'Samsung RB31FDRNDSA', '', 1899, 123, 0, '3'),
(55, 'Amica FK265.3SAA', '', 1049, 123, 0, '4'),
(56, 'Bosch KGN39VL31E', '', 1999, 123, 1, '5'),
(57, 'Haier HRZ- 98AAS', '', 499, 123, 0, '6'),
(58, 'Bosch KGV36KL32', '', 1599, 123, 1, '7'),
(59, 'Samsung RB31FERNDBC', '', 1749, 123, 0, '8'),
(60, 'Samsung RS7528THCSP', '', 3599, 123, 0, '9'),
(61, 'Indesit LI8 FF2 S H', '', 1399, 123, 0, '10'),
(62, 'Lenovo H50-50 i5-4460 8GB 1TB GTX745 2GB W10', '', 2388, 131, 0, '1'),
(63, 'HP 280 G1840 4GB 500GB W8', '', 1099, 131, 0, '2'),
(64, 'Dell Inspiron 3847 i3-4170 4GB 500GB GT705 W8', '', 1799, 131, 0, '3'),
(65, 'HP Pavilion 500 i3-4160 4GB 1TB R7 240 W8.1', '', 1699, 131, 0, '4'),
(66, 'Lenovo ThinkCentre M73 i3-4130 4GB 500GB', '', 999, 131, 0, '5'),
(67, 'Intel Compute Stick BOXSTCK1A32WFCL Z3735F 2G', '', 549, 131, 1, '6'),
(68, 'Lenovo IdeaCentre 300-20ISH i5-6400 8GB 1TB W', '', 2699, 131, 1, '7'),
(69, 'Dell Inspiron 3847 i7-4790 16GB 2TB GT705 2GB', '', 3499, 131, 0, '8'),
(70, 'Lenovo IdeaCentre 300-20ISH i5-6400 8GB 1TB G', '', 2499, 131, 0, '9'),
(71, 'Lenovo IdeaCentre 300-20ISH i7-6700 8GB 1TB W', '', 3399, 131, 0, '10'),
(72, 'ASUS X555LJ-XO182T W10', '', 2199, 132, 0, '1'),
(75, 'Lenovo Z51-70 i5-5200U 8GB 1TB SSHD R9 M375 W', '', 2599, 132, 0, '2'),
(76, 'Lenovo IdeaPad 100 15 N2840 4GB 500GB W10', '', 1199, 132, 0, '3'),
(77, 'HP 15-ba016nw W10', '', 2599, 132, 0, '4'),
(78, 'Dell Inspiron 15 3542 i3-4005 4GB 500GB GT920', '', 1799, 132, 1, '5'),
(79, 'HP 250 G4 i5-6200U 8GB 1TB R5 M330 W10', '', 2099, 132, 0, '6'),
(80, 'Lenovo Miix 300 Z3735F 2GB 32GB W10 + klawiat', '', 799, 132, 0, '7'),
(81, 'Kiano SlimNote 14.1" 3735F 2GB 32GB W10 (biał', '', 799, 132, 0, '8'),
(82, 'Lenovo IdeaPad 300 i3-6100U 4GB 500GB W10 (sr', '', 1599, 132, 1, '9'),
(83, 'Apple Macbook Air 13 i5-5250U 8GB 128GB SSD O', '', 4799, 132, 0, '10'),
(84, 'Samsung S24D300H', '', 549, 133, 0, '1'),
(85, 'BenQ XL2411Z', '', 1199, 133, 0, '2'),
(86, 'LG 22MT44DP', '', 579, 133, 0, '3'),
(87, 'LG 19M38A-B', '', 299, 133, 1, '4'),
(88, 'Samsung T27D390EW', '', 949, 133, 0, '5'),
(89, 'LG 25UM57', '', 871, 133, 0, '6'),
(90, 'Philips 203V5LSB26/10', '', 329, 133, 0, '7'),
(91, 'LG 24M38D-B', '', 499, 133, 0, '8'),
(92, 'Samsung S24E500C Curved', '', 799, 133, 1, '9'),
(93, 'Samsung S22E390HS', '', 499, 133, 0, '10'),
(94, 'Spodnie chinos Skinny fit', '', 99.9, 211, 0, '1'),
(95, 'Spodnie z diagonalu Slim fit', '', 79.9, 211, 0, '2'),
(96, 'Spodnie cargo', '', 129.9, 211, 0, '3'),
(97, 'Jeans Super Skinny fit', '', 79.9, 211, 0, '4'),
(98, 'Spodnie dresowe', '', 79.9, 211, 1, '5'),
(99, 'Spodnie chinos Slim Cropped', '', 129.9, 211, 0, '6'),
(100, 'Joggersy', '', 79.9, 211, 0, '7'),
(101, 'Spodnie z bawełny premium', '', 149.9, 211, 0, '8'),
(102, 'Spodnie z domieszką lnu', '', 129.9, 211, 0, '9'),
(103, 'Joggersy Slim Low', '', 139.9, 211, 1, '10'),
(104, 'Stretch T-shirt', '', 29.9, 212, 0, '1'),
(105, 'Cotton T-shirt', '', 49.9, 212, 0, '2'),
(106, 'T-shirt with a chest pocket', '', 39.9, 212, 1, '3'),
(107, 'Long T-shirt', '', 29.9, 212, 0, '4'),
(108, 'Ribbed vest top', '', 39.9, 212, 0, '5'),
(109, 'Basic T-shirt', '', 19.9, 212, 1, '6'),
(110, 'V-neck T-shirt', '', 19.9, 212, 0, '7'),
(111, 'Vest top', '', 19.9, 212, 0, '8'),
(112, 'Jersey Henley shirt', '', 59.9, 212, 0, '9'),
(113, 'Koszulka Henley z dżerseju', '', 59.9, 212, 0, '10'),
(114, 'Bluza', '', 79.9, 213, 0, '1'),
(115, 'Bluza Trashed', '', 99.9, 213, 1, '2'),
(116, 'Bluza z kapturem', '', 79.9, 213, 0, '3'),
(117, 'Bluza dresowa', '', 129.9, 213, 0, '4'),
(118, 'Dżersejowa bluza z kapturem', '', 79.9, 213, 0, '5'),
(119, 'Rozpinana bluza z kapturem', '', 79.9, 213, 0, '6'),
(120, 'Biała bluza', '', 39.9, 213, 1, '7'),
(121, 'Czarna bluza', '', 39.9, 213, 0, '8'),
(122, 'Bluza w żurawie', '', 99.9, 213, 0, '9'),
(123, 'Bluza z nadrukiem', '', 79.9, 213, 0, '10'),
(124, 'Pencil skirt', '', 69.9, 221, 0, '1'),
(125, 'Short pencil skirt', '', 79.9, 221, 0, '2'),
(126, 'A-line skirt', '', 79.9, 221, 0, '3'),
(127, 'A-line skirt red', '', 79.9, 221, 1, '4'),
(128, 'A-line skirt pink', '', 79.9, 221, 0, '5'),
(129, 'Patterned skirt', '', 139.9, 221, 0, '6'),
(130, 'Chiffon skirt with lace', '', 139.9, 221, 0, '7'),
(131, 'Circular skirt', '', 59.9, 221, 0, '8'),
(132, 'Denim skirt', '', 99.9, 221, 1, '9'),
(133, 'Textured skirt', '', 79.9, 221, 0, '10'),
(134, 'Bluzka z dekoltem w serek', '', 79.9, 222, 0, '1'),
(135, 'Koszula elastyczna', '', 59.9, 222, 1, '2'),
(136, 'Bluzka z wiązaniem', '', 99.9, 222, 1, '3'),
(137, 'Bluzka z wiązaniem bez rękawów', '', 79.9, 222, 0, '4'),
(138, 'Koszula stretch', '', 59.9, 222, 0, '5'),
(139, 'Koszula z wiskozy', '', 59.9, 222, 0, '6'),
(140, 'Długa koszula', '', 79.9, 222, 0, '7'),
(141, 'Długa koszula bawełniana', '', 99.9, 222, 0, '8'),
(142, 'Długa koszula bawełniana', '', 129.9, 222, 0, '9'),
(143, 'Jedwabna bluzka', '', 229.9, 222, 0, '10'),
(144, 'Spodnie superstretch', '', 79.9, 223, 0, '1'),
(145, 'Spodnie superstretch red', '', 79.9, 223, 0, '2'),
(146, 'Spodnie High waist', '', 99.9, 223, 1, '3'),
(147, 'Legginsy z dżerseju', '', 39.9, 223, 0, '4'),
(148, 'Spodnie High waist', '', 99.9, 223, 0, '5'),
(149, 'Elastyczne spodnie', '', 79.9, 223, 0, '6'),
(150, 'Spodnie cygaretki', '', 59.9, 223, 0, '7'),
(151, 'Spodnie garniturowe', '', 79.9, 223, 0, '8'),
(152, 'Spodnie chinos', '', 99.9, 223, 0, '9'),
(153, 'Joggersy', '', 79.9, 223, 1, '10'),
(154, 'Joggersy czarne', '', 24.9, 231, 0, '1'),
(155, 'Joggersy różowe', '', 9.9, 231, 1, '2'),
(156, 'Legginsy ze stopkami 2-pak', '', 39.9, 231, 0, '3'),
(157, 'Spodnie z dzianiny', '', 59.9, 231, 0, '4'),
(158, 'Cienkie spodnie', '', 59.9, 231, 0, '5'),
(159, 'Spodnie w strukturalny splot', '', 59.9, 231, 0, '6'),
(160, 'Legginsy o splocie w prążki', '', 39.9, 231, 1, '7'),
(161, 'Bawełniane spodnie z podszewką', '', 49.9, 231, 0, '8'),
(162, 'Spodnie bez zapięcia', '', 39.9, 231, 0, '9'),
(163, 'Spodnie sztruksowe', '', 59.9, 231, 0, '10'),
(164, 'Body z długim rękawem 2-pak', '', 34.9, 232, 0, '1'),
(165, 'Bluza z nadrukiem', '', 39.9, 232, 0, '2'),
(166, 'Kopertowe body 2-pak', '', 39.9, 232, 1, '3'),
(167, 'Kombinezon pluszowy', '', 79.9, 232, 0, '4'),
(168, 'Wzorzysty kombinezon', '', 29.9, 232, 0, '5'),
(169, 'Kardigan w strukturalny splot', '', 79.9, 232, 0, '6'),
(170, 'Cienki sweter', '', 79.9, 232, 1, '7'),
(171, 'Kombinezon dresowy', '', 69.9, 232, 0, '8'),
(172, 'Bawełniany kardigan', '', 79.9, 232, 0, '9'),
(173, 'Sweter o splocie ryżowym', '', 59.9, 232, 0, '10'),
(174, 'Kapcie z ciepłą wyściółką', '', 39.9, 233, 0, '1'),
(175, 'Kapcie z ciepłą wyściółką różowe', '', 9.9, 233, 0, '2'),
(176, 'Wzorzyste kalosze', '', 79.9, 233, 1, '3'),
(177, 'Kapcie z ciepłą wyściółką szare', '', 39.9, 233, 0, '4'),
(178, 'Kalosze w paski', '', 79.9, 233, 0, '5'),
(179, 'Czerwone kapcie', '', 39.9, 233, 0, '6'),
(180, 'Botki z ciepłą wyściółką', '', 69.9, 233, 0, '7'),
(181, 'Miękkie kapcie', '', 39.9, 233, 1, '8'),
(182, 'Sztyblety', '', 59.9, 233, 0, '9'),
(183, 'Botki z suwakiem', '', 99.9, 233, 0, '10'),
(184, 'Łóżko PARIS 160', '', 949, 311, 0, '1'),
(185, 'Łóżko JULIETTA JLTL162', '', 499, 311, 0, '2'),
(186, 'Łóżko TIZIANO TZML160', '', 899, 311, 0, '3'),
(187, 'Łóżko i szafki nocne RONDINO RDNL161B', '', 1799, 311, 0, '4'),
(188, 'Łóżko MADRAS typ 92', '', 999, 311, 0, '5'),
(189, 'Łóżko LINATE typ 91', '', 799, 311, 0, '6'),
(190, 'Łóżko LINATE typ 92', '', 869, 311, 0, '7'),
(191, 'Łóżko LINATE typ 94', '', 1849, 311, 0, '8'),
(192, 'Łóżko SIENA 51 z oświetleniem i pojemnikiem', '', 1299, 311, 0, '9'),
(193, 'Łóżko LACE LCXL091', '', 599, 311, 0, '10'),
(194, 'Ławostół AVERSA', '', 1329, 312, 0, '1'),
(195, 'Stół rozkładany ETNO NEW ', '', 1499, 312, 0, '2'),
(196, 'Stół rozkładany GRAND', '', 880, 312, 0, '3'),
(197, 'Stół rozkładany KASHMIR', '', 459, 312, 1, '4'),
(198, 'Stół rozkładany MADRAS typ 76', '', 598, 312, 0, '5'),
(199, 'Stół rozkładany OPAL 1', '', 399, 312, 0, '6'),
(200, 'Krzesło ALEX', '', 189, 312, 0, '7'),
(201, 'Krzesło AMON', '', 179, 312, 0, '8'),
(202, 'Krzesło COLORADO', '', 299, 312, 0, '9'),
(203, 'Krzesło 2049-3', '', 229, 312, 0, '10'),
(204, 'Sofa ALMA 3 osobowa, rozkładana', '', 1199, 313, 0, '1'),
(205, 'Wersalka AZALIA', '', 999, 313, 0, '2'),
(206, 'Sofa ROYAL 3 osobowa, rozkładana', '', 1849, 313, 0, '3'),
(207, 'Sofa LIVE 3 osobowa, rozkładana', '', 1249, 313, 0, '4'),
(208, 'Sofa BRISTOL 3 osobowa, rozkładana', '', 3029, 313, 0, '5'),
(209, 'Sofa BRAVO 3 osobowa, rozkładana', '', 1299, 313, 0, '6'),
(210, 'Sofa TOLEDO 3 osobowa, rozkładana', '', 1200, 313, 1, '7'),
(211, 'Sofa VERA 3 osobowa, rozkładana', '', 1200, 313, 1, '8'),
(212, 'Sofa LIVE 3 osobowa, rozkładana', '', 1249, 313, 0, '9'),
(213, 'Sofa TRENDY 3 osobowa, rozkładana', '', 1359, 313, 0, '10'),
(214, 'Drzwi zewnętrzne stalowe pełne apollo 80 winc', '', 698, 321, 0, '1'),
(215, 'Drzwi zewnętrzne stalowe basic 90 orzech', '', 698, 321, 0, '2'),
(216, 'Drzwi wejściowe stalowe jowisz auriga slim 90', '', 1298, 321, 0, '3'),
(217, 'Drzwi zewnętrzne stalowe nata 80 złoty dąb', '', 499, 321, 0, '4'),
(218, 'Drzwi wejściowe alderan lux 80 orzech north', '', 898, 321, 1, '5'),
(219, 'Drzwi stalowe jowisz gładki 80 orzech', '', 748, 321, 1, '6'),
(220, 'Drzwi zewnętrzne stalowe splendoor onyks 80 a', '', 1398, 321, 0, '7'),
(221, 'Drzwi stalowe jowisz gładki 80 złoty dąb', '', 748, 321, 0, '8'),
(222, 'Drzwi zewnętrzne stalowe splendoor gaja 90 or', '', 1498, 321, 0, '9'),
(223, 'Drzwi zewnętrzne stalowe pełne apollo 90 winc', '', 998, 321, 0, '10'),
(224, 'Farba dulux fresh white 10 l', '', 49, 322, 0, '1'),
(225, 'Farba lateksowa beckers vaggfarg biała 10 l', '', 146, 322, 0, '2'),
(226, 'Farba wewnętrzna primacol classica biała 10 l', '', 29.98, 322, 1, '3'),
(227, 'Farba lateksowa tikkurila super white 10 l', '', 79.98, 322, 1, '4'),
(228, 'Farba jedynka śnieżnobiała 10 l', '', 42, 322, 0, '5'),
(229, 'Farba dekoral ściany i sufity śnieżnobiała 10', '', 49, 322, 0, '6'),
(230, 'Farba dekoral akrylit w śnieżnobiały 10 l', '', 74, 322, 0, '7'),
(231, 'Farba lateksowa akryl w biała 10 l', '', 68, 322, 0, '8'),
(232, 'Farba bondex super wall 10 l', '', 112, 322, 0, '9'),
(233, 'Farba dulux total white 10 l', '', 89.94, 322, 0, '10'),
(234, 'Stopnica volter 30 x 30 cm beżowa', '', 6, 323, 0, '1'),
(235, 'Stopnica prosta algo 30 x 30 cm brązowa', '', 4, 323, 0, '2'),
(236, 'Stopnica francesco 2 33,3 x 33,3 cm', '', 8, 323, 0, '3'),
(237, 'Gres szkliwiony impuls 33 x 33 cm beżowy 1,41', '', 39, 323, 0, '4'),
(238, 'Stopnica prosta paradyż aquarius brown 30 x 3', '', 7, 323, 0, '5'),
(239, 'Gres foresta bronzo 15 x 60 cm 0,9 m2', '', 48, 323, 1, '6'),
(240, 'Gres polerowany ceramstic 60 x 60 cm biały 1,', '', 67, 323, 0, '7'),
(241, 'Gres impregnowany kwadro pulsar 30 x 30 cm gr', '', 39, 323, 0, '8'),
(242, 'Stopnica rosa 30 x 30 cm', '', 6, 323, 0, '9'),
(243, 'Stopnica klinkierowa prosta paradyż semir 30 ', '', 6, 323, 0, '10'),
(244, 'Grill gazowy blooma camden 81,5 x 43 cm', '', 2496, 331, 0, '1'),
(245, 'Grill betonowy rondo 58 x 40 cm', '', 1498, 331, 0, '2'),
(246, 'Grill gazowy blooma barker 4-palnikowy', '', 998, 331, 0, '3'),
(247, 'Grill betonowy minorca 68 x 40 cm', '', 798, 331, 0, '4'),
(248, 'Grill węglowy blooma kinley z wózkiem fi 57 c', '', 798, 331, 0, '5'),
(249, 'Grill betonowy oslo 70 x 38 cm', '', 856, 331, 1, '6'),
(250, 'Grill gazowy blooma ultar 4-palnikowy', '', 929, 331, 0, '7'),
(251, 'Grill ogrodowy pantelleria', '', 667, 331, 0, '8'),
(252, 'Grill blooma plancha dwupalnikowy 57 x 38 cm', '', 598, 331, 1, '9'),
(253, 'Grill blooma plancha jednopalnikowy 41,5 x 38', '', 498, 331, 0, '10'),
(254, 'Pilarka stołowa do drewna macallister jednofa', '', 848, 332, 0, '1'),
(255, 'Przecinarka do metalu metabo 2300 w', '', 778, 332, 0, '2'),
(256, 'Wiertarka stołowa macallister 700 w', '', 748, 332, 0, '3'),
(257, 'Pilarka ukosowa macallister 1800 w 245 mm', '', 748, 332, 0, '4'),
(258, 'Przecinarka do płytek macallister mstc800d 80', '', 718, 332, 1, '5'),
(259, 'Pilarka stołowa do drewna macallister 1500 w', '', 598, 332, 0, '6'),
(260, 'Pilarka kapówka metabo ks 216m 1350 w', '', 548, 332, 0, '7'),
(261, 'Szlifierka taśmowo-tarczowa dedra 375 w', '', 518, 332, 0, '8'),
(262, 'Wiertarka stołowa macallister 500 w', '', 448, 332, 1, '9'),
(263, 'Pilarka ukosowa macallister 1500 w 210 mm', '', 448, 332, 0, '10'),
(264, 'Iglaki szczepione mix C3 Pa 80 - 110 cm', '', 88.74, 333, 1, '1'),
(265, 'Magnolia C12 wys. 160 - 180 cm', '', 98.74, 333, 0, '2'),
(266, 'Rhododendron wielkokwiatowy C10', '', 89.74, 333, 1, '3'),
(267, 'Magnolia różne odmiany 120 - 140 cm 7,5L', '', 76.74, 333, 0, '4'),
(268, 'Iglaki szczepione mix C5 60 - 80 cm', '', 74.74, 333, 0, '5'),
(269, 'Iglaki kule wys. 60 cm', '', 67.74, 333, 0, '6'),
(270, 'Róża pnąca C5 120 cm', '', 54.74, 333, 0, '7'),
(271, 'Magnolia mix doniczka 23 cm', '', 46.74, 333, 0, '8'),
(272, 'Klon palmowy (Acer palmatum) mix C3', '', 44.74, 333, 0, '9'),
(273, 'Magnolia mix 70-120 cm C5', '', 41.74, 333, 0, '10'),
(274, 'Gryf Hektor 132 cm lekko łamany', '', 159.99, 411, 0, '1'),
(275, 'Gryf Hektor 140 cm prosty', '', 149.99, 411, 0, '2'),
(276, 'Talerz Hektor 10kg', '', 129.99, 411, 0, '3'),
(277, 'Talerz Hektor 2.5kg', '', 29.99, 411, 0, '4'),
(278, 'Talerz Hektor 20kg', '', 199.99, 411, 0, '5'),
(279, 'Hantle Hektor 5kg', '', 89.99, 411, 1, '6'),
(280, 'Hantle Hektor 10kg', '', 129.99, 411, 0, '7'),
(281, 'Hantle Energetics 182826', '', 129.99, 411, 0, '8'),
(282, 'Zestaw hantli winylowych Allright', '', 67.99, 411, 1, '9'),
(283, 'Hantla Kettle Allright 20 kg', '', 194.99, 411, 0, '10'),
(284, 'Rower mechaniczny Sapphire Vintage (czarny)', '', 249, 412, 1, '1'),
(285, 'Bieżnia elektryczna HS-640A Hop Sport', '', 1598, 412, 1, '2'),
(286, 'Rower magnetyczny Falcon Sapphire (czarny)', '', 519, 412, 0, '3'),
(287, 'Bieżnia elektryczna Sapphire Jazz SG-2100T', '', 2199, 412, 0, '4'),
(288, 'Wioślarz magnetyczny York R210 Perform', '', 1249, 412, 0, '5'),
(289, 'Orbitrek magnetyczny Sapphire Eagle (czarny)', '', 639, 412, 0, '6'),
(290, 'Orbitrek magnetyczny HMS H9249', '', 895, 412, 0, '7'),
(291, 'Bieżnia elektryczna BT-3133M Body Sculpture', '', 1399, 412, 0, '8'),
(292, 'Rower magnetyczny Shape Axer (zielony)', '', 449, 412, 0, '9'),
(293, 'Wioślarz Body Sculpture BR 3010', '', 560, 412, 0, '10'),
(294, 'Bidon Isostar Finisher 650ml 673 złoty', '', 7.9, 413, 0, '1'),
(295, 'Bidon Outhorn 650 ml COL16-SSW600 niebieski', '', 15.9, 413, 0, '2'),
(296, 'Bidon Meteor 770 ml biały 24254', '', 7.9, 413, 1, '3'),
(297, 'Drabinka do treningu RONNAY 8m', '', 95.9, 413, 0, '4'),
(298, 'Drabinka do treningu RONNAY 4m', '', 64.9, 413, 0, '5'),
(299, 'Ręcznik Aqua-Speed Dry Flat 50 x 100 cm', '', 25.9, 413, 1, '6'),
(300, 'Ręcznik Mission Enduracool Microfibra 107101I', '', 39.9, 413, 0, '7'),
(301, 'Ręcznik Mission Enduracool Microfibra 107100I', '', 59.9, 413, 0, '8'),
(302, 'Ręcznik Wilson Sport Towel WRZ540100', '', 69.9, 413, 0, '9'),
(303, 'Ręcznik bramkarski REUSCH Goalkeeper Match To', '', 21.9, 413, 0, '10'),
(304, 'Rower Genesis Element X-10', '', 1199, 421, 0, '1'),
(305, 'Rower Genesis Impact 3.0 29', '', 1799, 421, 0, '2'),
(306, 'Rower Genesis Impact 4.0 29', '', 1999, 421, 0, '3'),
(307, 'Rower Genesis Solution 2.5', '', 1799, 421, 0, '4'),
(308, 'Rower Genesis Solution 4.0 27,5', '', 1999, 421, 0, '5'),
(309, 'Rower Giant ATX 27,5 2', '', 1599, 421, 0, '6'),
(310, 'Rower Giant Revel 26', '', 1399, 421, 0, '7'),
(311, 'Rower Giant Revel', '', 1399, 421, 1, '8'),
(312, 'Rower Giant Stance 27,5', '', 4999, 421, 1, '9'),
(313, 'Rower Giant Trance 3 27,5', '', 6599, 421, 0, '10'),
(314, 'Rower Giant Anyroad 2', '', 3999, 422, 0, '1'),
(315, 'Rower Giant Defy 2 Disc', '', 3599, 422, 0, '2'),
(316, 'Rower Giant Defy 3', '', 2799, 422, 0, '3'),
(317, 'Rower Giant Defy 5', '', 2299, 422, 0, '4'),
(318, 'Rower Orbea Avant H40', '', 3899, 422, 0, '5'),
(319, 'Rower Orbea Avant M80', '', 5499, 422, 1, '6'),
(320, 'CHARISMA 55', '', 6499, 422, 0, '7'),
(321, 'AURA 55', '', 4599, 422, 0, '8'),
(322, 'AURA 44', '', 3499, 422, 1, '9'),
(323, 'AURA 33', '', 2699, 422, 0, '10'),
(324, 'BIG BOSS', '', 349, 423, 0, '1'),
(325, 'LILLY', '', 409, 423, 0, '2'),
(326, 'PUZZEL', '', 465, 423, 0, '3'),
(327, 'BILLY', '', 389, 423, 0, '4'),
(328, 'SANDY', '', 465, 423, 0, '5'),
(329, 'JUNA 18-Biegowy', '', 999, 423, 1, '6'),
(330, 'BILLY blue', '', 415, 423, 0, '7'),
(331, 'EDDIE', '', 389, 423, 0, '8'),
(332, 'MONSTER', '', 465, 423, 1, '9'),
(333, 'MUNA 18-Biegowy', '', 1299, 423, 0, '10'),
(334, 'Piłka do koszykówki NBA Gameball Official 7 S', '', 599, 431, 0, '1'),
(335, 'Pompka do piłki Spokey Pampero 12 ', '', 12.99, 431, 0, '2'),
(336, 'Obręcz do koszykówki z rurki 20 mm wraz z sia', '', 69, 431, 0, '3'),
(337, 'Piłka do koszykówki NBA Silver Outdoor Spaldi', '', 99, 431, 0, '4'),
(338, 'Piłka do koszykówki NBA Platinum 7 Streetball', '', 109, 431, 0, '5'),
(339, 'Piłka do koszykówki Tack Soft Pro 5 Spalding', '', 189, 431, 1, '6'),
(340, 'Obręcz do koszykówki uchylna Spokey Korb', '', 89, 431, 0, '7'),
(341, 'Mała tablica do koszykówki Slam Jam Board Spa', '', 179, 431, 0, '8'),
(342, 'Rękaw do koszykówki Mueller', '', 59, 431, 1, '9'),
(343, 'Stojak do koszykówki Lifetime Boston ', '', 1199, 431, 0, '10'),
(344, 'Piłka nożna Euro 2016 Beau Jeu Top Glider 4 A', '', 53.9, 432, 0, '1'),
(345, 'Bramka do piłki nożnej A2485 Axer', '', 85, 432, 0, '2'),
(346, 'Bramka do piłki nożnej z ekranem do celowania', '', 165, 432, 0, '3'),
(347, 'Bramka do piłki nożnej Axer A0132', '', 95, 432, 0, '4'),
(348, 'Bramka do piłki nożnej 215cm Sapphire', '', 179, 432, 0, '5'),
(349, 'Rękawice bramkarskie Ace Training Adidas', '', 58, 432, 1, '6'),
(350, 'Piłka nożna Euro 2016 Beau Jeu Top OMB 5 Adid', '', 329.9, 432, 0, '7'),
(351, 'Bramka Quickplay Kickster 3x2m', '', 599, 432, 0, '8'),
(352, 'Ochraniacze piłkarskie Mercurial Lite Nike', '', 69, 432, 1, '9'),
(353, 'Ochraniacze piłkarskie Park Shield Nike', '', 44.9, 432, 0, '10'),
(354, 'Łyżwy Bauer Nexus Pro', '', 279, 433, 0, '1'),
(355, 'Łyżwy Bauer Supreme Elite', '', 259, 433, 0, '2'),
(356, 'Łyżwy K2 Kinetic Ice M', '', 229, 433, 0, '3'),
(357, 'Łyżwy Tempish Montreal', '', 149.99, 433, 0, '4'),
(358, 'Ochraniacze Tecno na łyżwy', '', 25, 433, 0, '5'),
(359, 'Kij CCM EDGE - KID', '', 79, 433, 1, '6'),
(360, 'Kij CCM ULTIMATE EU - SR', '', 79, 433, 0, '7'),
(361, 'Kij VHV OPUS HIGH 3500 (SR)', '', 279, 433, 0, '8'),
(362, 'KIJ DO UNIHOKEJA - TEMPISH ZERO', '', 49, 433, 1, '9'),
(363, 'VHV OPUS BASIC 500 (YTH)', '', 129, 433, 0, '10');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Task`
--

CREATE TABLE IF NOT EXISTS `Task` (
  `idZadanie` int(11) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `idProduct` int(11) NOT NULL,
  `idInterface` int(11) NOT NULL,
  PRIMARY KEY (`idZadanie`),
  KEY `idProduct` (`idProduct`),
  KEY `idInterface` (`idInterface`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `Client_Product`
--
ALTER TABLE `Client_Product`
  ADD CONSTRAINT `Client_Product_ibfk_1` FOREIGN KEY (`idProduct`) REFERENCES `Product` (`idProdukt`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `client` FOREIGN KEY (`idClient`) REFERENCES `Client` (`idClient`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `Client_Task`
--
ALTER TABLE `Client_Task`
  ADD CONSTRAINT `client_client` FOREIGN KEY (`idClient`) REFERENCES `Client` (`idClient`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `task` FOREIGN KEY (`idTask`) REFERENCES `Task` (`idZadanie`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `category` FOREIGN KEY (`idCategory`) REFERENCES `Category` (`idCategory`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `Task`
--
ALTER TABLE `Task`
  ADD CONSTRAINT `interface` FOREIGN KEY (`idInterface`) REFERENCES `Interface` (`idInterface`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `product` FOREIGN KEY (`idProduct`) REFERENCES `Product` (`idProdukt`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
