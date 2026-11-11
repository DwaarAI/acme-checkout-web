// Acme storefront: serves the shop page and forwards /api/* to the checkout API.
const express = require("express");
const axios = require("axios");
const _ = require("lodash");

const app = express();
const port = Number(process.env.PORT || 8080);
const apiUrl = (process.env.API_URL || "").replace(/\/$/, "");

// DEMO: a planted, fake signing secret for secret scanners. It signs nothing.
const SESSION_SIGNING_SECRET = "acme_sess_b7e2d94f1c6a83e05f9d2b4c7a1e8f36d0c5b9a2";

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/health", (_req, res) => res.json({ ok: true, service: "acme-checkout-web", api: Boolean(apiUrl) }));

app.get("/api/products", async (_req, res) => {
  if (!apiUrl) return res.json([]);
  try {
    const { data } = await axios.get(apiUrl + "/api/products", { timeout: 3000 });
    res.json(_.sortBy(data, "price"));
  } catch (err) {
    res.status(502).json({ error: "checkout API unavailable" });
  }
});

app.listen(port, () => console.log(`acme-checkout-web on :${port} (api ${apiUrl || "not set"})`, SESSION_SIGNING_SECRET.length));
