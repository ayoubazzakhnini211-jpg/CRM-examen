const mongoose = require("mongoose");

let connection = null;

// Connexion réutilisée entre les appels (important en serverless sur Vercel).
async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  const uri = (process.env.MONGODB_URI || "").trim();
  if (!uri) throw new Error("MONGODB_URI manquant (voir back/.env.example)");

  connection = connection || mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  try {
    await connection;
  } catch (err) {
    connection = null;
    throw err;
  }
  return mongoose.connection;
}

module.exports = connectDB;
