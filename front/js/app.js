// Bonus 3 : appel de GET /api/test et affichage du message dans la page.
async function loadTestMessage() {
  const el = document.getElementById("test-message");
  try {
    const res = await fetch("/api/test");
    const data = await res.json();
    el.textContent = data.message;
  } catch (err) {
    el.textContent = "Erreur : " + err.message;
  }
}

loadTestMessage();
