const mongoose = require('mongoose')

const Schema = mongoose.Schema

const optionPollSchema = new Schema({
    options: String,
    votes: {
        type: Number,
        default: 0
    }
});

const pollSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
      },
    question: String,
    options: [optionPollSchema],
    voted: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, { timestamps: true });
module.exports = mongoose.model('Poll', pollSchema);