const Article = require("../models/Article");

/* Verifie qu un ID est un nombre entier positif */
function idValide(id) {
  var n = Number(id);
  return Number.isInteger(n) && n > 0;
}

/* Gestion d erreur uniforme */
function gererErreur(res, err) {
  if (err.name === "ValidationError") {
    var messages = Object.values(err.errors).map(function (e) {
      return e.message;
    });
    return res.status(400).json({ erreur: messages.join(" | ") });
  }
  return res.status(500).json({ erreur: "Erreur serveur : " + err.message });
}

/* ════════════════════════════════════════════════════════
   POST /api/articles  →  Creer un article
════════════════════════════════════════════════════════ */
var creerArticle = async function (req, res) {
  try {
    var article = new Article({
      titre:     req.body.titre,
      contenu:   req.body.contenu,
      auteur:    req.body.auteur,
      date:      req.body.date,
      categorie: req.body.categorie,
      tags:      req.body.tags
    });
    await article.save();  // le pre("save") assigne l ID automatiquement

    return res.status(201).json({
      message: "Article cree avec succes.",
      id:      article._id,
      article: article
    });
  } catch (err) {
    return gererErreur(res, err);
  }
};

/* ════════════════════════════════════════════════════════
   GET /api/articles  →  Lister / filtrer
   ?categorie=X  &auteur=Y  &date=YYYY-MM-DD
════════════════════════════════════════════════════════ */
var listerArticles = async function (req, res) {
  try {
    var filtre = {};

    if (req.query.categorie) {
      filtre.categorie = { $regex: req.query.categorie, $options: "i" };
    }
    if (req.query.auteur) {
      filtre.auteur = { $regex: req.query.auteur, $options: "i" };
    }
    if (req.query.date) {
      var debut = new Date(req.query.date);
      var fin   = new Date(req.query.date);
      fin.setDate(fin.getDate() + 1);
      filtre.date = { $gte: debut, $lt: fin };
    }

    var articles = await Article.find(filtre).sort({ _id: -1 });

    return res.status(200).json({
      total:    articles.length,
      articles: articles
    });
  } catch (err) {
    return gererErreur(res, err);
  }
};

/* ════════════════════════════════════════════════════════
   GET /api/articles/search?query=texte  →  Rechercher
════════════════════════════════════════════════════════ */
var rechercherArticles = async function (req, res) {
  try {
    var query = req.query.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ erreur: "Le parametre query est requis." });
    }

    var articles = await Article.find({
      $or: [
        { titre:   { $regex: query.trim(), $options: "i" } },
        { contenu: { $regex: query.trim(), $options: "i" } }
      ]
    }).sort({ _id: -1 });

    return res.status(200).json({
      total:    articles.length,
      articles: articles
    });
  } catch (err) {
    return gererErreur(res, err);
  }
};

/* ════════════════════════════════════════════════════════
   GET /api/articles/:id  →  Lire un article
════════════════════════════════════════════════════════ */
var lireArticle = async function (req, res) {
  try {
    if (!idValide(req.params.id)) {
      return res.status(400).json({ erreur: "ID invalide. Fournir un nombre entier positif." });
    }

    var article = await Article.findById(Number(req.params.id));

    if (!article) {
      return res.status(404).json({ erreur: "Article non trouve." });
    }

    return res.status(200).json(article);
  } catch (err) {
    return gererErreur(res, err);
  }
};

/* ════════════════════════════════════════════════════════
   PUT /api/articles/:id  →  Modifier un article
════════════════════════════════════════════════════════ */
var modifierArticle = async function (req, res) {
  try {
    if (!idValide(req.params.id)) {
      return res.status(400).json({ erreur: "ID invalide. Fournir un nombre entier positif." });
    }

    var maj = {};
    if (req.body.titre     !== undefined) maj.titre     = req.body.titre;
    if (req.body.contenu   !== undefined) maj.contenu   = req.body.contenu;
    if (req.body.auteur    !== undefined) maj.auteur    = req.body.auteur;
    if (req.body.categorie !== undefined) maj.categorie = req.body.categorie;
    if (req.body.tags      !== undefined) maj.tags      = req.body.tags;

    if (Object.keys(maj).length === 0) {
      return res.status(400).json({ erreur: "Aucun champ a modifier fourni." });
    }

    var article = await Article.findByIdAndUpdate(
      Number(req.params.id),
      { $set: maj },
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ erreur: "Article non trouve." });
    }

    return res.status(200).json({
      message: "Article mis a jour avec succes.",
      article: article
    });
  } catch (err) {
    return gererErreur(res, err);
  }
};

/* ════════════════════════════════════════════════════════
   DELETE /api/articles/:id  →  Supprimer un article
════════════════════════════════════════════════════════ */
var supprimerArticle = async function (req, res) {
  try {
    if (!idValide(req.params.id)) {
      return res.status(400).json({ erreur: "ID invalide. Fournir un nombre entier positif." });
    }

    var article = await Article.findByIdAndDelete(Number(req.params.id));

    if (!article) {
      return res.status(404).json({ erreur: "Article non trouve." });
    }

    return res.status(200).json({
      message: "Article supprime avec succes.",
      id:      Number(req.params.id)
    });
  } catch (err) {
    return gererErreur(res, err);
  }
};

module.exports = {
  creerArticle:       creerArticle,
  listerArticles:     listerArticles,
  rechercherArticles: rechercherArticles,
  lireArticle:        lireArticle,
  modifierArticle:    modifierArticle,
  supprimerArticle:   supprimerArticle
};
