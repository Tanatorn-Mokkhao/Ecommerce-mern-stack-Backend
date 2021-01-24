const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
    description: { type: String },
    picture: [{ img: { type: String } }],
    createby: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    updateAt: Date,
  },

  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
