const mongoose = require('mongoose')

const Schema = mongoose.Schema

const optionPollSchema = new Schema({
    question: String,
    votes: {
        type: Number,
        default: 0
    }
})

const pollSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
      },
    question: {
        type: String,
        required: true
    },
    options: [optionPollSchema],
    voted: [{type: Schema.Types.ObjectId, ref: 'User'}]
});
module.exports = mongoose.model('Poll', pollSchema);