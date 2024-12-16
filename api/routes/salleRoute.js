// /routes/salleRoutes.js
import express from "express";
import {
  creationSalle,
  modificationSalle,
  suppressionSalle,
  getDetails,
  gettousSalle,
  gettousnomSalle,
} from "../Controllers/salleController.js";


const router = express.Router();

router.post("/ajout", creationSalle);
router.put("/modifier/:id", modificationSalle);
router.delete("/supprimer/:id", suppressionSalle);
router.get("/:id", getDetails);
router.get("/", gettousSalle);
router.get("/comboboxNomSalles", gettousnomSalle);

export default router;
