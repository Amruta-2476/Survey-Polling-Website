const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const surveyResponseSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Replace 'User' with your actual user model
        required: true,
    },
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey', // Replace 'Survey' with your actual survey model
        required: true,
    },
    responses: [
        {
            questionIndex: {
                type: Number,
                required: true,
            },
            selectedOption: {
                type: String,
                required: true,
            },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('SurveyResponse', surveyResponseSchema);
