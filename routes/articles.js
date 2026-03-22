var express = require("express");
var router  = express.Router();
var ctrl    = require("../controllers/articleController");

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Gestion des articles du blog
 */

/* ══════════════════════════════════════════════════════════
   ATTENTION : /search doit absolument etre declare AVANT /:id
   Sinon Express interprete le mot "search" comme un ID MongoDB
══════════════════════════════════════════════════════════ */

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles par mot-cle (titre ou contenu)
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Texte a rechercher dans le titre ou le contenu
 *         example: Node.js
 *     responses:
 *       200:
 *         description: Articles correspondants
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccesList'
 *       400:
 *         description: Parametre query manquant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.get("/search", ctrl.rechercherArticles);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Creer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleInput'
 *           example:
 *             titre: "Introduction au Web"
 *             contenu: "Le web repose sur HTML, CSS et JavaScript."
 *             auteur: "Charles"
 *             date: "2026-03-22"
 *             categorie: "Technologie"
 *             tags: ["web", "html", "css"]
 *     responses:
 *       201:
 *         description: Article cree avec succes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccesCreate'
 *       400:
 *         description: Champ obligatoire manquant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.post("/", ctrl.creerArticle);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Lister tous les articles (avec filtres optionnels)
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *         description: Filtrer par categorie
 *         example: Technologie
 *       - in: query
 *         name: auteur
 *         schema:
 *           type: string
 *         description: Filtrer par auteur
 *         example: Charles
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: "Filtrer par date (format YYYY-MM-DD)"
 *         example: "2026-03-22"
 *     responses:
 *       200:
 *         description: Liste des articles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccesList'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.get("/", ctrl.listerArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Lire un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID MongoDB de l article
 *         example: "65f1a2b3c4d5e6f7a8b9c0d1"
 *     responses:
 *       200:
 *         description: Article trouve
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: ID invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       404:
 *         description: Article non trouve
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.get("/:id", ctrl.lireArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article existant
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID MongoDB de l article
 *         example: "65f1a2b3c4d5e6f7a8b9c0d1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleUpdate'
 *           example:
 *             titre: "Titre mis a jour"
 *             categorie: "Developpement"
 *     responses:
 *       200:
 *         description: Article mis a jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccesUpdate'
 *       400:
 *         description: ID invalide ou aucun champ fourni
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       404:
 *         description: Article non trouve
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.put("/:id", ctrl.modifierArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID MongoDB de l article
 *         example: "65f1a2b3c4d5e6f7a8b9c0d1"
 *     responses:
 *       200:
 *         description: Article supprime avec succes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccesDelete'
 *       400:
 *         description: ID invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       404:
 *         description: Article non trouve
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.delete("/:id", ctrl.supprimerArticle);

module.exports = router;
