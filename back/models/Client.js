const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    telephone: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Client || mongoose.model("Client", clientSchema);
