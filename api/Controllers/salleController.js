import {
  createSalle,
  updateSalle,
  deleteSalle,
  getSalleById,
  getAllSalles,
  getSalleNames,
} from "../models/salleModel.js";

export const creationSalle = async (req, res) => {
  try {
    const { nom, idcaract, idmat } = req.body;
    if (!nom || !idcaract || !idmat) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }
    const salleId = await createSalle({ nom, idcaract, idmat });
    res.status(200).json({ message: "Nouvelle salle créée", id: salleId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la salle" });
  }
};

export const modificationSalle = async (req, res) => {
  try {
    const salleId = req.params.id;
    const { nom, idcaract, idmat } = req.body;
    if (!nom || !idcaract || !idmat) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }
    const affectedRows = await updateSalle(salleId, { nom, idcaract, idmat });
    if (!affectedRows) {
      return res.status(404).json({ message: "Salle introuvable" });
    }
    res.status(200).json({ message: "Salle modifiée", id: salleId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la modification" });
  }
};

export const suppressionSalle = async (req, res) => {
  try {
    const salleId = req.params.id;
    const affectedRows = await deleteSalle(salleId);
    if (!affectedRows) {
      return res.status(404).json({ message: "Salle introuvable" });
    }
    res.status(200).json({ message: "Salle supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

export const getDetails = async (req, res) => {
  try {
    const salleId = req.params.id;
    const salle = await getSalleById(salleId);
    if (!salle) {
      return res.status(404).json({ message: "Salle introuvable" });
    }
    res.status(200).json(salle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};

export const gettousSalle = async (req, res) => {
  try {
    const salles = await getAllSalles();
    res.status(200).json(salles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};

export const gettousnomSalle = async (req, res) => {
  try {
    const noms = await getSalleNames();
    res.status(200).json(noms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};
