const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1, min: 1 },
        _id: false,
      },
    ],

    totalPrice: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["active", "abandoned", "saved"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
