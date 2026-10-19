const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "API CRM OK" });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
}

module.exports = app;
