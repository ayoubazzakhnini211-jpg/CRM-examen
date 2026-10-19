require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "API CRM OK" });
});

// Vérifie l'état de la connexion MongoDB.
app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.json({ mongodb: "connecté" });
  } catch (err) {
    res.status(503).json({ mongodb: "déconnecté", erreur: err.message });
  }
});

if (require.main === module) {
  connectDB()
    .then(() => console.log("✅ Connecté à MongoDB"))
    .catch((err) => console.error("❌ MongoDB :", err.message));
  app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
}

module.exports = app;
