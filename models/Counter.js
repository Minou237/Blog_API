const mongoose = require("mongoose");

/* Collection qui stocke les compteurs (un par type de document) */
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // nom du compteur ex: "articleId"
  seq: { type: Number, default: 0 }       // valeur actuelle
});

module.exports = mongoose.model("Counter", counterSchema);
