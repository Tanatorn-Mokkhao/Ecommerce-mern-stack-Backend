const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    parentId: { type: String },
    createby: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);
