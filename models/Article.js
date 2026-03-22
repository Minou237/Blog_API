const mongoose = require("mongoose");
const Counter  = require("./Counter");

const articleSchema = new mongoose.Schema(
  {
    _id: {
      type: Number   // ID numerique au lieu de ObjectId MongoDB
    },
    titre: {
      type:     String,
      required: [true, "Le titre est obligatoire."],
      trim:     true
    },
    contenu: {
      type:     String,
      required: [true, "Le contenu est obligatoire."],
      trim:     true
    },
    auteur: {
      type:     String,
      required: [true, "L auteur est obligatoire."],
      trim:     true
    },
    date: {
      type:    Date,
      default: Date.now
    },
    categorie: {
      type:    String,
      trim:    true,
      default: "General"
    },
    tags: {
      type:    [String],
      default: []
    }
  },
  {
    timestamps: true,  // ajoute createdAt et updatedAt automatiquement
    _id: false         // on gere l ID nous-memes
  }
);

/* Avant chaque creation, on incremente le compteur et on assigne l ID */
articleSchema.pre("save", async function (next) {
  if (this.isNew) {
    var counter = await Counter.findByIdAndUpdate(
      "articleId",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this._id = counter.seq;
  }
  next();
});

module.exports = mongoose.model("Article", articleSchema);
