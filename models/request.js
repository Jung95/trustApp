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
        /*
        0:접수완료
        1:진행중
        2:보류중
        3:거절됨
        4:완료
        */
    },
    date: {
        type: String,
        required: true
    },
    type: {
        type: String,
    }
}, {
    collection: 'requests'
});

module.exports = mongoose.model("Request", requestSchema); // 4