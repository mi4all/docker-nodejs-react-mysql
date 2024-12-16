import mysql from 'mysql2/promise'; // Utilisation de mysql2 avec support des promesses
import dotenv from "dotenv";

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST, // Exemple : 'localhost'
  user: process.env.DB_USER, // Exemple : 'root'
  password: process.env.DB_PASSWORD, // Exemple : 'rootpassword'
  database: process.env.DB_NAME, // Exemple : 'fermematou'
  port: parseInt(process.env.DB_PORT || "3306", 10), // Par défaut 3306
});

export default db;
