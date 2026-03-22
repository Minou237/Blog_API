require("dotenv").config();

var express     = require("express");
var cors        = require("cors");
var path        = require("path");
var swaggerUi   = require("swagger-ui-express");
var connectDB   = require("./config/db");
var swaggerSpec = require("./config/swagger");

var app  = express();
var PORT = process.env.PORT || 3000;

/* ─── 1. Connexion base de donnees ─────────────────────── */
connectDB();

/* ─── 2. Middlewares ────────────────────────────────────── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

/* ─── 3. Documentation Swagger ──────────────────────────── */
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Blog API INF222",
    swaggerOptions: { persistAuthorization: true }
  })
);

/* ─── 4. Routes API ─────────────────────────────────────── */
app.use("/api/articles", require("./routes/articles"));

/* ─── 5. Accueil : interface web ────────────────────────── */
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ─── 6. Route introuvable (404) ────────────────────────── */
app.use(function (req, res) {
  res.status(404).json({ erreur: "Route non trouvee." });
});

/* ─── 7. Demarrage du serveur ───────────────────────────── */
app.listen(PORT, function () {
  console.log("");
  console.log("  Blog API INF222 - Serveur demarre");
  console.log("  ─────────────────────────────────────────");
  console.log("  Interface web  →  http://localhost:" + PORT);
  console.log("  Swagger UI     →  http://localhost:" + PORT + "/api-docs");
  console.log("  API Base URL   →  http://localhost:" + PORT + "/api/articles");
  console.log("  ─────────────────────────────────────────");
  console.log("");
});
