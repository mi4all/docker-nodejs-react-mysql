import express from "express";
import cors from "cors";
import salleRoutes from "./routes/salleRoute.js"; // Assurez-vous que ce fichier et son contenu sont corrects
import db from "./config/db.conf.js"; // Assurez-vous que ce fichier est correctement configuré
import dotenv from "dotenv";

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const app = express(); // Initialiser 'app'

// Configuration de CORS avec les options dynamiques
const whitelist = [process.env.CLIENT_ORIGIN];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Non autorisé par CORS"));
    }
  },
};
app.use(cors(corsOptions));

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Vérifiez la connexion à la base de données avant de démarrer le serveur
(async () => {
  try {
    await db.getConnection(); // Tentative de connexion à la base de données
    console.log("Connexion à la base de données réussie");

    // Routes
    app.use("/salles", salleRoutes);

    // Port d'écoute (récupéré depuis l'environnement ou valeur par défaut)
    const PORT = process.env.NODE_LOCAL_PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Serveur démarré et en écoute sur le port ${PORT}`)
    );
  } catch (err) {
    console.error("Erreur de connexion à la base de données :", err.message || err);
    process.exit(1); // Arrêter l'application en cas de problème de connexion
  }
})();
