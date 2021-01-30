const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "address",
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "product",
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalprice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "packing", "shipping", "success"],
      default: "pending",
    },
    test: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
