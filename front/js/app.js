// Même origine que le backend : URL relative (marche en local et sur Vercel).
const API = "/api/clients";

const form = document.getElementById("client-form");
const statusEl = document.getElementById("status");

async function request(url, options) {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.erreur || "Erreur serveur");
  return data;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await request(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: form.nom.value,
        email: form.email.value,
        telephone: form.telephone.value,
      }),
    });
    form.reset();
    statusEl.textContent = "Client ajouté";
  } catch (err) {
    statusEl.textContent = err.message;
  }
});


// Bonus 3 : appel de GET /api/test et affichage du message dans la page.
async function loadTestMessage() {
  const el = document.getElementById("test-message");
  try {
    const data = await request("/api/test");
    el.textContent = data.message;
  } catch (err) {
    el.textContent = "Erreur : " + err.message;
  }
}

loadTestMessage();
