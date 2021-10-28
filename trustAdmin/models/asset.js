const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = new Schema({ // 1.
  asset: {
    type: Number,
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
  isUsed: {
    type: Boolean,
    default: true
  }
}, {
  collection: 'asset'
});

module.exports = mongoose.model("Asset", assetSchema); // 4