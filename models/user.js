const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({ // 1.
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String, // 2.
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    default: 0, // 3.
  },
  level: {
    type: String,
    default: 0, // 3.
  },
  updated: {
    type: Date,
    default: Date.now
  },
  shareOpen: {
    type: Boolean,
    default: false
  },
  principalOpen: {
    type: Boolean,
    default: false
  },
  calculationOpen: {
    type: Boolean,
    default: false
  }
  
}, {
  collection: 'users'
});

module.exports = mongoose.model("User", userSchema); // 4