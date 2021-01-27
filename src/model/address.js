const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    address: [
      {
        name: { type: String, required: true },
        address: { type: String, required: true, min: 3, max: 150 },
        postalCode: { type: String, required: true },
        phoneNumber: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("address", addressSchema);
