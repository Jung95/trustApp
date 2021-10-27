const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({ // 1.
    value: {
        type: Number,
        required: true
    },
    account: {
        type: String,
        default: ""
    },
    bank: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
    },
    updated: {
        type: Date,
        default: Date.now
    },
    progress: {
        type: Number,
        default: 0
    }
}, {
    collection: 'requests'
});

module.exports = mongoose.model("Request", requestSchema); // 4