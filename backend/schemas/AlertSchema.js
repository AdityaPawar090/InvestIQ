const { Schema } = require("mongoose");

const AlertSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    symbol: { type: String, required: true },
    condition: { type: String, enum: ["above", "below"], required: true },
    targetPrice: { type: Number, required: true },
    triggered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = { AlertSchema };
