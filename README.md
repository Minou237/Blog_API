# Blog API — INF222 TAF1

API REST complète pour la gestion d'un blog simple.
**Stack :** Node.js · Express · MongoDB (Mongoose) · Swagger UI · Interface web

---

## Structure du projet

```
blog/
├── server.js                    ← point d'entrée du serveur
├── package.json                 ← dépendances npm
├── .env.example                 ← modèle des variables d'environnement
├── .gitignore
├── config/
│   ├── db.js                    ← connexion à MongoDB
│   └── swagger.js               ← configuration Swagger/OpenAPI
├── models/
│   └── Article.js               ← schéma Mongoose (titre, contenu, auteur, date, categorie, tags)
├── controllers/
│   └── articleController.js     ← logique métier CRUD
├── routes/
│   └── articles.js              ← définition des routes + annotations Swagger
└── public/
    └── index.html               ← interface web (créer, lister, filtrer, modifier, supprimer)
```

---

## Installation et démarrage

### Prérequis
- Node.js v18 ou supérieur
- Compte MongoDB Atlas gratuit → https://www.mongodb.com/atlas

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/TON_USERNAME/blog-api-inf222.git
cd blog-api-inf222

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# → Ouvrir .env et coller l'URI MongoDB Atlas

# 4. Lancer le serveur
npm start

# (développement avec rechargement automatique)
npm run dev
```

Le serveur affiche :
```
Interface web  →  http://localhost:3000
Swagger UI     →  http://localhost:3000/api-docs
API Base URL   →  http://localhost:3000/api/articles
```

---

## Configuration : fichier .env

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blog_inf222?retryWrites=true&w=majority
PORT=3000
```

---

## Endpoints de l'API

| Méthode  | URL                                       | Description                  | Code succès |
|----------|-------------------------------------------|------------------------------|-------------|
| `POST`   | `/api/articles`                           | Créer un article             | 201         |
| `GET`    | `/api/articles`                           | Lister tous les articles     | 200         |
| `GET`    | `/api/articles?categorie=Technologie`     | Filtrer par catégorie        | 200         |
| `GET`    | `/api/articles?auteur=Charles`            | Filtrer par auteur           | 200         |
| `GET`    | `/api/articles?date=2026-03-22`           | Filtrer par date             | 200         |
| `GET`    | `/api/articles/search?query=texte`        | Rechercher par mot-clé       | 200         |
| `GET`    | `/api/articles/:id`                       | Lire un article par son ID   | 200         |
| `PUT`    | `/api/articles/:id`                       | Modifier un article          | 200         |
| `DELETE` | `/api/articles/:id`                       | Supprimer un article         | 200         |

---

## Codes HTTP utilisés

| Code | Signification                      |
|------|------------------------------------|
| 200  | OK — Requête réussie               |
| 201  | Created — Article créé             |
| 400  | Bad Request — Données invalides    |
| 404  | Not Found — Article introuvable    |
| 500  | Internal Server Error              |

---

## Exemples d'utilisation

### Créer un article
```http
POST /api/articles
Content-Type: application/json

{
  "titre": "Introduction au Web",
  "contenu": "Le web repose sur HTML, CSS et JavaScript.",
  "auteur": "Charles",
  "date": "2026-03-22",
  "categorie": "Technologie",
  "tags": ["web", "html", "css"]
}
```
Réponse 201 :
```json
{
  "message": "Article cree avec succes.",
  "id": "65f1a2b3c4d5e6f7a8b9c0d1",
  "article": { "titre": "Introduction au Web", ... }
}
```

### Lister tous les articles
```http
GET /api/articles
```
Réponse 200 :
```json
{ "total": 2, "articles": [ { ... }, { ... } ] }
```

### Filtres combinés
```http
GET /api/articles?categorie=Technologie&date=2026-03-22
```

### Rechercher
```http
GET /api/articles/search?query=Node.js
```

### Modifier un article
```http
PUT /api/articles/65f1a2b3c4d5e6f7a8b9c0d1
Content-Type: application/json

{ "titre": "Titre mis a jour", "categorie": "Developpement" }
```
Réponse 200 :
```json
{ "message": "Article mis a jour avec succes.", "article": { ... } }
```

### Supprimer un article
```http
DELETE /api/articles/65f1a2b3c4d5e6f7a8b9c0d1
```
Réponse 200 :
```json
{ "message": "Article supprime avec succes.", "id": "65f1a2b3c4d5e6f7a8b9c0d1" }
```

---

## Déploiement sur Render

1. Pousser le code sur GitHub
2. Aller sur https://render.com → New → Web Service
3. Connecter le dépôt GitHub
4. Configurer :
   - Build Command : `npm install`
   - Start Command : `npm start`
5. Ajouter la variable d'environnement `MONGO_URI`
6. Cliquer Deploy

L'application sera accessible sur `https://nom-app.onrender.com`

---

## Technologies utilisées

| Technologie         | Rôle                                  |
|---------------------|---------------------------------------|
| Node.js             | Environnement d'exécution JavaScript  |
| Express             | Framework web                         |
| MongoDB             | Base de données NoSQL                 |
| Mongoose            | ODM pour MongoDB                      |
| dotenv              | Variables d'environnement             |
| cors                | Autorisation cross-origin             |
| swagger-jsdoc       | Génération de la spec OpenAPI         |
| swagger-ui-express  | Interface de documentation Swagger    |
