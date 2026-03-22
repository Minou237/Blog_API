const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API - INF222 TAF1",
      version: "1.0.0",
      description:
        "API REST complete pour la gestion d un blog simple. " +
        "Developpee avec Node.js, Express et MongoDB dans le cadre du cours INF222."
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
        description: "Serveur local de developpement"
      }
    ],
    components: {
      schemas: {
        ArticleInput: {
          type: "object",
          required: ["titre", "contenu", "auteur"],
          properties: {
            titre:     { type: "string",  example: "Introduction au Web" },
            contenu:   { type: "string",  example: "Le web repose sur HTML, CSS et JavaScript." },
            auteur:    { type: "string",  example: "Charles" },
            date:      { type: "string",  format: "date", example: "2026-03-22" },
            categorie: { type: "string",  example: "Technologie" },
            tags:      { type: "array",   items: { type: "string" }, example: ["web", "html"] }
          }
        },
        ArticleUpdate: {
          type: "object",
          properties: {
            titre:     { type: "string",  example: "Nouveau titre" },
            contenu:   { type: "string",  example: "Nouveau contenu mis a jour." },
            auteur:    { type: "string",  example: "Alice" },
            categorie: { type: "string",  example: "Developpement" },
            tags:      { type: "array",   items: { type: "string" }, example: ["js", "backend"] }
          }
        },
        Article: {
          type: "object",
          properties: {
            _id:       { type: "string",  example: "65f1a2b3c4d5e6f7a8b9c0d1" },
            titre:     { type: "string",  example: "Introduction au Web" },
            contenu:   { type: "string",  example: "Le web repose sur HTML, CSS et JavaScript." },
            auteur:    { type: "string",  example: "Charles" },
            date:      { type: "string",  format: "date-time" },
            categorie: { type: "string",  example: "Technologie" },
            tags:      { type: "array",   items: { type: "string" } },
            createdAt: { type: "string",  format: "date-time" },
            updatedAt: { type: "string",  format: "date-time" }
          }
        },
        SuccesCreate: {
          type: "object",
          properties: {
            message: { type: "string",  example: "Article cree avec succes." },
            id:      { type: "string",  example: "65f1a2b3c4d5e6f7a8b9c0d1" },
            article: { "$ref": "#/components/schemas/Article" }
          }
        },
        SuccesList: {
          type: "object",
          properties: {
            total:    { type: "integer", example: 3 },
            articles: { type: "array",  items: { "$ref": "#/components/schemas/Article" } }
          }
        },
        SuccesUpdate: {
          type: "object",
          properties: {
            message: { type: "string",  example: "Article mis a jour avec succes." },
            article: { "$ref": "#/components/schemas/Article" }
          }
        },
        SuccesDelete: {
          type: "object",
          properties: {
            message: { type: "string", example: "Article supprime avec succes." },
            id:      { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0d1" }
          }
        },
        Erreur: {
          type: "object",
          properties: {
            erreur: { type: "string", example: "Le titre est obligatoire." }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerJsdoc(options);
