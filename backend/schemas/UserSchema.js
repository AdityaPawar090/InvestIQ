const { Schema } = require("mongoose");

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  favorites: {
    type: [String],
    default: [],
  },

  walletBalance: {
    type: Number,
    default: 100000, // ₹1,00,000 virtual starting balance for paper trading
  },
});

module.exports = { UserSchema };