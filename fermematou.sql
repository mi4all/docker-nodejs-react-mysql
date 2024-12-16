-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 19 nov. 2024 à 05:47
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `fermematou`
--

-- --------------------------------------------------------

--
-- Structure de la table `alimentation`
--

DROP TABLE IF EXISTS `alimentation`;
CREATE TABLE IF NOT EXISTS `alimentation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPoule` int(11) NOT NULL,
  `idRation` int(11) NOT NULL,
  `ration_preleve` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPoule` (`idPoule`,`idRation`),
  KEY `idRation` (`idRation`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `alimentation`
--

INSERT INTO `alimentation` (`id`, `idPoule`, `idRation`, `ration_preleve`) VALUES
(12, 12, 12, 100),
(13, 10, 11, 100),
(15, 11, 11, 100);

-- --------------------------------------------------------

--
-- Structure de la table `caracteristique`
--

DROP TABLE IF EXISTS `caracteristique`;
CREATE TABLE IF NOT EXISTS `caracteristique` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `surface` float NOT NULL,
  `nombreDePoule` int(11) NOT NULL,
  `densite` double NOT NULL,
  `lumiere` varchar(255) NOT NULL,
  `intensite` varchar(255) NOT NULL,
  `temperature` int(11) NOT NULL,
  `humidite` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `caracteristique`
--

INSERT INTO `caracteristique` (`id`, `surface`, `nombreDePoule`, `densite`, `lumiere`, `intensite`, `temperature`, `humidite`) VALUES
(1, 1000, 500, 0.5, '15', '8', 30, 5),
(2, 600, 150, 0.25, '15', '8', 30, 5);

-- --------------------------------------------------------

--
-- Structure de la table `gestionnaire`
--

DROP TABLE IF EXISTS `gestionnaire`;
CREATE TABLE IF NOT EXISTS `gestionnaire` (
  `idGestionnaire` int(11) NOT NULL AUTO_INCREMENT,
  `nomUtilisateur` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `MotDePasse` varchar(150) NOT NULL,
  `isAdmin` int(11) NOT NULL,
  `NomComplet` varchar(150) NOT NULL,
  PRIMARY KEY (`idGestionnaire`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `gestionnaire`
--

INSERT INTO `gestionnaire` (`idGestionnaire`, `nomUtilisateur`, `email`, `MotDePasse`, `isAdmin`, `NomComplet`) VALUES
(1, 'matou', 'a@gmail.com', '1234', 0, 'Nandrianina herve'),
(2, 'Matou', 'a@gmail.com', '$2b$10$E.0WzY2wXUZDw6vmJZkfjuvJvBfcGpmXOvdnCTwa9Tv21rDnC5sIC', 0, 'Nandrianina herve'),
(3, 'LL', 'l@gmail.com', '$2b$10$9DvubfdPavLv2HiGoNsqNue.RHMyvodK8/jh.4K/9xWGLa6EI83/S', 0, 'boumm'),
(5, 'Matou123', 'MK@gmail.com', '$2b$10$AcD7C27xABTVYMCYHQM//uvz4GBdHBSnY273zJRyUMXDZ8tBdfiYm', 0, 'Anjaratiana'),
(6, 'test', 'test@gmail', '$2b$10$vMj32eBdXvk1mfluZ9LY3OieGtIRdWyskUCfNWlSnUTLKxETfRhhK', 1, 'TESTYYY');

-- --------------------------------------------------------

--
-- Structure de la table `maladies`
--

DROP TABLE IF EXISTS `maladies`;
CREATE TABLE IF NOT EXISTS `maladies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_maladies` varchar(255) NOT NULL,
  `symptomes` varchar(255) NOT NULL,
  `traitements` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `maladies`
--

INSERT INTO `maladies` (`id`, `nom_maladies`, `symptomes`, `traitements`) VALUES
(2, 'barikia', 'pointsRouge', 'vitamineB'),
(3, 'tazo', 'manque d\'appetit', 'vaccins');

-- --------------------------------------------------------

--
-- Structure de la table `materiels`
--

DROP TABLE IF EXISTS `materiels`;
CREATE TABLE IF NOT EXISTS `materiels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) NOT NULL,
  `unite` varchar(255) NOT NULL,
  `quantite` int(11) NOT NULL,
  `prixUnitaire` float NOT NULL,
  `montantTotal` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `materiels`
--

INSERT INTO `materiels` (`id`, `designation`, `unite`, `quantite`, `prixUnitaire`, `montantTotal`) VALUES
(4, 'Mangoir', 'm3', 5, 10000, 50000),
(7, 'Chate au d\'eaux', 'm3', 3, 30000, 90000);

-- --------------------------------------------------------

--
-- Structure de la table `mortalite`
--

DROP TABLE IF EXISTS `mortalite`;
CREATE TABLE IF NOT EXISTS `mortalite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPoules` int(11) NOT NULL,
  `NomreMortaliteJour` int(11) NOT NULL,
  `RaisonDeMortalite` varchar(255) NOT NULL,
  `TauxMortalite` double NOT NULL,
  `DatedeLaMort` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPoules` (`idPoules`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `normeration`
--

DROP TABLE IF EXISTS `normeration`;
CREATE TABLE IF NOT EXISTS `normeration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `semaine` varchar(255) NOT NULL,
  `RationMin` int(11) NOT NULL,
  `RationMoy` int(11) NOT NULL,
  `RationMax` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `normeration`
--

INSERT INTO `normeration` (`id`, `semaine`, `RationMin`, `RationMoy`, `RationMax`) VALUES
(1, 'semaine1', 10, 11, 13);

-- --------------------------------------------------------

--
-- Structure de la table `pesage`
--

DROP TABLE IF EXISTS `pesage`;
CREATE TABLE IF NOT EXISTS `pesage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `PoidsPreleve` decimal(10,0) NOT NULL,
  `date_prelevement` date NOT NULL,
  `lot` int(11) NOT NULL,
  `idPoules` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPoules` (`idPoules`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `poule`
--

DROP TABLE IF EXISTS `poule`;
CREATE TABLE IF NOT EXISTS `poule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateAquis` date NOT NULL,
  `categorie` varchar(255) NOT NULL,
  `nombre` int(11) NOT NULL,
  `idSalle` int(11) NOT NULL,
  `DateNow` date NOT NULL,
  `jour` int(11) NOT NULL,
  `Semaine` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idSalle` (`idSalle`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `poule`
--

INSERT INTO `poule` (`id`, `dateAquis`, `categorie`, `nombre`, `idSalle`, `DateNow`, `jour`, `Semaine`) VALUES
(10, '2024-11-17', 'RET-P', 100, 1, '2024-11-21', 5, 0),
(11, '2024-11-19', 'CI-P', 400, 3, '2024-11-21', 3, 0),
(12, '2024-11-18', 'LL-R', 10, 1, '2024-11-21', 4, 1),
(13, '2024-11-19', 'TT-B', 100, 3, '2024-11-21', 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `poulemalade`
--

DROP TABLE IF EXISTS `poulemalade`;
CREATE TABLE IF NOT EXISTS `poulemalade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPoules` int(11) NOT NULL,
  `idMaladie` int(11) NOT NULL,
  `nombre` int(11) NOT NULL,
  `Date_Trouve` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPoules` (`idPoules`,`idMaladie`),
  KEY `idMaladie` (`idMaladie`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `poules`
--

DROP TABLE IF EXISTS `poules`;
CREATE TABLE IF NOT EXISTS `poules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `DateAquisition` date NOT NULL,
  `NombrePoules` int(11) NOT NULL,
  `Semaine` int(11) DEFAULT 0,
  `jour` int(11) DEFAULT 1,
  `categorie` varchar(255) NOT NULL,
  `Consommation` int(11) NOT NULL,
  `idSalles` int(11) DEFAULT NULL,
  `idRation` int(11) NOT NULL,
  `idProgramme` int(11) DEFAULT NULL,
  `DateNow` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idSalles` (`idSalles`,`idRation`,`idProgramme`),
  KEY `idRation` (`idRation`),
  KEY `idProgramme` (`idProgramme`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `prod`
--

DROP TABLE IF EXISTS `prod`;
CREATE TABLE IF NOT EXISTS `prod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idPoule` int(11) NOT NULL,
  `idVaccin` int(11) NOT NULL,
  `dateDernier` date NOT NULL,
  `dateProchain` date NOT NULL,
  `Fait` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPoule` (`idPoule`,`idVaccin`),
  KEY `idVaccin` (`idVaccin`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `prod`
--

INSERT INTO `prod` (`id`, `idPoule`, `idVaccin`, `dateDernier`, `dateProchain`, `Fait`) VALUES
(10, 10, 7, '2024-11-17', '2024-11-25', 1),
(11, 10, 8, '2024-11-17', '2024-11-26', 1),
(12, 11, 7, '2024-11-19', '2024-11-27', 0),
(13, 11, 8, '2024-11-19', '2024-11-28', 0),
(25, 10, 7, '2024-11-25', '2024-12-03', 0),
(26, 10, 8, '2024-11-26', '2024-12-05', 0),
(27, 12, 7, '2024-11-18', '2024-11-26', 0),
(28, 12, 8, '2024-11-18', '2024-11-27', 0),
(29, 13, 7, '2024-11-19', '2024-11-27', 0),
(30, 13, 8, '2024-11-19', '2024-11-28', 1),
(31, 13, 8, '2024-11-28', '2024-12-07', 0);

-- --------------------------------------------------------

--
-- Structure de la table `programme`
--

DROP TABLE IF EXISTS `programme`;
CREATE TABLE IF NOT EXISTS `programme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idtrait` int(11) NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idtrait` (`idtrait`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `rations`
--

DROP TABLE IF EXISTS `rations`;
CREATE TABLE IF NOT EXISTS `rations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `NomRation` varchar(255) NOT NULL,
  `quantite_initial` int(11) NOT NULL,
  `utilise` int(11) DEFAULT 0,
  `quantite_restant` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `rations`
--

INSERT INTO `rations` (`id`, `NomRation`, `quantite_initial`, `utilise`, `quantite_restant`) VALUES
(11, 'demmarage', 10000, 200, 9800),
(12, 'provande', 1000, 100, 900);

-- --------------------------------------------------------

--
-- Structure de la table `salles`
--

DROP TABLE IF EXISTS `salles`;
CREATE TABLE IF NOT EXISTS `salles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `idmat` int(11) NOT NULL,
  `idcaract` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idmat` (`idmat`,`idcaract`),
  KEY `idcaract` (`idcaract`),
  KEY `idmat_2` (`idmat`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `salles`
--

INSERT INTO `salles` (`id`, `nom`, `idmat`, `idcaract`) VALUES
(1, 'Salle01', 7, 1),
(3, 'salle02', 4, 2),
(4, 'Salle3', 7, 2),
(5, 'salle4', 4, 2);

-- --------------------------------------------------------

--
-- Structure de la table `stock`
--

DROP TABLE IF EXISTS `stock`;
CREATE TABLE IF NOT EXISTS `stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Date` date NOT NULL,
  `type` varchar(255) NOT NULL,
  `Quantite` int(11) NOT NULL,
  `PrixUnitaire` decimal(10,0) NOT NULL,
  `idPoule` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPoule` (`idPoule`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `suvie`
--

DROP TABLE IF EXISTS `suvie`;
CREATE TABLE IF NOT EXISTS `suvie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Date` date NOT NULL,
  `idPoule` int(11) NOT NULL,
  `idProd` int(11) NOT NULL,
  `idAlimentation` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPoule` (`idPoule`,`idProd`,`idAlimentation`),
  KEY `idProd` (`idProd`),
  KEY `idAlimentation` (`idAlimentation`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `suvie`
--

INSERT INTO `suvie` (`id`, `Date`, `idPoule`, `idProd`, `idAlimentation`) VALUES
(13, '2024-11-20', 10, 12, 15),
(14, '2024-11-20', 10, 13, 15),
(15, '2024-11-20', 12, 12, 15),
(16, '2024-11-20', 11, 12, 15),
(17, '2024-11-20', 13, 12, 15),
(18, '2024-11-20', 12, 13, 15),
(19, '2024-11-20', 13, 13, 15),
(20, '2024-11-20', 11, 13, 15);

-- --------------------------------------------------------

--
-- Structure de la table `traitement`
--

DROP TABLE IF EXISTS `traitement`;
CREATE TABLE IF NOT EXISTS `traitement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_traitement` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `methode` varchar(255) NOT NULL,
  `frequence` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `traitement`
--

INSERT INTO `traitement` (`id`, `nom_traitement`, `type`, `methode`, `frequence`) VALUES
(7, 'vaccin1', 'vaccin', 'orale', 8),
(8, 'vitamineB', 'vitamine', 'boisson d\'eau', 9);

-- --------------------------------------------------------

--
-- Structure de la table `vente`
--

DROP TABLE IF EXISTS `vente`;
CREATE TABLE IF NOT EXISTS `vente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `DateVente` date NOT NULL,
  `NomClient` varchar(255) NOT NULL,
  `nomProduits` varchar(255) NOT NULL,
  `quantite` int(11) NOT NULL,
  `prixUnitaire` int(11) NOT NULL,
  `prixTotal` int(11) NOT NULL,
  `idStock` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idStock` (`idStock`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `vide_sanitaire`
--

DROP TABLE IF EXISTS `vide_sanitaire`;
CREATE TABLE IF NOT EXISTS `vide_sanitaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idsal` int(11) NOT NULL,
  `nom_employer` varchar(255) NOT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idsal` (`idsal`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vide_sanitaire`
--

INSERT INTO `vide_sanitaire` (`id`, `idsal`, `nom_employer`, `date_debut`, `date_fin`) VALUES
(1, 3, 'bema', '2024-10-23', '2024-10-24'),
(3, 4, 'Andry', '2024-10-27', '2024-10-29');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `alimentation`
--
ALTER TABLE `alimentation`
  ADD CONSTRAINT `alimentation_ibfk_1` FOREIGN KEY (`idPoule`) REFERENCES `poule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `alimentation_ibfk_2` FOREIGN KEY (`idRation`) REFERENCES `rations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `mortalite`
--
ALTER TABLE `mortalite`
  ADD CONSTRAINT `mortalite_ibfk_1` FOREIGN KEY (`idPoules`) REFERENCES `poule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `pesage`
--
ALTER TABLE `pesage`
  ADD CONSTRAINT `pesage_ibfk_1` FOREIGN KEY (`idPoules`) REFERENCES `poule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `poule`
--
ALTER TABLE `poule`
  ADD CONSTRAINT `poule_ibfk_1` FOREIGN KEY (`idSalle`) REFERENCES `salles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `poulemalade`
--
ALTER TABLE `poulemalade`
  ADD CONSTRAINT `poulemalade_ibfk_1` FOREIGN KEY (`idMaladie`) REFERENCES `maladies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `poulemalade_ibfk_2` FOREIGN KEY (`idPoules`) REFERENCES `poule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `prod`
--
ALTER TABLE `prod`
  ADD CONSTRAINT `prod_ibfk_1` FOREIGN KEY (`idPoule`) REFERENCES `poule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prod_ibfk_2` FOREIGN KEY (`idVaccin`) REFERENCES `traitement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `salles`
--
ALTER TABLE `salles`
  ADD CONSTRAINT `salles_ibfk_1` FOREIGN KEY (`idcaract`) REFERENCES `caracteristique` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `salles_ibfk_2` FOREIGN KEY (`idmat`) REFERENCES `materiels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`idPoule`) REFERENCES `poule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `suvie`
--
ALTER TABLE `suvie`
  ADD CONSTRAINT `suvie_ibfk_1` FOREIGN KEY (`idPoule`) REFERENCES `poule` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `suvie_ibfk_2` FOREIGN KEY (`idProd`) REFERENCES `prod` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `suvie_ibfk_3` FOREIGN KEY (`idAlimentation`) REFERENCES `alimentation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `vente`
--
ALTER TABLE `vente`
  ADD CONSTRAINT `vente_ibfk_1` FOREIGN KEY (`idStock`) REFERENCES `stock` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `vide_sanitaire`
--
ALTER TABLE `vide_sanitaire`
  ADD CONSTRAINT `vide_sanitaire_ibfk_1` FOREIGN KEY (`idsal`) REFERENCES `salles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
