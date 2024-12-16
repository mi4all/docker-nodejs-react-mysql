import db from "../config/db.conf.js";

// Insérer une nouvelle salle
export const createSalle = async (salleData) => {
  try {
    const [result] = await db.promise().query("INSERT INTO salles SET ?", [salleData]);
    return result.insertId;
  } catch (error) {
    throw new Error("Erreur lors de la création de la salle : " + error.message);
  }
};

// Modifier une salle existante
export const updateSalle = async (id, salleData) => {
  try {
    const [result] = await db.promise().query("UPDATE salles SET ? WHERE id = ?", [salleData, id]);
    return result.affectedRows;
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour de la salle : " + error.message);
  }
};

// Supprimer une salle
export const deleteSalle = async (id) => {
  try {
    const [result] = await db.promise().query("DELETE FROM salles WHERE id = ?", [id]);
    return result.affectedRows;
  } catch (error) {
    throw new Error("Erreur lors de la suppression de la salle : " + error.message);
  }
};

// Récupérer une salle par ID
export const getSalleById = async (id) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT salles.nom, materiels.designation, caracteristique.surface,
              caracteristique.nombreDePoule, caracteristique.densite,
              caracteristique.temperature, caracteristique.humidite
       FROM salles 
       JOIN materiels ON salles.idmat = materiels.id
       JOIN caracteristique ON salles.idcaract = caracteristique.id
       WHERE salles.id = ?`,
      [id]
    );
    return rows[0];
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la salle : " + error.message);
  }
};

// Récupérer toutes les salles
export const getAllSalles = async () => {
  try {
    const [rows] = await db.promise().query(
      `SELECT salles.id, salles.nom, materiels.designation,
              caracteristique.nombreDePoule, salles.idcaract, salles.idmat
       FROM salles
       JOIN materiels ON salles.idmat = materiels.id
       JOIN caracteristique ON salles.idcaract = caracteristique.id`
    );
    return rows;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des salles : " + error.message);
  }
};

// Récupérer les noms des salles
export const getSalleNames = async () => {
  try {
    const [rows] = await db.promise().query("SELECT nom, id FROM salles");
    return rows;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des noms des salles : " + error.message);
  }
};
