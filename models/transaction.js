const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({ // 1.
  value: {
    type: Number,
    required: true,
  },
  base: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    default: "normal"
  }
}, {
  collection: 'transactions'
});

module.exports = mongoose.model("Transaction", transactionSchema); // 4