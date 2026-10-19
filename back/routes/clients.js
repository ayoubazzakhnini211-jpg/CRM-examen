const express = require("express");
const Client = require("../models/Client");
const connectDB = require("../config/db");

const router = express.Router();

// Assure la connexion avant chaque requête (serverless).
router.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(503).json({ erreur: err.message });
  }
});

router.get("/", async (req, res) => {
  res.json(await Client.find().sort({ createdAt: -1 }));
});

router.post("/", async (req, res) => {
  try {
    res.status(201).json(await Client.create(req.body));
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!client) return res.status(404).json({ erreur: "Client introuvable" });
    res.json(client);
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ erreur: "Client introuvable" });
    res.json({ message: "Client supprimé" });
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
});

module.exports = router;
