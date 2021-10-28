const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shareSchema = new Schema({ // 1.
    share: {
        type: Number,
        default: 0
    },
    principal: {
        type: Number,
        default: 0
    },
    calculation: {
        type: Number,
        default: 0
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
    last: {
        type: Boolean,
        default: true
    }
}, {
    collection: 'shares'
});

module.exports = mongoose.model("Share", shareSchema); // 4