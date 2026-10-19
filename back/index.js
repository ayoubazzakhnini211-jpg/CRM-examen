require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const clientsRouter = require("./routes/clients");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "API CRM OK" });
});

app.use("/api/clients", clientsRouter);

// Vérifie l'état de la connexion MongoDB.
app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.json({ mongodb: "connecté" });
  } catch (err) {
    res.status(503).json({ mongodb: "déconnecté", erreur: err.message });
  }
});

// Sert le frontend (même origine que l'API).
app.use(express.static(path.join(__dirname, "..", "front")));

if (require.main === module) {
  connectDB()
    .then(() => console.log("✅ Connecté à MongoDB"))
    .catch((err) => console.error("❌ MongoDB :", err.message));
  app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
}

module.exports = app;
